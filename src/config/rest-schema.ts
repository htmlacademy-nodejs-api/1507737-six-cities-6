import convict from '#lib/convict.js';

import { Config } from './interface.js';

export type RestSchema = {
  PORT: number;
  SALT: string;
  DB_HOST: string;
}

export type RestAppConfig = Config<RestSchema>

export const configRestSchema = convict<RestSchema>({
  PORT: {
    doc: 'Port for incoming connections',
    format: 'port',
    env: 'PORT',
    default: 4000
  },
  SALT: {
    doc: 'Salt for password hash',
    format: String,
    env: 'SALT',
    default: null
  },
  DB_HOST: {
    doc: 'IP address of the database server (MongoDB)',
    format: 'ipaddress',
    env: 'DB_HOST',
    default: '127.0.0.1'
  },
});
