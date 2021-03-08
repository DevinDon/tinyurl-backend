import { CORSHandler, ExceptionHandler, LoggerHandler, ParameterHandler, Rester, RouterHandler, SchemaHandler } from '@rester/core';
import { AccessEntity } from './access';
import { AccessHandler } from './common/handlers';
import { HostEntity } from './host';
import { LinkEntity } from './link';

const rester = new Rester();

rester.addEntities(AccessEntity, LinkEntity, HostEntity);
rester.resetHandlers()
  .addHandlers(AccessHandler, ExceptionHandler, SchemaHandler, RouterHandler, ParameterHandler, LoggerHandler, CORSHandler);

rester.bootstrap();
