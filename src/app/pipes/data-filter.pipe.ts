import { Pipe, PipeTransform } from '@angular/core';
import { FilterType } from '../shared/constants';

@Pipe({
  name: 'dataFilter'
})
export class DataFilterPipe implements PipeTransform {

  public transform(data: Array<number[]>, filterType: string): Array<number[]> {
    if(filterType === FilterType.Bids) {
      return data.filter((element: number[]) => element[2] > 0);
    }
    return data.filter((element: number[]) => element[2] <= 0);
  }

}
