import { setTimeout } from 'node:timers/promises';

import { inject, injectable } from 'inversify';
import * as Mongoose from 'mongoose';
import invariant from 'tiny-invariant';

import { Component } from '../../types/component.enum.js';
import type { Logger } from '../logger/types/logger.interface.js';
import { DBClient } from './db.interface.js';
import { RETRY_COUNT, RETRY_TIMEOUT } from './mongo.constants.js';

@injectable()
export class MongoDB implements DBClient {
  private mongoose!: typeof Mongoose;

  constructor(@inject(Component.Logger) private readonly logger: Logger) {}

  private get isConnected() {
    return this.mongoose.connection.readyState === Mongoose.STATES.connected;
  }

  async connect(uri: string): Promise<void> {
    if (this.isConnected) {
      throw new Error('MongoDB client already connected');
    }

    invariant(uri, 'MongoDB connection string is required');

    this.logger.info('Trying to connect to MongoDB…');

    let attempt = 0;
    while (attempt < RETRY_COUNT) {
      try {
        this.mongoose = await Mongoose.connect(uri);

        this.logger.info('Database connection established.');
        return;
      } catch (error) {
        attempt++;
        this.logger.error(`Failed to connect to the database. Attempt ${attempt}`, error as Error);
        await setTimeout(RETRY_TIMEOUT);
      }
    }

    throw new Error(`Unable to establish database connection after ${RETRY_COUNT}`);
  }

  async disconnect(): Promise<void> {
    if (!this.isConnected) {
      throw new Error('Not connected to the database');
    }

    await this.mongoose.disconnect();
    this.logger.info('Database connection closed.');
  }
}
