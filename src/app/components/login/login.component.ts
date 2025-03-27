import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { Auth, onAuthStateChanged, signInWithEmailAndPassword } from '@angular/fire/auth';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  private auth = inject(Auth);
  private authService = inject(AuthService);
  email = new FormControl('', [Validators.required, Validators.email]);
  password: string = '';
  private router = inject(Router);
  errorMessage = signal('');
  hide = signal(true);
  private snackBar = inject(MatSnackBar);

  ngOnInit(): void {
    onAuthStateChanged(this.auth, (user) => {
      if (user) {
        if (user.emailVerified) {
          console.log('Lien Email est vérifié (success)');
        }
      }
    });
  }

  login(): void {
    // Valider le champ email avant de tenter la connexion
    if (this.email.invalid) {
      if (this.email.hasError('required')) {
        this.snackBar.open('Vous devez saisir une valeur', 'Fermer', {
          duration: 5000,
          verticalPosition: 'top',
        });
      } else if (this.email.hasError('email')) {
        this.snackBar.open('Email non valide', 'Fermer', {
          duration: 5000,
          verticalPosition: 'top',
        });
      }
      return; // Arrêter l'exécution si le champ email est invalide
    }

    // Tenter la connexion si l'email est valide
    signInWithEmailAndPassword(this.auth, this.email.value!, this.password)
      .then((userCredential) => {
        if (userCredential.user.emailVerified) {
          this.router.navigate(['/dashboard']);
        } else {
          this.snackBar.open('Vérifier l email avant de se connecter', 'Fermer', {
            duration: 5000,
            verticalPosition: 'top',
          });
          this.auth.signOut();
        }
      })
      .catch((error) => {
        console.error('Erreur lors de la connexion:', error);
        this.snackBar.open('Erreur lors de connexion - Vérifier vos informations ', 'Fermer', {
          duration: 5000,
          verticalPosition: 'top',
        });
      });
  }

  toggleHide(event: MouseEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.hide.set(!this.hide());
  }
}

