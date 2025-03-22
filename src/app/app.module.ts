import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'; // Assurez-vous d'importer HttpClientModule

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { LoginComponent } from './components/login/login.component';
import { FormsModule } from '@angular/forms';
import { RegisterComponent } from './components/register/register.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { FirestoreFormComponent } from './components/firestore-form/firestore-form.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatError, MatFormFieldControl, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { StockRecommendationComponent } from './components/stock-recommendation/stock-recommendation.component';
import { StockSearchComponent } from './components/stock-search/stock-search.component';
import { ExchangeRatesComponent } from './components/exchange-rates/exchange-rates.component';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { StockHistoryComponent } from './components/stock-history/stock-history.component';





@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    FirestoreFormComponent,
    ForgotPasswordComponent,
    StockRecommendationComponent,
    StockSearchComponent,
    ExchangeRatesComponent,
    StockHistoryComponent,

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    provideFirebaseApp(() => initializeApp({"projectId":"finanwise-c4784","appId":"1:413102413365:web:342a9f7d3f77f54c61c37c","storageBucket":"finanwise-c4784.firebasestorage.app","apiKey":"AIzaSyAo3hE9ORY_Uga2NxXiXdG14FLPb_g9LVM","authDomain":"finanwise-c4784.firebaseapp.com","messagingSenderId":"413102413365"})),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),

    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatMenuModule,
    MatSnackBarModule,
    CommonModule,
    MatSelectModule,
    MatCardModule,
    MatSortModule
    
    

  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
