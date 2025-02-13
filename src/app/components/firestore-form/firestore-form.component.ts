import { Component, inject } from '@angular/core';
import { addDoc, Firestore } from '@angular/fire/firestore';
import { collection } from 'firebase/firestore';
import { FirestoreService } from '../../services/firestore.service';

@Component({
  selector: 'app-firestore-form',
  templateUrl: './firestore-form.component.html',
  styleUrl: './firestore-form.component.css'
})

export class FirestoreFormComponent {
  private firestore = inject(Firestore);
  name: string = '';
  email: string = '';
  age: number | null = null;

  private firestoreService = inject(FirestoreService);

  constructor() {}

  addData() {
    const testdataCollection = collection(this.firestore, 'testData');
    const data = {
      Nom: this.name,
      Email: this.email,
      Age: this.age
    };

    addDoc(testdataCollection, data)
      .then(() => {
        console.log('Ajouter avec success !');
        this.name = '';
        this.email = '';
        this.age = null;
      })
      .catch((error) => {
        console.error('Erreur : ', error);
      });
  }
  
}
