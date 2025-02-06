import { FinnhubStock } from './model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient) { }

  private baseUrl = 'https://finnhub.io/api/v1';
  private apiKey = 'cudktohr01qigebr68m0cudktohr01qigebr68mg';

  getFinannhubStock(symbole: string): Observable<FinnhubStock>{
    
    return this.http.get<FinnhubStock>(
      `${this.baseUrl}/quote?symbol=${symbole}&token=${this.apiKey}`
    );
  }
}
