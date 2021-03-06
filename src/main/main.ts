import { CORSHandler, Rester } from '@rester/core';
import { AccessEntity } from './access';
import { AccessHandler } from './common/handlers';
import { LinkEntity } from './link';

const rester = new Rester();

rester.addEntities(AccessEntity, LinkEntity);
rester.addHandlers(CORSHandler, AccessHandler);

rester.bootstrap();
