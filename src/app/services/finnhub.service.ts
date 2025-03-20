import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Recommendation } from '../models/recommendation'; // Import du modèle

@Injectable({
  providedIn: 'root'
})
export class FinnhubService {
  private apiUrl = 'https://finnhub.io/api/v1/stock/recommendation';
  private apiKey = 'cv5apohr01qj2ke0ajs0cv5apohr01qj2ke0ajsg';  // Remplacez par votre API Key

  constructor(private http: HttpClient) {}

  getRecommendation(symbol: string): Observable<Recommendation[]> {
    const params = new HttpParams()
      .set('symbol', symbol)
      .set('token', this.apiKey);

    return this.http.get<Recommendation[]>(this.apiUrl, { params });
  }
}
