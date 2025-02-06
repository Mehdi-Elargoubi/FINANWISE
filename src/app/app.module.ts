import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    provideFirebaseApp(() => initializeApp({"projectId":"finanwise-c4784","appId":"1:413102413365:web:342a9f7d3f77f54c61c37c","storageBucket":"finanwise-c4784.firebasestorage.app","apiKey":"AIzaSyAo3hE9ORY_Uga2NxXiXdG14FLPb_g9LVM","authDomain":"finanwise-c4784.firebaseapp.com","messagingSenderId":"413102413365"})),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore())
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
