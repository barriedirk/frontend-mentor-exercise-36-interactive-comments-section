import { secret } from './environment.secret';

export const environment = {
  production: true,
  ...secret,
};
