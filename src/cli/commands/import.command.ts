import { inject, injectable } from 'inversify';
import invariant from 'tiny-invariant';

import { TSVFileReader } from '#lib/file-reader/index.js';
import { CommentService } from '#modules/comment/index.js';
import { RestAppConfig } from '#modules/config/index.js';
import { MongoDB } from '#modules/db/index.js';
import { Component } from '#types/component.enum.js';
import { createOffer,Offer } from '#types/offer.types.js';
import { getMongoURI } from '#utils/common.js';

import { Command } from './command.interface.js';

@injectable()
export class ImportCommand implements Command {
  constructor(
    @inject(Component.MongoDB) private readonly mongo: MongoDB,
    @inject(Component.Config) private readonly config: RestAppConfig,
    @inject(Component.CommentService) private readonly commentService: CommentService,
  ) {}

  getName(): string {
    return '--import';
  }

  private async onImportedLine(line: string, resolve: () => void) {
    const offer = createOffer(line);
    await this.saveOffer(offer);
    resolve();
  }

  private onCompleteImport(count: number) {
    console.info(`${count} rows imported.`);
    this.mongo.disconnect();
  }

  private async saveOffer(_offer: Offer) {
    await this.commentService.create({authorId: '', offerId: '', text: ''});
  }

  async execute(...parameters: string[]) {
    const [filename] = parameters;

    invariant(filename, 'filename is required');

    console.log('this.config', this.config);

    const mongoUri = getMongoURI(
      this.config.get('DB_USER'),
      this.config.get('DB_PASSWORD'),
      this.config.get('DB_HOST'),
      this.config.get('DB_PORT'),
      this.config.get('DB_NAME'),
    );

    await this.mongo.connect(mongoUri);

    const fileReader = new TSVFileReader(filename.trim());

    fileReader.on('line', this.onImportedLine);
    fileReader.on('end', this.onCompleteImport);

    try {
      fileReader.read();
    } catch (err) {

      if (!(err instanceof Error)) {
        throw err;
      }

      console.error(`Can't import data from file: ${filename}`);
      console.error(`Details: ${err.message}`);
    }
  }
}
