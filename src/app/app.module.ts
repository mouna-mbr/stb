import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormComponent } from './form/form.component';
import { AdminehomeComponent } from './adminehome/adminehome.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
export const routes : Routes = [];

@NgModule({
  declarations: [
    AppComponent,
    FormComponent,
    AdminehomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,   
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forRoot(routes, {anchorScrolling: 'enabled'})  
  ],
  providers: [],
  bootstrap: [AppComponent]

})
export class AppModule { }
