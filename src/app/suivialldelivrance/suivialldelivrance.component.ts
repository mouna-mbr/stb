import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { PdfGeneratorComponent } from '../pdf-generator/pdf-generator.component';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Cartes } from '../Models/Cartes';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { userservice } from '../Service/User.service';
import { ToastrService } from 'ngx-toastr';
import { CarteService } from '../Service/CarteService.service';
import { User } from '../Models/User';

@Component({
  selector: 'app-suivialldelivrance',
  standalone: true,
  imports: [CommonModule, NavbarComponent, PdfGeneratorComponent, ReactiveFormsModule],
  templateUrl: './suivialldelivrance.component.html',
  styleUrls: ['./suivialldelivrance.component.css'] // Correction de 'styleUrl' à 'styleUrls'
})
export class SuivialldelivranceComponent implements OnInit {
  listCartes: Cartes[] = [];
  userc: any;
  usercarte!: User;

  iduserco: string | null = localStorage.getItem('id');
  inputForm!: FormGroup;
  existingCodes: { codepins: number[], codecarts: number[], numerocartes: number[] } = { codepins: [], codecarts: [], numerocartes: [] };
  lacarte!: Cartes;
  idCarte:any;
  selectedCarteId:any;
  selectedCarte: Cartes | null = null; // Ajout d'une variable pour stocker les détails de la carte sélectionnée

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private http: HttpClient,
    private cartes: CarteService,
    private userService: userservice,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.loadCartes();
  }

  loadCartes(): void {
    this.cartes.getAllCartes().subscribe(
      (res) => {
        this.listCartes = res;
        // Charger les utilisateurs pour chaque carte
        this.listCartes.forEach(carte => {
          this.userService.getUser(carte.idUser).subscribe(
            (user) => {
              carte.user = user;
            },
            (err) => {
              console.error('Error fetching user:', err);
            }
          );
        });
      },
      (err) => {
        console.error('Error fetching cartes:', err);
      }
    );
  }

  loadDemandeCartestoday(): void {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Remettre à zéro les heures, minutes, secondes et millisecondes pour comparer la date uniquement

    this.cartes.getAllCartes().subscribe(
      (res) => {
        this.listCartes = res.filter((carte: Cartes) => {
          const carteDate = new Date(carte.time);
          carteDate.setHours(0, 0, 0, 0); // Remettre à zéro les heures, minutes, secondes et millisecondes pour comparer la date uniquement
          return carteDate.getTime() === today.getTime();
        });

        // Charger les utilisateurs pour chaque carte
        this.listCartes.forEach(carte => {
          this.userService.getUser(carte.idUser).subscribe(
            (user) => {
              carte.user = user;
            },
            (err) => {
              console.error('Error fetching user:', err);
            }
          );
        });
      },
      (err) => {
        console.error('Error fetching cartes:', err);
      }
    );
  }
  getCarte(idCarte: any) {
    this.cartes.getCarte(idCarte).subscribe(
      res => {
        if (res.idUser == null) {
          console.error('ID utilisateur non trouvé');
        } else {
          this.router.navigate(['validationFD', idCarte]);
        }
      },
      err => {
        console.error('Erreur lors de la récupération de la carte:', err);
      }
    );
  }

  openPopup(idCarte: any): void {
    this.selectedCarteId = idCarte;
    console.log('ID de la carte sélectionnée:', this.selectedCarteId);
    this.cartes.getCarte(idCarte).subscribe(
      (carte) => {
        this.selectedCarte = carte;
        console.log('Carte sélectionnée:', this.selectedCarte);
        // Logique supplémentaire pour gérer l'ouverture de la popup si nécessaire
      },
      (err) => {
        console.error('Erreur lors de la récupération de la carte:', err);
      }
    );
  }

  loadDemandeCarteslastday(): void {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1); // Récupère la date d'hier
    yesterday.setHours(0, 0, 0, 0); // Remettre à zéro les heures, minutes, secondes et millisecondes pour comparer la date uniquement

    this.cartes.getAllCartes().subscribe(
      (res) => {
        this.listCartes = res.filter((carte: Cartes) => {
          const carteDate = new Date(carte.time);
          carteDate.setHours(0, 0, 0, 0); // Remettre à zéro les heures, minutes, secondes et millisecondes pour comparer la date uniquement
          return carteDate.getTime() === yesterday.getTime();
        });

        // Charger les utilisateurs pour chaque carte
        this.listCartes.forEach(carte => {
          this.userService.getUser(carte.idUser).subscribe(
            (user) => {
              carte.user = user;
            },
            (err) => {
              console.error('Error fetching user:', err);
            }
          );
        });
      },
      (err) => {
        console.error('Error fetching cartes:', err);
      }
    );
  }

  loadDemandeCartesthisweek(): void {
    const today = new Date();
    const startOfWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - today.getDay()); // Détermine le début de la semaine
    startOfWeek.setHours(0, 0, 0, 0); // Remettre à zéro les heures, minutes, secondes et millisecondes pour comparer la date uniquement

    this.cartes.getAllCartes().subscribe(
      (res) => {
        this.listCartes = res.filter((carte: Cartes) => {
          const demandeDate = new Date(carte.time);
          demandeDate.setHours(0, 0, 0, 0); // Remettre à zéro les heures, minutes, secondes et millisecondes pour comparer la date uniquement
          return demandeDate >= startOfWeek && demandeDate <= today;
        });

        // Charger les utilisateurs pour chaque carte
        this.listCartes.forEach(carte => {
          this.userService.getUser(carte.idUser).subscribe(
            (user) => {
              carte.user = user;
            },
            (err) => {
              console.error('Error fetching user:', err);
            }
          );
        });
      },
      (err) => {
        console.error('Error fetching cartes:', err);
      }
    );
  }

  formatCardNumber(number: string): string {
    // Masque les 4 premiers et les 4 derniers chiffres avec 'XXXX'
    return number.replace(/^(\d{4})(\d{4})(\d{4})(\d{4})$/, 'XXXX $2 $3 XXXX');
  }
  getFormattedCardNumberr(carte: Cartes): string {
    return carte ? this.formatCardNumber(String(carte.numeroDuCarte)) : '';
  }

  
  getFormattedCardNumber(): string {
    return this.selectedCarte ? this.formatCardNumber(String(this.selectedCarte.numeroDuCarte)) : '';
  }
  

}
