import { Controller } from '@rester/core';
import { LinkEntity } from './link.entity';
import { Link } from './link.model';

@Controller()
export class LinkController {

  async transform(origin: string): Promise<Link> {
    const stamp = Date.now();
    const link: Link = {
      id: (+`${stamp}${Math.random() * 1000 >> 0}`).toString(36),
      origin,
      timestamp: new Date(stamp),
    };
    await LinkEntity.insert(link);
    return { id: link.id, origin, timestamp: new Date(stamp) };
  }

  async access(id: string): Promise<Link | undefined> {
    const link = await LinkEntity.findOne({ id });
    return link && { id: link.id, origin: link.origin, timestamp: link.timestamp };
  }

}
