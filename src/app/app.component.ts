import { Component, OnInit } from '@angular/core';
import { ApiService } from './api.service';
import { FinnhubStock } from './model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'finanwise';
  constructor(private api:ApiService){}
  public finnhub? : FinnhubStock;
  public ngOnInit(){
    this.api.getFinannhubStock('GOOGL').subscribe((data)=>{
      this.finnhub=data;
    })
  }

}
