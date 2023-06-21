import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'bidsFilter',
})
export class BidsFilterPipe implements PipeTransform {
  public transform(entries: Array<number[]>): Array<number[]> {
    return entries.filter((entry: number[]) => entry[2] > 0);
  }
}
