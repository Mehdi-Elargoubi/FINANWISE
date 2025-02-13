import { Component, inject, signal } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import { merge } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  email = new FormControl('', [Validators.required, Validators.email]);
  //email: string = '';
  password: string = '';
  hide = signal(true);
  errorMessage = signal('');

  constructor() {
    merge(this.email.statusChanges, this.email.valueChanges)
    .pipe(takeUntilDestroyed())
    .subscribe(() => this.updateErrorMessage());
  }

  async register() {
    try {
      await this.authService.register(this.email.value! , this.password);
      this.router.navigate(['/dashboard']);
    } catch (error) {
      console.error(error);
    }
  }


  updateErrorMessage(): void {
    if (this.email.hasError('required')) {
      this.errorMessage.set('You must enter a value');
    } else if (this.email.hasError('email')) {
      this.errorMessage.set('Not a valid email');
    } else {
      this.errorMessage.set('');
    }
  }

  toggleHide(event: MouseEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.hide.set(!this.hide());
  }

}
