import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { PdfGeneratorComponent } from '../pdf-generator/pdf-generator.component';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-listedemandecartes',
  standalone: true,
  imports: [CommonModule, NavbarComponent, PdfGeneratorComponent,ReactiveFormsModule],
  templateUrl: './listedemandecartes.component.html',
  styleUrl: './listedemandecartes.component.css'
})
export class ListedemandecartesComponent {

}
