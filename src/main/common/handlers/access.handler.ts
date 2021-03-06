import { BaseHandler } from '@rester/core';
import { AccessEntity } from '../../access';

export class AccessHandler extends BaseHandler {

  async handle(next: () => Promise<any>): Promise<any> {
    AccessEntity.insert({
      method: this.request.method?.toUpperCase(),
      url: this.request.url,
      params: JSON.stringify(this.mapping.queryObject),
      timestamp: new Date(),
      ip: this.request.headers['x-forwarded-for'] as string || this.request.socket.remoteAddress || '1.1.1.1',
    }).catch(error => this.rester.logger.warn(`Record log failed: ${error}`));
    return next();
  }

}
