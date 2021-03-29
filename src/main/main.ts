import { DEFAULT_HANDLERS, Rester } from '@rester/core';
import { AccessModule } from './access';
import { AccessHandler } from './common/handlers';
import { HostModule } from './host';

const rester = new Rester({
  handlers: [AccessHandler, ...DEFAULT_HANDLERS],
  modules: [AccessModule, HostModule],
});

rester.bootstrap();
