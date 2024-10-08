import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormComponent } from './form/form.component';
import { AdminehomeComponent } from './adminehome/adminehome.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './register/register.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component'; // Import HttpClientModule
import { DemandedecarteComponent } from './demandedecarte/demandedecarte.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { NavbarComponent } from './navbar/navbar.component';
import { PdfGeneratorComponent } from './pdf-generator/pdf-generator.component';
import { ValidationinitialComponent } from './validationinitial/validationinitial.component';
import { ListedemandecartesComponent } from './listedemandecartes/listedemandecartes.component';
import { ValidationfinalComponent } from './validationfinal/validationfinal.component';
import { ListefinaldemandecartesComponent } from './listefinaldemandecartes/listefinaldemandecartes.component';
import { SuiviedemandeComponent } from './suiviedemande/suiviedemande.component';
import { HomeComponent } from './home/home.component';
import { DelevranceunitaireComponent } from './delevranceunitaire/delevranceunitaire.component';
import { ListedelevranceunitaireiComponent } from './listedelevranceunitairei/listedelevranceunitairei.component';
import { DelevranceenmasseComponent } from './delevranceenmasse/delevranceenmasse.component';
import { ValidationdelevranceComponent } from './validationdelevrance/validationdelevrance.component';
import { SuivialldelivranceComponent } from './suivialldelivrance/suivialldelivrance.component';
import { RhinterfaceComponent } from './rhinterface/rhinterface.component';
import { RhsousentrepriseComponent } from './rhsousentreprise/rhsousentreprise.component';


export const routes: Routes = [
  { path: '', redirectTo: 'register', pathMatch: 'full' },
  { path: 'register', component: RegisterComponent },
  { path: 'demande', component: DemandedecarteComponent },
  { path: 'login', component: LoginComponent },
  { path: 'validationi/:id', component: ValidationinitialComponent },
  { path: 'validationf/:id', component: ValidationfinalComponent },
  { path: 'listedesdemandes', component: ListedemandecartesComponent },
  { path: 'listefianldesdemandes', component: ListefinaldemandecartesComponent },
  { path: 'suividemandes', component: SuiviedemandeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'carteunitaire/:id', component: DelevranceunitaireComponent },
  { path: 'listeIdelevanceU', component: ListedelevranceunitaireiComponent },
  { path: 'carteenmasse/:id', component: DelevranceenmasseComponent },
  { path: 'validationFD', component: ValidationdelevranceComponent },
  { path: 'suiviD', component: SuivialldelivranceComponent },
  { path: 'dashboard', component: AdminehomeComponent },
  { path: 'rhinterface', component: RhinterfaceComponent },
  { path: 'rhsousentreprise', component: RhsousentrepriseComponent },
  { path: '**', redirectTo: 'register' } // rediriger les routes inconnues vers RegisterComponent
];

@NgModule({
  declarations: [
    AppComponent,
    FormComponent,
    RegisterComponent,
    LoginComponent,
    
    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(), 
    HttpClientModule,
    RouterModule.forRoot(routes, { anchorScrolling: 'enabled' })
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA] // Ajoutez cette ligne

})
export class AppModule { }
