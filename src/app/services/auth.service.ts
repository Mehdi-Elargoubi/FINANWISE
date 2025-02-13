import { inject, Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, sendPasswordResetEmail, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/user.model';


@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private auth = inject(Auth);
  private router = inject(Router);

  constructor() {}
  
  register(email: string, password: string): Promise<void> {
    return createUserWithEmailAndPassword(this.auth, email, password)
      .then((userCredential) => {
        console.log('Inscription success'
          //, userCredential.user
        );
        this.router.navigate(['/dashboard']);
      })
      .catch((error) => {
        console.error('Inscription echouer erreur:', error);
        throw error;
      });
  }

  login(email: string, password: string): Promise<void> {
    return signInWithEmailAndPassword(this.auth, email, password)
      .then((userCredential) => {
        console.log('Login success', userCredential.user);
        this.router.navigate(['/dashboard']);
      })
      .catch((error) => {
        console.error('Erreur:', error);
        throw error;
      });
    }

  logout(): Promise<void> {
    return signOut(this.auth)
      .then(() => {
        console.log('Logout success');
        this.router.navigate(['/login']);
      })
      .catch((error) => {
        console.error('Erreur:', error);
        throw error;
      });
  }

  resetPassword(email: string): Promise<void> {
    return sendPasswordResetEmail(this.auth, email)
      .then(() => {
        console.log('Email sent');
      })
      .catch((error) => {
        console.error('Erreur:', error);
        throw error;
      });
  }


}
