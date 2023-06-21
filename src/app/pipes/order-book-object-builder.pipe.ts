import { Pipe, PipeTransform } from '@angular/core';
import { OrderBook } from '../shared/models';

@Pipe({
  name: 'orderBookObjectBuilder',
})
export class OrderBookObjectBuilderPipe implements PipeTransform {
  public transform(data: Array<number[]>): OrderBook[] {
    return data.map((row: number[]) => {
      return {
        price: row[0],
        count: row[1],
        amount: row[2],
      };
    });
  }
}
