import { Component } from '@angular/core';
import { OrderBookService } from './services/order-book.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'order-book';

  constructor(private orderBookService: OrderBookService) {}

  public ngOnInit() {
    this.orderBookService
      .getOrderBookData()
      .subscribe((data) => console.log(data));
  }
}
