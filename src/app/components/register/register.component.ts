import { Component, inject, signal } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormControl, Validators, FormGroup } from '@angular/forms';
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
  private router = inject(Router);
  private auth = inject(Auth);
  private snackBar = inject(MatSnackBar);

  registerForm = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*()_+\\-={}\\[\\]|;:"<>,.?/~`]).{8,}$')
    ]),
    confirmPassword: new FormControl('', Validators.required),
  });

  errorMessage = signal('');

  register(): void {
    if (this.registerForm.invalid || this.password?.value !== this.confirmPassword?.value) {
      this.errorMessage.set("Les mots de passe ne correspondent pas ou champs invalides.");
      return;
    }

    createUserWithEmailAndPassword(this.auth, this.email?.value!, this.password?.value!)
      .then((userCredential) => {
        sendEmailVerification(userCredential.user).then(() => {
          this.snackBar.open('Email de vérification envoyé.', 'Fermer', {
            duration: 5000,
            verticalPosition: 'top',
          });
          this.auth.signOut();
        });
      })
      .catch((error) => {
        this.snackBar.open("Erreur d'inscription", 'Fermer', {
          duration: 5000,
          verticalPosition: 'top',
        });
      });
  }

  get firstName() { return this.registerForm.get('firstName'); }
  get lastName() { return this.registerForm.get('lastName'); }
  get email() { return this.registerForm.get('email'); }
  get password() { return this.registerForm.get('password'); }
  get confirmPassword() { return this.registerForm.get('confirmPassword'); }
}
