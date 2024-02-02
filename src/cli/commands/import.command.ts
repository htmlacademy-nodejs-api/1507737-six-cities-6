import invariant from 'tiny-invariant';

import { TSVFileReader } from '#lib/file-reader/index.js';
import { createOffer } from '#types/offer.types.js';

import { Command } from './command.interface.js';

export class ImportCommand implements Command {
  getName(): string {
    return '--import';
  }

  private onImportedLine(line: string) {
    const offer = createOffer(line);
    console.info(offer);
  }

  private onCompleteImport(count: number) {
    console.info(`${count} rows imported.`);
  }

  execute(...parameters: string[]): void {
    const [filename] = parameters;

    invariant(filename, 'filename is required');

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
