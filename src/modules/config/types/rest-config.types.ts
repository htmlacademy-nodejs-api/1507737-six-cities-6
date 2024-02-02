import { Config } from './config.interface.js';

export type RestSchema = {
  PORT: number;
  SALT: string;
  DB_HOST: string;
}

export type RestAppConfig = Config<RestSchema>
