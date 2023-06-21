import { Pipe, PipeTransform } from '@angular/core';
import { OrderBook } from '../shared/models';

@Pipe({
  name: 'orderByPriceLevel',
})
export class OrderByPriceLevelPipe implements PipeTransform {
  public transform(data: OrderBook[], order: number): OrderBook[] {
    return data.sort((item1: OrderBook, item2: OrderBook) => {
      return order * (item1.price - item2.price);
    });
  }
}
