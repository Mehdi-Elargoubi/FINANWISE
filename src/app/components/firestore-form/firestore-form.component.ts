import { Component, inject } from '@angular/core';
import { addDoc, Firestore } from '@angular/fire/firestore';
import { collection } from 'firebase/firestore';
import { FirestoreService } from '../../services/firestore.service';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-firestore-form',
  templateUrl: './firestore-form.component.html',
  styleUrl: './firestore-form.component.css'
})

export class FirestoreFormComponent {
  private firestore = inject(Firestore);
  private firestoreService = inject(FirestoreService);
  name = new FormControl('', [Validators.required]);
  email = new FormControl('', [Validators.required, Validators.email]);
  age = new FormControl('', [Validators.required, Validators.min(0)]);

  private snackBar = inject(MatSnackBar);

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
        this.snackBar.open('Données ajoutées avec succès', 'Fermer', {
          duration: 5000,
          verticalPosition: 'top',
        });
        console.log('Ajouter avec success !');
        this.name.reset();
        this.email.reset();
        this.age.reset();
      })
      .catch((error) => {
        console.error('Erreur : ', error);
        this.snackBar.open('Erreur lors d ajout des données', 'Fermer', {
          duration: 5000,
          verticalPosition: 'top',
        });

      });
  }
  
}
