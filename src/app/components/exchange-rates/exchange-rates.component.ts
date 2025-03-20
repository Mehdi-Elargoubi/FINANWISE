import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ExchangeRateService } from '../../services/exchange-rate.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-exchange-rates',
  templateUrl: './exchange-rates.component.html',
  styleUrl: './exchange-rates.component.css'
})
export class ExchangeRatesComponent implements OnInit {
  exchangeRates: any;
  filteredRates: any;
  exchangeRateForm: FormGroup;
  currencies: string[] = [];
  displayedColumns: string[] = ['currency', 'rate'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

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
        this.dataSource = new MatTableDataSource(Object.entries(this.filteredRates).map(([key, value]) => ({ key, value })));
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      (error) => {
        console.error('Erreur lors de la récupération des taux de change:', error);
      }
    );
  }

  applyFilter(filterValue: string): void {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getFlagUrl(currencyCode: string): string {
    return `https://flagcdn.com/48x36/${currencyCode.substring(0, 2).toLowerCase()}.png`;
  }
}

