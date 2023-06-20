import { Injectable } from '@angular/core';
import { WebsocketService } from './websocket.service';
import { map, skipWhile } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class OrderBookService {
  constructor(private websocketService: WebsocketService) {}

  public getOrderBookData() {
    return this.websocketService.receiveMessage.pipe(
      map((data: string) => JSON.parse(data)[1]),
      skipWhile((data) => !Array.isArray(data))
    );
  }
}
