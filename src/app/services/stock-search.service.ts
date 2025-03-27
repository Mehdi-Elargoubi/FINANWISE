import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Stock } from '../models/Stock';  

@Injectable({
  providedIn: 'root',
})

export class StockSearchService {
  private apiUrl = 'https://financialmodelingprep.com/api/v3/search';

  constructor(private http: HttpClient) {}

  searchStocks(query: string): Observable<Stock[]> {
    const params = new HttpParams()
    .set('query', query)
    .set('apikey', 'HVBZPTIGy334KMwOsAy2dzqyeHRYX6rL');
    return this.http.get<Stock[]>(this.apiUrl, { params });
  }
}
