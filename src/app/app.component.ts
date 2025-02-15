import { Component, inject, OnInit, signal } from '@angular/core';
import { ApiService } from './api.service';
import { FinnhubStock } from './model';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';
import { Auth, onAuthStateChanged } from '@angular/fire/auth';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  private authService = inject(AuthService);
  private auth = inject(Auth);
  private router = inject(Router);
  private api = inject(ApiService);
  isLoggedIn = signal(false);

  title = 'finanwise';
  constructor(){
    onAuthStateChanged(this.auth, (user) => {
      this.isLoggedIn.set(!!user);
    });
  }
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
