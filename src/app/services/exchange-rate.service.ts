import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExchangeRateService {
  private apiKey = 'e8c6fef1b97542e797225c3b'; 
  private apiUrl = 'https://v6.exchangerate-api.com/v6/e8c6fef1b97542e797225c3b/latest/USD'; // Remplacez YOUR_API_KEY par votre clé API

  constructor(private http: HttpClient) {}

  getExchangeRates(baseCode: string, conversionRates: string[]): Observable<any> {
    const conversionRatesParam = conversionRates.join(',');
    const apiUrl = `https://v6.exchangerate-api.com/v6/${this.apiKey}/latest/${baseCode}`;
    return this.http.get<any>(apiUrl);
  }

}
