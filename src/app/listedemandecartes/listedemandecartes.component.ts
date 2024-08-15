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
  selector: 'app-listedemandecartes',
  standalone: true,
  imports: [CommonModule, NavbarComponent, PdfGeneratorComponent, ReactiveFormsModule],
  templateUrl: './listedemandecartes.component.html',
  styleUrls: ['./listedemandecartes.component.css']
})
export class ListedemandecartesComponent implements OnInit {
  listDemandeCartes: Demandecartes[] = [];

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
        this.listDemandeCartes = res.filter((demande: Demandecartes) => demande.validationI === false);
        console.log(this.listDemandeCartes)
        // Load users for each demande
        this.listDemandeCartes.forEach(demande => {
          this.userService.getUser(demande.idUser).subscribe(
            (user) => {
              console.log(user)
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
 
  loadDemandeCartesToday(): void {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    this.demandeService.getAllDemandeCarte().subscribe(
      (res) => {
        this.listDemandeCartes = res.filter((demande: Demandecartes) => {
          const demandeDate = new Date(demande.time);
          demandeDate.setHours(0, 0, 0, 0);
          return demande.validationI === false && demandeDate.getTime() === today.getTime();
        });

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

  loadDemandeCartesLastDay(): void {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    yesterday.setHours(0, 0, 0, 0);

    this.demandeService.getAllDemandeCarte().subscribe(
      (res) => {
        this.listDemandeCartes = res.filter((demande: Demandecartes) => {
          const demandeDate = new Date(demande.time);
          demandeDate.setHours(0, 0, 0, 0);
          return demande.validationI === false && demandeDate.getTime() === yesterday.getTime();
        });

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

  loadDemandeCartesThisWeek(): void {
    const today = new Date();
    const startOfWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - today.getDay());
    startOfWeek.setHours(0, 0, 0, 0);

    this.demandeService.getAllDemandeCarte().subscribe(
      (res) => {
        this.listDemandeCartes = res.filter((demande: Demandecartes) => {
          const demandeDate = new Date(demande.time);
          demandeDate.setHours(0, 0, 0, 0);
          return demande.validationI === false && demandeDate >= startOfWeek && demandeDate <= today;
        });

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

  getDemande(idDemande: any): void {
    this.demandeService.getDemandeCarte(idDemande).subscribe(
      (res) => {
        if (res.idUser == null) {
          // Handle case where idUser is null
        } else {
          this.router.navigate(['validationi', idDemande]);
        }
      },
      (err) => {
        console.error('Error fetching demande carte:', err);
      }
    );
  }
}
