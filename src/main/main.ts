import { CORSHandler, Rester } from '@rester/core';
import { AccessEntity } from './access';
import { AphorismEntity } from './aphorism';

const rester = new Rester();

rester.addEntities('local', AccessEntity);
rester.addEntities(AphorismEntity);
rester.addHandlers(CORSHandler);

rester.bootstrap();
