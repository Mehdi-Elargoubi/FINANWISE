// stock-search.component.ts
import { Component } from '@angular/core';
import { StockSearchService } from '../../services/stock-search.service';
import { Stock } from '../../models/Stock';  // Importez l'interface Stock

@Component({
  selector: 'app-stock-search',
  templateUrl: './stock-search.component.html',
  styleUrls: ['./stock-search.component.css']
})
export class StockSearchComponent {
  query: string = ''; // Variable pour le champ de recherche
  stocks: Stock[] = []; // Liste des stocks récupérés
  isLoading: boolean = false; // Indicateur de chargement
  error: string = ''; // Message d'erreur

  constructor(private stockSearchService: StockSearchService) {}

  onSearch(): void {
    if (this.query.length < 2) {
      this.error = 'Veuillez entrer au moins deux caractères';
      return;
    }
    this.isLoading = true;
    this.error = '';
    this.stockSearchService.searchStocks(this.query).subscribe(
      (data: Stock[]) => {  // Spécifiez que 'data' est un tableau de Stock
        this.stocks = data;
        this.isLoading = false;
      },
      (err) => {
        this.error = 'Erreur lors de la récupération des données';
        this.isLoading = false;
      }
    );
  }
}
