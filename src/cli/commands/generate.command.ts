import got from 'got';
import { injectable } from 'inversify';
import invariant from 'tiny-invariant';

import { TSVFileWriter } from '../../lib/file-writer/tsv-file-writer.js';
import { TSVOfferGenerator } from '../../lib/offer-generator/tsv-offer-generator.js';
import { MockServerData } from '../../types/mock-server-data.types.js';
import { getErrorMessage } from '../../utils/common.js';
import { Command } from './command.interface.js';

@injectable()
export class GenerateCommand implements Command {
  private initialData?: MockServerData;

  private async load(url: string) {
    try {
      this.initialData = await got.get(url).json();
    } catch {
      throw new Error(`Can't load data from ${url}`);
    }
  }

  public getName(): string {
    return '--generate';
  }

  public async write(filepath: string, offerCount: number) {
    const generator = new TSVOfferGenerator(this.initialData!);
    const writer = new TSVFileWriter(filepath);

    for (let i = 0; i < offerCount; i++) {
      await writer.write(generator.generate());
    }
  }

  public async execute(...parameters: string[]) {
    const [count, filepath, url] = parameters;

    invariant(count, 'count is required');
    invariant(filepath, 'filepath is required');
    invariant(url, 'url is required');

    const offerCount = Number.parseInt(count, 10);

    try {
      await this.load(url);
      await this.write(filepath, offerCount);
      console.info(`File ${filepath} was created!`);
    } catch (error: unknown) {
      console.error('Can\'t generate data');
      console.error(getErrorMessage(error));
    }
  }
}
