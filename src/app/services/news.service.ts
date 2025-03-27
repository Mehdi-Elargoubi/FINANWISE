import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { News } from './../models/news.model';

@Injectable({
  providedIn: 'root',
})
export class NewsService {
  private apiUrl = 'https://finnhub.io/api/v1/news?category=general&token=cv5apohr01qj2ke0ajs0cv5apohr01qj2ke0ajsg';

  constructor(private http: HttpClient) {}

  getNews(): Observable<News[]> {
    return this.http.get<News[]>(this.apiUrl);
  }
}
