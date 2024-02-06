import invariant from 'tiny-invariant';

import { TSVFileReader } from '#lib/file-reader/index.js';
import { CommentModel, CommentService, CommentServiceImpl } from '#modules/comment/index.js';
import { RestAppConfig, RestConfig } from '#modules/config/index.js';
import { DBClient, MongoDB } from '#modules/db/index.js';
import { ConsoleLogger, Logger } from '#modules/logger/index.js';
import { createOffer,Offer } from '#types/offer.types.js';
import { getMongoURI } from '#utils/common.js';

import { Command } from './command.interface.js';

export class ImportCommand implements Command {
  // private userService: UserService;
  // private offerService: OfferService;
  private commentService: CommentService;
  private logger: Logger;
  private mongo: DBClient;
  private config: RestAppConfig;

  constructor() {
    this.onImportedLine = this.onImportedLine.bind(this);
    this.onCompleteImport = this.onCompleteImport.bind(this);

    this.logger = new ConsoleLogger();
    // this.offerService = new OfferServiceImpl(OfferModel, this.logger);
    // this.userService = new UserServiceImpl(UserModel, this.logger);
    this.commentService = new CommentServiceImpl(CommentModel, this.logger);
    this.mongo = new MongoDB(this.logger);
    this.config = new RestConfig(this.logger);
  }

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
