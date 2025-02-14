import { Component, inject } from '@angular/core';
import { addDoc, Firestore } from '@angular/fire/firestore';
import { collection } from 'firebase/firestore';
import { FirestoreService } from '../../services/firestore.service';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-firestore-form',
  templateUrl: './firestore-form.component.html',
  styleUrl: './firestore-form.component.css'
})

export class FirestoreFormComponent {
  private firestore = inject(Firestore);
  // name: string = '';
  // email: string = '';
  // age: number | null = null;
  name = new FormControl('', [Validators.required]);
  email = new FormControl('', [Validators.required, Validators.email]);
  age = new FormControl('', [Validators.required, Validators.min(0)]);


  private firestoreService = inject(FirestoreService);

  constructor() {}

  addData() {
    const testdataCollection = collection(this.firestore, 'testData');
    const data = {
      nom: this.name.value,
      email: this.email.value,
      age: this.age.value
    };

    addDoc(testdataCollection, data)
      .then(() => {
        console.log('Ajouter avec success !');
        this.name.reset();
        this.email.reset();
        this.age.reset();
      })
      .catch((error) => {
        console.error('Erreur : ', error);
      });
  }
  
}
