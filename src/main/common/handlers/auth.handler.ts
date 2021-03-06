import { BaseHandler, HTTP401Exception, HTTP403Exception } from '@rester/core';

const parseToken = (input?: string) => {
  if (typeof input !== 'string') {
    throw new HTTP401Exception('Invalid token.');
  }
  const [, token] = input.split(' ');
  if (!token) {
    throw new HTTP401Exception('Invalid token.');
  }
  return token;
};

export class AuthHandler extends BaseHandler {

  async handle(next: () => Promise<any>): Promise<any> {
    const token = parseToken(this.request.headers['authorization']);
    if (token !== 'admin') {
      throw new HTTP403Exception('No permission.');
    }
    return next();
  }

}
