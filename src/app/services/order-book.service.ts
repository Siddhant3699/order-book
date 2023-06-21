import { Injectable } from '@angular/core';
import { WebsocketService } from './websocket.service';
import { map, skipWhile } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrderBookService {
  constructor(private websocketService: WebsocketService) {}

  public getOrderBookData(): Observable<unknown> {
    return this.websocketService.receiveMessage.pipe(
      map((data: string) => JSON.parse(data)[1]),
      skipWhile((data) => !Array.isArray(data))
    );
  }

  public stopLoadingData(): void {
    this.websocketService.disconnect();
  }
}
