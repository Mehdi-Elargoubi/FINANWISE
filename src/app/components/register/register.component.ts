import { Component, inject, signal } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import { merge } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { createUserWithEmailAndPassword, sendEmailVerification, Auth } from '@angular/fire/auth';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  private authService = inject(AuthService);
  private router = inject(Router);
  private auth = inject(Auth);
  private snackBar = inject(MatSnackBar);

  email = new FormControl('', [Validators.required, Validators.email]);
  password: string = '';
  hide = signal(true);
  errorMessage = signal('');
  verificationMessage = signal('');

  constructor() {
    merge(this.email.statusChanges, this.email.valueChanges)
    .pipe(takeUntilDestroyed())
    .subscribe(() => this.updateErrorMessage());
  }

  register(): void {
    createUserWithEmailAndPassword(this.auth, this.email.value!, this.password)
      .then((userCredential) => {
        sendEmailVerification(userCredential.user)
          .then(() => {
            console.log('Email de vérification envoyé');
            this.snackBar.open('Un email de vérification a été envoyé - vérifier votre boîte de réception mail', 'Fermer', {
              duration: 5000,
              verticalPosition: 'top',
            });
            this.auth.signOut();
          })
          .catch((error) => {
            console.error('Erreur d envoi de mail de vérification :', error);
            this.snackBar.open('Erreur d envoi de mail de vérification - vérifier @ email', 'Fermer', {
              duration: 5000,
              verticalPosition: 'top',
            });
          });
      })
      .catch((error) => {
        console.error('Erreur d inscription:', error);
        this.snackBar.open('Erreur d inscription - vérifier vos infos', 'Fermer', {
          duration: 5000,
          verticalPosition: 'top',
        });
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
