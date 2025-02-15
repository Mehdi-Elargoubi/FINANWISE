import { Component, inject, signal } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { sendPasswordResetEmail } from 'firebase/auth';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css'
})
export class ForgotPasswordComponent {
  private auth = inject(Auth);
  email = new FormControl('', [Validators.required, Validators.email]);
  errorMessage = signal('');
  successMessage = signal('');
  private router = inject(Router);

  constructor() { }

  sendResetEmail(): void {
    if (this.email.valid) {
      sendPasswordResetEmail(this.auth, this.email.value!)
        .then(() => {
          this.successMessage.set('email de réinitialisation de mdp a été envoyé dans boîte de mail');
          this.errorMessage.set('');
          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 5000); 
        })
        .catch((error) => {
          console.error('Erreur dans l envoi du  mail de réinitialisation :', error);
          this.errorMessage.set('Erreur dans l envoi du mail de réinitialisation - vérifier l @ email.');
          this.successMessage.set('');
        });
    } else {
      this.errorMessage.set('Entrer une @ mail valide');
      this.successMessage.set('');
    }
  }

}
