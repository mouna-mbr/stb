import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { User } from '../Models/User';
import { PdfGeneratorComponent } from '../pdf-generator/pdf-generator.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IndividualConfig, ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { DemandecartesService } from '../Service/DemandecartesService.service'; // Renommé pour suivre la convention de nommage
import {  Demandecarteswithoutid } from '../Models/Demandecartes';
import { userservice } from '../Service/User.service';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, NavbarComponent, PdfGeneratorComponent,ReactiveFormsModule],
    templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
ngOnInit(): void {
    
}
constructor(private fb: FormBuilder,private route:Router , private actRoute:ActivatedRoute,private demandeservice: DemandecartesService){}

commander(){
  if(localStorage.getItem('id') !== null){
    this.route.navigate(["demande"]);

  }else{
    this.route.navigate(["login"]);

  }
}
}
