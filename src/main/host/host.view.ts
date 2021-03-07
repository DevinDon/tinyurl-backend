import { Handler, HTTP400Exception, HTTPException, POST, PUT, RequestBody, View } from '@rester/core';
import { AuthHandler } from '../common/handlers';
import { HostEntity } from './host.entity';
import { Host } from './host.model';

@View('host')
@Handler(AuthHandler)
export class HostView {

  @POST()
  async add(@RequestBody() { domain, expired }: Host) {
    const result = await HostEntity
      .insert({
        domain,
        created: new Date(),
        expired,
      })
      .catch(error => { throw new HTTP400Exception('Domain has already inserted.'); });
    return HostEntity.find(result.identifiers[0]._id);
  }

  @PUT()
  async update(@RequestBody() { domain, expired }: Host) {
    const host = await HostEntity.findOne({ domain });
    if (!host) {
      throw new HTTPException(404, `Domain ${domain} not found.`);
    }
    host.domain = domain;
    host.expired = expired;
    return await host.save();
  }

}
