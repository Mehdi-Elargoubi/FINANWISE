import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { canActivate, redirectUnauthorizedTo, redirectLoggedInTo } from '@angular/fire/auth-guard';
import { FirestoreFormComponent } from './components/firestore-form/firestore-form.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { StockRecommendationComponent } from './components/stock-recommendation/stock-recommendation.component';
import { StockSearchComponent } from './components/stock-search/stock-search.component';
import { ExchangeRatesComponent } from './components/exchange-rates/exchange-rates.component';


const redirectLoggedInToDashboard = () => redirectLoggedInTo(['dashboard']);
const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);

const routes: Routes = [
  { path: 'login', component: LoginComponent, ...canActivate(redirectLoggedInToDashboard) },
  { path: 'register', component: RegisterComponent, ...canActivate(redirectLoggedInToDashboard) },
  { path: 'dashboard', component: DashboardComponent,...canActivate(redirectUnauthorizedToLogin) },
  { path: 'firestore-form', component: FirestoreFormComponent, ...canActivate(redirectUnauthorizedToLogin) },
  { path: 'stockRecomendation', component: StockRecommendationComponent, ...canActivate(redirectUnauthorizedToLogin) },
  { path: 'Stock-search', component: StockSearchComponent, ...canActivate(redirectUnauthorizedToLogin) },


  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'forgot-password', component: ForgotPasswordComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
