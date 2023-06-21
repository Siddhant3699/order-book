import { Pipe, PipeTransform } from '@angular/core';
import { OrderBook } from '../shared/models';

@Pipe({
  name: 'limitRows',
})
export class LimitRowsPipe implements PipeTransform {
  public transform(data: OrderBook[]): OrderBook[] {
    return data.slice(0, 10);
  }
}
