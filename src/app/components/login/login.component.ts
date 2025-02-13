import { Component, inject } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  private auth = inject(Auth);
  private authService = inject(AuthService);
  email: string = '';
  password: string = '';
  private router=inject(Router);

  constructor() {}
  
  login() {
    this.authService.login(this.email, this.password)
    .then(() => {
      this.router.navigate(['/dashboard']);
    })
    .catch((error) => {
      console.error('Login error:', error);
    });

  }


}
