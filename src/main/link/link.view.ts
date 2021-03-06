import { GET, HTTP404Exception, Inject, PathVariable, POST, RedirectResponse, RequestBody, View } from '@rester/core';
import { LinkController } from './link.controller';

@View('link')
export class LinkView {

  @Inject()
  private controller!: LinkController;

  @POST()
  async transform(
    @RequestBody() { origin }: { origin: string },
  ) {
    return this.controller.transform(origin);
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
