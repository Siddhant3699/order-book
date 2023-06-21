import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Tickers } from '../shared/models';
import { URLs } from '../shared/constants';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class SymbolsService {
  constructor(private http: HttpClient) {}

  public getSymbols(): Observable<string[]> {
    return this.fetchTickers().pipe(
      map((tickers: Tickers[]) => {
        return tickers
          .map((ticker: Tickers) => ticker[0])
          .filter(
            (symbol: string) => symbol.startsWith('t') && symbol.endsWith('USD')
          )
          .slice(0, 8);
      })
    );
  }

  private fetchTickers(): Observable<Tickers[]> {
    return this.http.get<Tickers[]>(URLs.SYMBOLS);
  }
}
