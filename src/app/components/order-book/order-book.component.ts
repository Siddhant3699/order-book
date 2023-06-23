import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataFilterPipe } from 'src/app/pipes/data-filter.pipe';
import { OrderBookService } from 'src/app/services/order-book.service';
import { FilterType } from 'src/app/shared/constants';

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
    private dataFilterPipe: DataFilterPipe
  ) {
    this.loading = true;
    this.orderBookData = [];
    this.bidData = [];
    this.askData = [];
  }

  public async ngOnInit(): Promise<void> {
    await this.initializeOrderBookData();
    await this.initializeBidData();
    await this.initializeAskData();
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
            resolve();
          }
        });
    });
  }

  private isOrderBookSnapshot(data: unknown): boolean {
    return data[0].constructor === Array;
  }

  private async initializeBidData(): Promise<void> {
    this.bidData = this.dataFilterPipe.transform(this.orderBookData, FilterType.Bids);
  }

  private async initializeAskData(): Promise<void> {
    this.askData = this.dataFilterPipe.transform(this.orderBookData, FilterType.Asks);
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
    const index = this.bidData.findIndex((element: number[]) => element[0] === price);
    if (index === -1) {
      this.bidData.push(data);
    } else {
      this.bidData[index] = data;
    }
    this.bidData = [...this.bidData];
  }

  private addOrUpdateAsks(data: number[], price: number): void {
    const index = this.askData.findIndex((element: number[]) => element[0] === price);
    if (index === -1) {
      this.askData.push(data);
    } else {
      this.askData[index] = data;
    }
    this.askData = [...this.askData];
  }

  private removeFromBids(price: number): void {
    const index = this.bidData.findIndex((element: number[]) => element[0] === price);
    this.bidData.splice(index, 1);
  }

  private removeFromAsks(price: number): void {
    const index = this.askData.findIndex((element: number[]) => element[0] === price);
    this.askData.splice(index, 1);
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.orderBookService.stopLoadingData();
  }
}
