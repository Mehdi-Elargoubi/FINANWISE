import { Component, inject, signal, HostListener } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';
import { Auth, onAuthStateChanged } from '@angular/fire/auth';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  
  /** Indique si l'écran est en mode mobile (true si < 768px) */
  isMobile: boolean = window.innerWidth < 768;

  /** Signal pour suivre l'état d'authentification */
  isLoggedIn = signal(false);

  /** Injection des services */
  private authService = inject(AuthService);
  private auth = inject(Auth);
  private router = inject(Router);

  /** Constructeur : Initialise l'état d'authentification et détecte la taille de l'écran */
  constructor() {
    // Vérifie l'état d'authentification de l'utilisateur en temps réel
    onAuthStateChanged(this.auth, (user) => {
      this.isLoggedIn.set(!!user);
    });

    // Vérifie la taille de l'écran au chargement initial
    this.checkScreenSize();
  }

  /** Déconnecte l'utilisateur et redirige vers la page de connexion */
  logout() {
    this.authService.logout().then(() => {
      this.router.navigate(['/login']);
    });
  }

  /** Écoute les changements de taille de la fenêtre et met à jour `isMobile` */
  @HostListener('window:resize', ['$event'])
  checkScreenSize() {
    this.isMobile = window.innerWidth < 768;
  }
}
