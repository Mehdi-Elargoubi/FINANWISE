import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StockService {
  private apiUrl = 'https://www.alphavantage.co/query';
  private apiKey = 'E6K0L79FARZNOI40';

  constructor(private http: HttpClient) {}

  getStockHistory(symbol: string): Observable<any> {
    const url = `${this.apiUrl}?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${this.apiKey}`;
    return this.http.get(url);
  }
}
