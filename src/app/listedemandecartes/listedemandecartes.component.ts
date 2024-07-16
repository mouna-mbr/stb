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
        this.listDemandeCartes = res;
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
       // console.log(this.listDemandeCartes);
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
  
  getDemande(idDemande:any){
    this.demandeService.getDemandeCarte(idDemande).subscribe(
      res=>{
        if(res.idUser==null){

        }else{
          this.router.navigate(['validationi',idDemande]);
        }
      }
    )
  
    
  }
}
