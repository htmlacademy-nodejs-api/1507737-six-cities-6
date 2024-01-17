import { TSVFileReader } from '~/lib/file-reader/tsv-reader.js';

import { Command } from './command.js';

export class ImportCommand implements Command{
  getName(): string {
    return '--import';
  }

  execute(...parameters: string[]): void {
    const [filename] = parameters;
    const fileReader = new TSVFileReader(filename.trim());

    try {
      fileReader.read();
      console.log(fileReader.toArray());
    } catch (err) {

      if (!(err instanceof Error)) {
        throw err;
      }

      console.error(`Can't import data from file: ${filename}`);
      console.error(`Details: ${err.message}`);
    }
  }
}
