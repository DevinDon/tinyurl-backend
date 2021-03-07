import { Controller, Inject } from '@rester/core';
import { HostsView } from '../host';
import { LinkEntity } from './link.entity';
import { Link } from './link.model';

@Controller()
export class LinkController {

  @Inject()
  private hostsView!: HostsView;

  async isTinyurl(url: string): Promise<string | false> {
    const { hostname, pathname } = new URL(url);
    const list = await this.hostsView.all().then(hosts => hosts.map(host => host.domain));
    return list.includes(hostname) && pathname.split('/').length === 2 && pathname.replace('/', '');
  }

  async transform(url: string): Promise<Link> {
    const stamp = Date.now();
    const link: Link = {
      id: (+`${stamp}${Math.random() * 1000 >> 0}`).toString(36),
      origin: url,
      timestamp: new Date(stamp),
    };
    await LinkEntity.insert(link);
    return { id: link.id, origin: url, timestamp: new Date(stamp) };
  }

  async access(id: string): Promise<Link | undefined> {
    const link = await LinkEntity.findOne({ id });
    return link && { id: link.id, origin: link.origin, timestamp: link.timestamp };
  }

}
