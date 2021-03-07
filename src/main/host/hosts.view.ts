import { GET, View } from '@rester/core';
import { HostEntity } from './host.entity';

@View('hosts')
export class HostsView {

  @GET()
  all() {
    return HostEntity.find();
  }

}
