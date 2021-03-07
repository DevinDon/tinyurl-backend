import { GET, HTTP404Exception, Inject, PathVariable, POST, RedirectResponse, RequestBody, View } from '@rester/core';
import { LinkController } from './link.controller';

@View('link')
export class LinkView {

  @Inject()
  private controller!: LinkController;

  @GET()
  async index() {
    return new RedirectResponse({ url: 'https://demo.don.red/tinyurl' });
  }

  @POST()
  async transform(
    @RequestBody() { url }: { url: string },
  ) {
    const isTinyurl = await this.controller.isTinyurl(url);
    const result = await (
      isTinyurl
        ? this.controller.access(isTinyurl)
        : this.controller.transform(url)
    );
    if (!result) {
      throw new HTTP404Exception(`TinyURL ${url} cannot be restore.`);
    }
    return result;
  }

  @GET(':id')
  async access(@PathVariable('id') id: string) {
    const link = await this.controller.access(id);
    if (!link) {
      throw new HTTP404Exception();
    }
    return new RedirectResponse({ url: link.origin, temporarily: true });
  }

}
