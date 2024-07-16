import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminehomeComponent } from './adminehome/adminehome.component';
import { RegisterComponent } from './register/register.component'; // Assurez-vous d'importer RegisterComponent
import { DemandedecarteComponent } from './demandedecarte/demandedecarte.component';
import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './navbar/navbar.component';
import { PdfGeneratorComponent } from './pdf-generator/pdf-generator.component';
import { ValidationinitialComponent } from './validationinitial/validationinitial.component';
import { ListedemandecartesComponent } from './listedemandecartes/listedemandecartes.component';
import { ValidationfinalComponent } from './validationfinal/validationfinal.component';
import { ListefinaldemandecartesComponent } from './listefinaldemandecartes/listefinaldemandecartes.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: AdminehomeComponent },
  { path: 'demande', component: DemandedecarteComponent },
  { path: 'login', component: LoginComponent },
  {path:'pdf',component:PdfGeneratorComponent},
  { path: 'navbar', component: NavbarComponent },
  { path: 'validationi/:id', component: ValidationinitialComponent },
  { path: 'validationf/:id', component: ValidationfinalComponent },
  { path: 'listedesdemandes', component: ListedemandecartesComponent },
  { path: 'listefianldesdemandes', component: ListefinaldemandecartesComponent },

  { path: 'register', component: RegisterComponent } // Nouvelle route pour RegisterComponent
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
