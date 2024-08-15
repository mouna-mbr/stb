import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { PdfGeneratorComponent } from '../pdf-generator/pdf-generator.component';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { IndividualConfig, ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { userservice } from '../Service/User.service';
import { Cartes } from '../Models/Cartes';
import { CarteService } from '../Service/CarteService.service';
import { User } from '../Models/User';

@Component({
  selector: 'app-validationdelevrance',
  standalone: true,
  imports: [CommonModule, NavbarComponent, PdfGeneratorComponent, ReactiveFormsModule],
  templateUrl: './validationdelevrance.component.html',
  styleUrls: ['./validationdelevrance.component.css']
})
export class ValidationdelevranceComponent implements OnInit {
  usercarte!: User;
  iduserco: string | null = localStorage.getItem('id');
  inputForm!: FormGroup;
  existingCodes: { codepins: number[], codecarts: number[], numerocartes: number[] } = { codepins: [], codecarts: [], numerocartes: [] };
  lacarte!: Cartes;
  idCarte: any;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private userService: userservice,
    private actRoute: ActivatedRoute,
    private carteservice: CarteService
  ) {}

  formatCardNumber(number: string): string {
    // Insère un espace après chaque groupe de 4 chiffres
    return number.replace(/(\d{4})(?=\d)/g, '$1 '); 
  }

  getFormattedCardNumber(): string {
    return this.lacarte ? this.formatCardNumber(String(this.lacarte.numeroDuCarte)) : '';
  }

  ngOnInit(): void {
    this.actRoute.params.subscribe((param) => {
      this.idCarte = param['id'];
      this.carteservice.getCarte(this.idCarte).subscribe(
        (carte) => {
          this.lacarte = carte;
          this.userService.getUser(this.lacarte.idUser).subscribe(
            (user) => {
              this.usercarte = user;
            },
            (err) => {
              console.error(err);
              this.showError('Erreur lors de la récupération de l\'utilisateur.');
            }
          );
        },
        (err) => {
          console.error(err);
          this.showError('Erreur lors de la récupération de la carte.');
        }
      );
    });
  }

  showSuccess(message: string) {
    const toastrOptions: Partial<IndividualConfig> = {
      timeOut: 2000, // Durée en millisecondes (2 secondes)
      toastClass: 'toast-custom toast-success' // Utiliser les classes personnalisées pour le succès
    };
    this.toastr.success(message, 'Succès', toastrOptions);
  }

  showError(message: string, title: string = 'Erreur', options?: Partial<IndividualConfig>) {
    const toastrOptions: Partial<IndividualConfig> = {
      timeOut: 2000, // Durée en millisecondes (2 secondes)
      toastClass: 'toast-custom'
    };
    this.toastr.error(message, title, { ...toastrOptions, ...options });
  }

  onAccept(): void {
    this.updateCarteStatus('Acceptée Dans La Délivrance Final', true);
  }

  onRefus(): void {
    this.updateCarteStatus('Refusée dans la Délivrance Final', true);
  }

  private updateCarteStatus(statut: string, delevranceF: boolean): void {
    this.carteservice.getCarte(this.idCarte).subscribe(card => {
      card.statut = statut; 
      card.delevranceF = delevranceF;
      const timestamp = card.time; // exemple de timestamp
      const date = new Date(timestamp);
      const formattedDate = date.toISOString().split('T')[0]; // Formater en yyyy-MM-dd
      const dateObject: Date = new Date(formattedDate);
      card.time=dateObject;

      const naissancestamp = card.dateDeNaissance; // exemple de timestamp
      const datenaissancestamp = new Date(naissancestamp);
      const formattedDatenaissancestamp = date.toISOString().split('T')[0]; // Formater en yyyy-MM-dd
      const dateObjectnaissance: Date = new Date(formattedDatenaissancestamp);
      card.dateDeNaissance=dateObjectnaissance;

      const timestampdatedevalidation = card.dateDeValidation; // exemple de timestamp
      const validationdate = new Date(timestampdatedevalidation);
      const formattedDatetimestampdatedevalidation = date.toISOString().split('T')[0]; // Formater en yyyy-MM-dd
      const dateObjectformattedDatetimestampdatedevalidation: Date = new Date(formattedDatetimestampdatedevalidation);
      card.dateDeValidation=dateObjectformattedDatetimestampdatedevalidation;

      console.log(card)

      this.carteservice.editCarte(this.idCarte, card).subscribe(
        () => {
          this.router.navigate(['listeIdelevanceU']);
          this.showSuccess('Carte mise à jour avec succès.');
        },
        (err) => {
          console.error(err);
          this.showError('Erreur lors de la mise à jour de la carte.');
        }
      );
    });
  }
}

