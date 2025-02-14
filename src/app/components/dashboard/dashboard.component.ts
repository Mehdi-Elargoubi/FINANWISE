import { Component, inject, ViewChild } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FirestoreService } from '../../services/firestore.service';
import { collection, collectionData, Firestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})

export class DashboardComponent {
  private router = inject(Router); ;
  private authService = inject(AuthService);
  private firestore = inject(Firestore);
  private firestoreService = inject(FirestoreService);

  displayedColumns: string[] = ['nom', 'age', 'email'];
  dataSource = new MatTableDataSource<any>();

  data!: Observable<any[]>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor() {}

  ngOnInit() {
    this.getData();
  }

  getData() {
    const testdataCollection = collection(this.firestore, 'testData');
    this.data = collectionData(testdataCollection, { idField: 'id' });
    this.data.subscribe((data) => {
      this.dataSource.data = data;
    });
  }

  logout() {
    this.authService.logout().then(() => {
      this.router.navigate(['/login']);
    });
  }

  navigateToForm() {
    this.router.navigate(['/firestore-form']);
  }
  

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

}
