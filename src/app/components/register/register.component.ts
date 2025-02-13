import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  email: string = '';
  password: string = '';
  private authService = inject(AuthService);
  private router = inject(Router);

  constructor() {}

  async register() {
    try {
      await this.authService.register(this.email, this.password);
      this.router.navigate(['/dashboard']);
    } catch (error) {
      console.error(error);
    }
  }

}
