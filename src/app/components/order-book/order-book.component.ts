import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AsksFilterPipe } from 'src/app/pipes/asks-filter.pipe';
import { BidsFilterPipe } from 'src/app/pipes/bids-filter.pipe';
import { OrderBookService } from 'src/app/services/order-book.service';

@Component({
  selector: 'app-order-book',
  templateUrl: './order-book.component.html',
  styleUrls: ['./order-book.component.css'],
})
export class OrderBookComponent implements OnInit, OnDestroy {
  public orderBookData: Array<number[]>;
  public bidData: Array<number[]>;
  public askData: Array<number[]>;
  public symbols: string[];
  public loading: boolean;

  private subscription: Subscription;

  constructor(
    private orderBookService: OrderBookService,
    private bidsFilterPipe: BidsFilterPipe,
    private asksFilterPipe: AsksFilterPipe
  ) {
    this.loading = true;
    this.orderBookData = [];
    this.bidData = [];
    this.askData = [];
  }

  public async ngOnInit(): Promise<void> {
    await this.initializeOrderBookData();
    this.initializeBidData();
    this.initializeAskData();
    this.loading = false;
  }

  private initializeOrderBookData(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.subscription = this.orderBookService
        .getOrderBookData()
        .subscribe((data: any) => {
          if (this.isOrderBookSnapshot(data)) {
            this.orderBookData = data;
            resolve();
          } else {
            this.updateTradingBook(data);
          }
        });
    });
  }

  private isOrderBookSnapshot(data: unknown): boolean {
    return data[0].constructor === Array;
  }

  private initializeBidData(): void {
    this.bidData = this.bidsFilterPipe.transform(this.orderBookData);
  }

  private initializeAskData(): void {
    this.askData = this.asksFilterPipe.transform(this.orderBookData);
  }

  private updateTradingBook(data: number[]): void {
    const price = data[0];
    const count = data[1];
    const amount = data[2];
    if (count > 0) {
      if (amount > 0) {
        this.addOrUpdateBids(data, price);
      } else {
        this.addOrUpdateAsks(data, price);
      }
    } else {
      if (amount === 1) {
        this.removeFromBids(price);
      } else if (amount === -1) {
        this.removeFromAsks(price);
      }
    }
  }

  private addOrUpdateBids(data: number[], price: number): void {
    const index = this.getItemIndex(this.bidData, price);
    if (index === -1) {
      this.bidData.push(data);
    } else {
      this.bidData[index] = data;
    }
    this.bidData = [...this.bidData];
  }

  private getItemIndex(data: Array<number[]>, price: number): number {
    for (let index = 0; index < data.length; index++) {
      if (data[index][0] === price) {
        return index;
      }
    }
    return -1;
  }

  private addOrUpdateAsks(data: number[], price: number): void {
    const index = this.getItemIndex(this.askData, price);
    if (index === -1) {
      this.askData.push(data);
    } else {
      this.askData[index] = data;
    }
    this.askData = [...this.askData];
  }

  private removeFromBids(price: number): void {
    const index = this.getItemIndex(this.bidData, price);
    this.bidData.splice(index, 1);
  }

  private removeFromAsks(price: number): void {
    const index = this.getItemIndex(this.askData, price);
    this.askData.splice(index, 1);
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.orderBookService.stopLoadingData();
  }
}
