import { Component, OnInit } from '@angular/core';
import { NewsService } from './../../services/news.service';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.css'],
})
export class ArticleListComponent implements OnInit {
  articles: any[] = [];
  isLoading = false;

  constructor(private newsService: NewsService) {}

  ngOnInit(): void {
    this.loadArticles();
  }
  

  loadArticles(): void {
    this.isLoading = true;

    this.newsService.getNews().subscribe(
      (response) => {
        this.articles = response;
        this.isLoading = false;
      },
      (error) => {
        console.error('Erreur lors de la récupération des articles:', error);
        this.isLoading = false;
      }
    );
  }

  toggleExpand(article: any): void {
    article.expanded = !article.expanded;
  }

  openLink(url: string): void {
    window.open(url, '_blank');
  }
  //checkImage(imageUrl: string | null | undefined): boolean {
  //return !!imageUrl && imageUrl.trim() !== '' && imageUrl.startsWith('http');
  //}
}
