import fs from 'fs';

export abstract class CsvFileReader<T> { // This is a generic (<T>).
  data: T[] = [];

  // We used generics here to because we wanted to configure the types inside this class on the fly.

  constructor(public filename: string) { }

  abstract mapRow(row: string[]): T;

  read(): void {
    this.data = fs // The type definition file for this library is @type/node.
      .readFileSync(this.filename, {
        encoding: 'utf-8'
      })
      .split('\n') // Splits from every new line. 
      .map(
        (row: string): string[] => {
          return row.split(",");
        }
      )
      .map(this.mapRow);
  }
}
