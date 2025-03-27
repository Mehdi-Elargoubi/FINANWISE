import { Component, inject, signal } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
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
  private router = inject(Router);
  private snackBar = inject(MatSnackBar);

  constructor() { }

  sendResetEmail(): void {
    if (this.email.valid) {
      sendPasswordResetEmail(this.auth, this.email.value!)
        .then(() => {
          this.snackBar.open('Un email de rénitialisation de votre mot de passe vous a été envoyer - Vous serez redirigé vers la page de connexion dans quelques secondes...', 'Fermer', {
            duration: 5000,
            verticalPosition: 'top',
          });
          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 5000);
        })
        .catch((error) => {
          console.error('Erreur dans l envoi du  mail de réinitialisation :', error);
          this.snackBar.open('Erreur dans l envoi du mail de réinitialisation - vérifier votre email', 'Fermer', {
            duration: 5000,
            verticalPosition: 'top',
          });
        });
    } else {
      this.snackBar.open('Entrer un email valide', 'Fermer', {
        duration: 5000,
        verticalPosition: 'top',
      });
    }
  }

}
