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
import { IndividualConfig, ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-suiviedemande',
  standalone: true,
  imports: [CommonModule, NavbarComponent, PdfGeneratorComponent, ReactiveFormsModule],
  templateUrl: './suiviedemande.component.html',
  styleUrls: ['./suiviedemande.component.css'] 
})
export class SuiviedemandeComponent implements OnInit {
  listDemandeCartes: Demandecartes[] = [];
  valistationfisdone!: boolean;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private http: HttpClient,
    private demandeService: DemandecartesService,
    private userService: userservice,
    private toastr: ToastrService
  ) {}

ngOnInit(): void {
  this.loadDemandeCartes();
}

loadDemandeCartes(): void {
  this.demandeService.getAllDemandeCarte().subscribe(
    (res) => {
      this.listDemandeCartes = res;

      // Charger les utilisateurs pour chaque demande
      this.listDemandeCartes.forEach(demande => {
        this.userService.getUser(demande.idUser).subscribe(
          (user) => {
            demande.user = user;
          },
          (err) => {
            console.error('Error fetching user:', err);
          }
        );
      });

      // Vérifiez les données après le chargement
    },
    (err) => {
      console.error('Error fetching demande cartes:', err);
    }
  );
}

  
  

  loadDemandeCartestoday(): void {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Remettre à zéro les heures, minutes, secondes et millisecondes pour comparer la date uniquement

    this.demandeService.getAllDemandeCarte().subscribe(
      (res) => {
        this.listDemandeCartes = res.filter((demande: Demandecartes) => {
          const demandeDate = new Date(demande.time);
          demandeDate.setHours(0, 0, 0, 0); // Remettre à zéro les heures, minutes, secondes et millisecondes pour comparer la date uniquement
          return demandeDate.getTime() === today.getTime();
        });

        // Charger les utilisateurs pour chaque demande
        this.listDemandeCartes.forEach(demande => {
          this.userService.getUser(demande.idUser).subscribe(
            (user) => {
              demande.user = user;
            },
            (err) => {
              console.error('Error fetching user:', err);
            }
          );
        });
      },
      (err) => {
        console.error('Error fetching demande cartes:', err);
      }
    );
  }

  loadDemandeCarteslastday(): void {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1); // Récupère la date d'hier
    yesterday.setHours(0, 0, 0, 0); // Remettre à zéro les heures, minutes, secondes et millisecondes pour comparer la date uniquement

    this.demandeService.getAllDemandeCarte().subscribe(
      (res) => {
        this.listDemandeCartes = res.filter((demande: Demandecartes) => {
          const demandeDate = new Date(demande.time);
          demandeDate.setHours(0, 0, 0, 0); // Remettre à zéro les heures, minutes, secondes et millisecondes pour comparer la date uniquement
          return demandeDate.getTime() === yesterday.getTime();
        });

        // Charger les utilisateurs pour chaque demande
        this.listDemandeCartes.forEach(demande => {
          this.userService.getUser(demande.idUser).subscribe(
            (user) => {
              demande.user = user;
            },
            (err) => {
              console.error('Error fetching user:', err);
            }
          );
        });
      },
      (err) => {
        console.error('Error fetching demande cartes:', err);
      }
    );
  }

  loadDemandeCartesthisweek(): void {
    const today = new Date();
    const startOfWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - today.getDay()); // Détermine le début de la semaine
    startOfWeek.setHours(0, 0, 0, 0); // Remettre à zéro les heures, minutes, secondes et millisecondes pour comparer la date uniquement

    this.demandeService.getAllDemandeCarte().subscribe(
      (res) => {
        this.listDemandeCartes = res.filter((demande: Demandecartes) => {
          const demandeDate = new Date(demande.time);
          demandeDate.setHours(0, 0, 0, 0); // Remettre à zéro les heures, minutes, secondes et millisecondes pour comparer la date uniquement
          return demandeDate >= startOfWeek && demandeDate <= today;
        });

        // Charger les utilisateurs pour chaque demande
        this.listDemandeCartes.forEach(demande => {
          this.userService.getUser(demande.idUser).subscribe(
            (user) => {
              demande.user = user;
            },
            (err) => {
              console.error('Error fetching user:', err);
            }
          );
        });
      },
      (err) => {
        console.error('Error fetching demande cartes:', err);
      }
    );
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
      toastClass: 'toast-custom',
      //iconClass: 'fas fa-exclamation-circle' // Ajoutez l'icône ici si nécessaire
    };
    this.toastr.error(message, title, { ...toastrOptions, ...options });
  }

  getDemande(idDemande: any): void {
    this.listDemandeCartes.forEach(demande => {
      this.demandeService.getDemandeCarte(idDemande).subscribe(
        (res) => {
          if (res.nombreDeCartes === 1) {
            if (res.statut === "Acceptée Dans La Validation Final ") {
              this.router.navigate(['carteunitaire', idDemande]);
            } else {
              this.showError("Votre demande n'est pas encore validée !");
            }
          } else {
            if (res.statut === "Acceptée Dans La Validation Final ") {
              this.router.navigate(['carteenmasse', idDemande]);
            } else {
              this.showError("Votre demande n'est pas encore validée !");
            }
          }
        },
        (err) => {
          console.error('Error fetching demande carte:', err);
        }
      );
    });
  }
  
}
