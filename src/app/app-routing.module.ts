import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminehomeComponent } from './adminehome/adminehome.component';
import { RegisterComponent } from './register/register.component'; // Assurez-vous d'importer RegisterComponent
import { DemandedecarteComponent } from './demandedecarte/demandedecarte.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: AdminehomeComponent },
  { path: 'demande', component: DemandedecarteComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent } // Nouvelle route pour RegisterComponent
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
