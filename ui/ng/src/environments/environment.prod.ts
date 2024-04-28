import {Environment} from './environment.model';
import {environmentBase} from './environment.base';

const _environment = {
  ...environmentBase,
  production: true,
} satisfies Environment;

_environment.api.baseUrl = 'https://jeudemots.42borgata.com/api/v1';

export const environment = _environment;
