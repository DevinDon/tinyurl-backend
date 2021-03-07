import { CORSHandler, Rester } from '@rester/core';
import { AccessEntity } from './access';
import { AccessHandler } from './common/handlers';
import { HostEntity } from './host';
import { LinkEntity } from './link';

const rester = new Rester();

rester.addEntities(AccessEntity, LinkEntity, HostEntity);
rester.addHandlers(CORSHandler, AccessHandler);

rester.bootstrap();
