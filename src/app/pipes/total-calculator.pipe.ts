import { Pipe, PipeTransform } from '@angular/core';
import { OrderBook } from '../shared/models';

@Pipe({
  name: 'totalCalculator',
})
export class TotalCalculatorPipe implements PipeTransform {
  public transform(data: OrderBook[]): OrderBook[] {
    let currentTotal = 0;
    data.forEach((row: OrderBook) => {
      const total = row.amount + currentTotal;
      row.total = total;
      currentTotal = total;
    });
    return data;
  }
}
