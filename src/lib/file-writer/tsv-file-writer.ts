import { createWriteStream, WriteStream } from 'node:fs';

import { FileWriter } from './file-writer.interface.js';

export class TSVFileWriter implements FileWriter {
  private stream: WriteStream;

  constructor(filename: string) {
    this.stream = createWriteStream(filename, {
      flags: 'w',
      encoding: 'utf-8',
      autoClose: true,
    });
  }

  public write(row: string) {
    const overWatermark = this.stream.write(`${row}\n`);
    if (!overWatermark) {
      return new Promise((resolve) => this.stream.once('drain', resolve));
    }

    return Promise.resolve();
  }
}
