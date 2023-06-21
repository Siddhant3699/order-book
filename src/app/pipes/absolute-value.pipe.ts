import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'absoluteValue',
})
export class AbsoluteValuePipe implements PipeTransform {
  public transform(data: Array<number[]>): Array<number[]> {
    return data.map((row: number[]) => [row[0], row[1], Math.abs(row[2])]);
  }
}
