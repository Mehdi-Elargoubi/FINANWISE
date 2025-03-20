import { Component, OnInit } from '@angular/core';
import { ExchangeRateService } from '../../services/exchange-rate.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-exchange-rates',
  templateUrl: './exchange-rates.component.html',
  styleUrl: './exchange-rates.component.css'
})

export class ExchangeRatesComponent implements OnInit {
  exchangeRates: any;
  exchangeRateForm: FormGroup;
  filteredRates: any;
  currencies: string[] = [];
  displayedColumns: string[] = ['currency', 'rate'];

  constructor(private exchangeRateService: ExchangeRateService) {
    this.exchangeRateForm = new FormGroup({
      baseCode: new FormControl('', [Validators.required]),
      conversionRates: new FormControl([], [Validators.required])
    });
  }

  ngOnInit(): void {
    // Initialiser avec USD comme code de base par défaut
    this.exchangeRateService.getExchangeRates('USD', []).subscribe(
      (data) => {
        this.exchangeRates = data.conversion_rates;
        this.currencies = Object.keys(this.exchangeRates);
      },
      (error) => {
        console.error('Erreur lors de la récupération des taux de change:', error);
      }
    );
  }

  getExchangeRates(): void {
    const baseCode = this.exchangeRateForm.get('baseCode')?.value;
    const conversionRates = this.exchangeRateForm.get('conversionRates')?.value;

    this.exchangeRateService.getExchangeRates(baseCode, conversionRates).subscribe(
      (data) => {
        this.exchangeRates = data.conversion_rates;
        this.filteredRates = conversionRates.reduce((acc: any, rate: string) => {
          if (this.exchangeRates[rate]) {
            acc[rate] = this.exchangeRates[rate];
          }
          return acc;
        }, {});
        console.log(this.filteredRates);
      },
      (error) => {
        console.error('Erreur lors de la récupération des taux de change:', error);
      }
    );
  }

  getFlagUrl(currencyCode: string): string {
    return `https://flagcdn.com/48x36/${currencyCode.substring(0, 2).toLowerCase()}.png`;
  }

}


// export class ExchangeRatesComponent implements OnInit {
//   exchangeRates: any;

//   constructor(private exchangeRateService: ExchangeRateService) {}

//   ngOnInit(): void {
//     this.exchangeRateService.getExchangeRates().subscribe(
//       (data) => {
//         this.exchangeRates = data;
//         console.log(this.exchangeRates);
//       },
//       (error) => {
//         console.error('Erreur lors de la récupération des taux de change:', error);
//       }
//     );
//   }
// }

