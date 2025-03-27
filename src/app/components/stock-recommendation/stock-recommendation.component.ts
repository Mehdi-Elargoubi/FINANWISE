import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FinnhubService } from '../../services/finnhub.service';
import { Recommendation } from '../../models/recommendation';

@Component({
  selector: 'app-stock-recommendation',
  templateUrl: './stock-recommendation.component.html',
  styleUrls: ['./stock-recommendation.component.css']
})

export class StockRecommendationComponent {
  recommendationForm: FormGroup;
  recommendations: Recommendation[] = [];
  numberOfShares: number | null = null;
  decision: string | null = null;

  constructor(private finnhubService: FinnhubService) {
    this.recommendationForm = new FormGroup({
      symbol: new FormControl('', [Validators.required]),
      budget: new FormControl('', [Validators.required, Validators.min(10)])
    });
  }

  fetchRecommendations() {
    if (this.recommendationForm.invalid) {
      return;
    }

    const symbol = this.recommendationForm.value.symbol;
    const budget = this.recommendationForm.value.budget;

    this.finnhubService.getRecommendation(symbol).subscribe((data: Recommendation[]) => {
      this.recommendations = data;
      if (data.length > 0) {
        const latestRecommendation = data[0];
        const date = new Date(latestRecommendation.period); 
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        
        latestRecommendation.period = `${day}/${month}/${year}`;
        const { hold, buy, sell } = latestRecommendation;

        const total = hold + buy + sell;
        let risk: number | null;
        let investir: number | null;

        if (hold === Math.max(hold, buy, sell)) {
          risk = hold / total;
          this.decision = `Il est conseillé d'attendre avant de prendre une décision. Le niveau de risque associé est de ${risk.toFixed(2)}.`;
        } else if (sell === Math.max(hold, buy, sell)) {
          risk = sell / total;
          this.decision = `Il est préférable de vendre vos actions si vous en possédez. Le risque estimé est de ${risk.toFixed(2)}.`;
        } else if (buy === Math.max(hold, buy, sell)) {
          investir = (buy / total) * budget;
          this.decision = `Il est recommandé d'acheter des actions de ce stock. Avec votre budget, vous devriez investir environ ${investir.toFixed(2)} €.`;
        }

      }
    });
  }
}
