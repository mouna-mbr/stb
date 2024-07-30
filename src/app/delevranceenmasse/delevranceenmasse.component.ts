import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { PdfGeneratorComponent } from '../pdf-generator/pdf-generator.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import * as Papa from 'papaparse';
import { CarteService } from '../Service/CarteService.service';
import { Cartes } from '../Models/Cartes';

@Component({
  selector: 'app-delevranceenmasse',
  standalone: true,
  imports: [CommonModule, NavbarComponent, PdfGeneratorComponent, ReactiveFormsModule],
  templateUrl: './delevranceenmasse.component.html',
  styleUrls: ['./delevranceenmasse.component.css']
})
export class DelevranceenmasseComponent {
  selectedFile: File | null = null;
  csvData: any[] = [];
  csvHeaders: string[] = [];

  constructor(private http: HttpClient,    private router: Router,    private carteService: CarteService, private toastr: ToastrService,    private actRoute: ActivatedRoute  ) {}

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
    if (this.selectedFile) {
      this.parseCSV();
    }
  }

  parseCSV(): void {
    if (this.selectedFile) {
      Papa.parse(this.selectedFile, {
        complete: (result: Papa.ParseResult<any>) => {
          this.csvHeaders = result.data[0] as string[]; // Premier ligne comme en-tête
          this.csvData = result.data.slice(1).filter(row => row && row.length > 0 && row.some((cell: string) => cell !== '')); // Filtrer les lignes vides
        },
        header: false
      });
    }
  }

  onSubmit(): void {
    if (this.csvData.length === 0) {
      this.showError('Aucune donnée CSV à envoyer.');
      return;
    }
  
    // Filtrer les données CSV pour enlever les lignes nulles ou vides (double vérification)
    const filteredCsvData = this.csvData.filter(row => row && row.length > 0 && row.some((cell: string) => cell !== ''));
  
    console.log(filteredCsvData.length);
    this.actRoute.params.subscribe((param) => {
      const idDemande = param['id'];
    // Traiter les données CSV pour créer des cartes
    filteredCsvData.forEach((row) => {
      
      if (row != null) {
        const carte: Cartes = {
          cin: row[3],
          gsm: row[5],
          email: row[6],
          nomprenom: row[0] + " " + row[1],
          datedenaissance: row[4],
          datedevalidation: new Date(new Date().setFullYear(new Date().getFullYear() + 4)),
          codepin: this.generateUniqueCode(100, 900), // Remplacer par une méthode pour assurer l'unicité
          codecarte: this.generateUniqueCode(1000, 9000), // Remplacer par une méthode pour assurer l'unicité
          numeroducarte: this.generateUniqueCode(1000000000000000, 9000000000000000), // Remplacer par une méthode pour assurer l'unicité
          delevranceF: false,
          delevranceI: true,
          idUser: localStorage.getItem('id')!, // Assurez-vous que cet ID est valide
          time: new Date(),
          statut: 'En Attente',
          idDemande: idDemande // Vous devrez peut-être remplacer ceci par l'ID réel de la demande
        };
  
        console.log(carte);
  
        // Appel au service pour ajouter une carte
        this.carteService.addCarte(carte).subscribe(
          () => {
            this.showSuccess('Carte créée avec succès !');
            this.router.navigate(["listeIdelevanceU"]);

          },
          error => {
            this.showError('Une erreur est survenue lors de la création de la carte.');
          }
        );
      }
    });
    }
    // Supposons que les données CSV aient les colonnes dans l'ordre suivant: cin, gsm, email, nomprenom, datedenaissance
  )}
  

  generateUniqueCode(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  showSuccess(message: string) {
    const toastrOptions = {
      timeOut: 2000,
      toastClass: 'toast-custom toast-success'
    };
    this.toastr.success(message, 'Succès', toastrOptions);
  }

  showError(message: string, title: string = 'Erreur', options?: any) {
    const toastrOptions = {
      timeOut: 2000,
      toastClass: 'toast-custom'
    };
    this.toastr.error(message, title, { ...toastrOptions, ...options });
  }
}
