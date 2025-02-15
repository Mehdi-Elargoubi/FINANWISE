import { Component, inject, signal } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import { merge } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { createUserWithEmailAndPassword, sendEmailVerification, Auth } from '@angular/fire/auth';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  private authService = inject(AuthService);
  private router = inject(Router);
  private auth = inject(Auth);

  email = new FormControl('', [Validators.required, Validators.email]);
  //email: string = '';
  password: string = '';
  hide = signal(true);
  errorMessage = signal('');
  verificationMessage = signal('');

  constructor() {
    merge(this.email.statusChanges, this.email.valueChanges)
    .pipe(takeUntilDestroyed())
    .subscribe(() => this.updateErrorMessage());
  }

  async register1() {
    try {
      await this.authService.register(this.email.value! , this.password);
      this.router.navigate(['/dashboard']);
    } catch (error) {
      console.error(error);
    }
  }

  register(): void {
    createUserWithEmailAndPassword(this.auth, this.email.value!, this.password)
      .then((userCredential) => {
        // Envoyer un email de vérification
        sendEmailVerification(userCredential.user)
          .then(() => {
            console.log('Email de vérification envoyé');
            this.verificationMessage.set('Un email de vérification a été envoyé. Veuillez vérifier votre boîte de réception.');
            // Déconnecter l'utilisateur immédiatement après l'envoi de l'email de vérification
            this.auth.signOut();
          })
          .catch((error) => {
            console.error('Erreur lors de l\'envoi de l\'email de vérification:', error);
          });
      })
      .catch((error) => {
        console.error('Erreur lors de l\'inscription:', error);
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
    event.preventDefault();
    event.stopPropagation();
    this.hide.set(!this.hide());
  }

}
