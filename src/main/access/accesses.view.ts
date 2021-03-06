import { GET, Handler, PathQuery, View } from '@rester/core';
import { AuthHandler } from '../common/handlers';
import { AccessEntity } from './access.entity';

@View('accesses')
@Handler(AuthHandler)
export class AccessView {

  @GET()
  async all(
    @PathQuery('take') take: number = 10,
    @PathQuery('skip') skip: number = 0,
  ) {
    return AccessEntity.find({
      order: { timestamp: 'DESC' },
      take: +take,
      skip: +skip,
    });
  }

}
