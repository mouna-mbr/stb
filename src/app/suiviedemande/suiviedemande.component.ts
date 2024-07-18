import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { PdfGeneratorComponent } from '../pdf-generator/pdf-generator.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Demandecartes } from '../Models/Demandecartes';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { DemandecartesService } from '../Service/DemandecartesService.service';
import { userservice } from '../Service/User.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-suiviedemande',
  standalone: true,
  imports: [CommonModule, NavbarComponent, PdfGeneratorComponent, ReactiveFormsModule],
  templateUrl: './suiviedemande.component.html',
  styleUrl: './suiviedemande.component.css'
})
export class SuiviedemandeComponent {

}
