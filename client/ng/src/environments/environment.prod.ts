import {Environment} from './environment.model';
import {environmentBase} from './environment.base';

export const environment = {
  ...environmentBase,
  production: true,

} satisfies Environment;
