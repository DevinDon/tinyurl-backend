import { BaseHandler } from '@rester/core';
import { AccessEntity } from '../../access';

export class AccessHandler extends BaseHandler {

  async handle(next: () => Promise<any>): Promise<any> {
    const result = await next();

    AccessEntity
      .insert({
        method: this.request.method?.toUpperCase(),
        url: this.request.url,
        params: JSON.stringify(this.mapping?.queryObject),
        timestamp: new Date(),
        ip: this.request.headers['x-real-ip'] as string || this.request.headers['x-forwarded-for'] as string || this.request.socket.remoteAddress,
        headers: this.request.headers,
        version: this.request.httpVersion,
        response: {
          statusCode: this.response.statusCode,
          statusMessage: this.response.statusMessage,
          length: result ? result.length : 0,
        },
      })
      .catch(error => this.rester.logger.warn(`Record log failed: ${error}`));

    return result;
  }

}
