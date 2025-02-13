import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FirestoreService } from '../../services/firestore.service';
import { collection, collectionData, Firestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})

export class DashboardComponent {
  private router = inject(Router); ;
  private authService = inject(AuthService);
  private firestore = inject(Firestore);

  data!: Observable<any[]>;

  constructor() {}

  ngOnInit() {
    this.getData();
  }

  getData() {
    const testdataCollection = collection(this.firestore, 'testData');
    this.data = collectionData(testdataCollection, { idField: 'id' });

  }
  logout() {
    this.authService.logout().then(() => {
      this.router.navigate(['/login']);
    });
  }

  navigateToForm() {
    this.router.navigate(['/firestore-form']);
  }
  
}
