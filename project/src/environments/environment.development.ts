import { secret } from './environment.secret';

export const environment = {
  production: false,
  ...secret,
};
