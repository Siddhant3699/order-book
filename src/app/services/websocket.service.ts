import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { SERVER_MESSAGE, URLs } from '../shared/constants';

@Injectable({
  providedIn: 'root',
})
export class WebsocketService {
  private ws: WebSocket;
  private isConnected: boolean;
  public receiveMessage: Subject<string> = new Subject<string>();

  constructor() {
    this.isConnected = false;
    this.connect()
      .then(() => {
        this.isConnected = true;
        this.configureEventListeners();
      })
      .catch((error: any) => console.log(error));
  }

  private connect(): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        this.ws = new WebSocket(URLs.BOOK);
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  }

  private configureEventListeners(): void {
    this.ws.addEventListener('open', () => {
      if (this.canSendMessage()) {
        this.ws.send(JSON.stringify(SERVER_MESSAGE));
      }
    });
    this.ws.addEventListener('message', (event: MessageEvent<string>) => {
      this.receiveMessage.next(event.data);
    });
  }

  private canSendMessage(): boolean {
    return this.isConnected && this.ws.readyState === WebSocket.OPEN;
  }

  public disconnect(): void {
    this.ws.close();
    this.isConnected = false;
  }
}
