import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { merge } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  //imports: [MatFormFieldModule, MatInputModule, FormsModule, ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class LoginComponent {
  private auth = inject(Auth);
  private authService = inject(AuthService);
  //email: string = '';
  email = new FormControl('', [Validators.required, Validators.email]);
  password: string = '';
  private router = inject(Router);
  errorMessage = signal('');
  hide = signal(true);


  constructor() {
    merge(this.email.statusChanges, this.email.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateErrorMessage());
  }

  login() {
    this.authService.login(this.email.value!, this.password)
      .then(() => {
        this.router.navigate(['/dashboard']);
      })
      .catch((error) => {
        console.error('Login error:', error);
      });

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
    event.preventDefault(); // Empêche la soumission du formulaire
    event.stopPropagation(); // Empêche la propagation de l'événement
    this.hide.set(!this.hide());
  }


}

