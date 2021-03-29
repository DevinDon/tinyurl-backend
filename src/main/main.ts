import { DEFAULT_HANDLERS, Rester } from '@rester/core';
import { AccessModule } from './access';
import { AccessHandler } from './common/handlers';
import { HostModule } from './host';
import { LinkModule } from './link';

const rester = new Rester({
  handlers: [AccessHandler, ...DEFAULT_HANDLERS],
  modules: [AccessModule, HostModule, LinkModule],
});

rester.bootstrap();
