import { Component, inject, OnInit } from '@angular/core';
import { ApiService } from './api.service';
import { FinnhubStock } from './model';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  title = 'finanwise';
  constructor(private api:ApiService){}
  public finnhub? : FinnhubStock;
  public ngOnInit(){
    this.api.getFinannhubStock('GOOG').subscribe((data)=>{
      this.finnhub=data;
    })
  }

  logout() {
    this.authService.logout().then(() => {
      this.router.navigate(['/login']);
    });
  }


}
