import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StockService } from '../../services/historique-stock.service';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-stock-history',
  templateUrl: './stock-history.component.html',
  styleUrls: ['./stock-history.component.css']
})
export class StockHistoryComponent implements OnInit {
  stockForm: FormGroup;
  stockChart: any;

  constructor(private fb: FormBuilder, private stockService: StockService) {
    this.stockForm = this.fb.group({
      symbol: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  fetchStockData() {
    if (this.stockForm.valid) {
      const symbol = this.stockForm.value.symbol;
      this.stockService.getStockHistory(symbol).subscribe((data: any) => {
        const timeSeries = data['Time Series (Daily)'];
        if (timeSeries) {
          this.updateChart(timeSeries);
        }
      });
    }
  }

  updateChart(timeSeries: any) {
    const labels = Object.keys(timeSeries).slice(0, 30).reverse();
    const prices = labels.map(date => parseFloat(timeSeries[date]['4. close']));

    if (this.stockChart) {
      this.stockChart.destroy();
    }

    const ctx = document.getElementById('stockChart') as HTMLCanvasElement;
    this.stockChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels,
        datasets: [{
          label: 'Prix de clôture',
          data: prices,
          borderColor: 'green',
          fill: true
        }]
      },
      options: {
        plugins: {
          title: {
            display: true,
            text: 'Historique des prix de stock ' + this.stockForm.value.symbol, 
            font: {
              size: 16
            },
            color: 'white' 
          }
        },
        scales: {
          x: {
            ticks: {
              color: 'white'
            },
            grid: {
              color: 'rgba(255, 255, 255, 0.05)' 
            }
          },
          y: {
            ticks: {
              color: 'white' 
            },
            grid: {
              color: 'rgba(255, 255, 255, 0.05)' 
            }
          }
        }
      }
    });
  }
}
