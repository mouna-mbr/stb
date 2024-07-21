import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { PdfGeneratorComponent } from '../pdf-generator/pdf-generator.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Cartes } from '../Models/Cartes';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { userservice } from '../Service/User.service';
import { ToastrService } from 'ngx-toastr';
import { CarteService } from '../Service/CarteService.service';

@Component({
  selector: 'app-listedelevranceunitairei',
  standalone: true,
  imports: [CommonModule, NavbarComponent, PdfGeneratorComponent, ReactiveFormsModule],
  templateUrl: './listedelevranceunitairei.component.html',
  styleUrl: './listedelevranceunitairei.component.css'
})
export class ListedelevranceunitaireiComponent  implements OnInit {
  listCartes: Cartes[] = [];

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
    this.cartes.getAllCarte().subscribe(
      (res) => {
        this.listCartes = res.filter((carte: Cartes) => 
          carte.delevranceF === false 
        
        );

        // Charger les utilisateurs pour chaque demande
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
        console.error('Error fetching demande cartes:', err);
      }
    );
  }
 
  loadDemandeCartestoday(): void {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Remettre à zéro les heures, minutes, secondes et millisecondes pour comparer la date uniquement

    this.cartes.getAllCarte().subscribe(
      (res) => {
        this.listCartes = res.filter((carte: Cartes) => {
          const carteDate = new Date(carte.time);
          carteDate.setHours(0, 0, 0, 0); // Remettre à zéro les heures, minutes, secondes et millisecondes pour comparer la date uniquement
          return carte.delevranceF === false &&
                 carteDate.getTime() === today.getTime();
        });

        // Charger les utilisateurs pour chaque demande
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
        console.error('Error fetching demande cartes:', err);
      }
    );
  }

  
  loadDemandeCarteslastday(): void {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1); // Récupère la date d'hier
    yesterday.setHours(0, 0, 0, 0); // Remettre à zéro les heures, minutes, secondes et millisecondes pour comparer la date uniquement

    this.cartes.getAllCarte().subscribe(
      (res) => {
        this.listCartes = res.filter((carte: Cartes) => {
          const carteDate = new Date(carte.time);
          carteDate.setHours(0, 0, 0, 0); // Remettre à zéro les heures, minutes, secondes et millisecondes pour comparer la date uniquement
          return carte.delevranceF === false &&carteDate.getTime() === yesterday.getTime();
        });

        // Charger les utilisateurs pour chaque demande
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
        console.error('Error fetching demande cartes:', err);
      }
    );
  }

    
  loadDemandeCartesthisweek(): void {
    const today = new Date();
    const startOfWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - today.getDay()); // Détermine le début de la semaine
    startOfWeek.setHours(0, 0, 0, 0); // Remettre à zéro les heures, minutes, secondes et millisecondes pour comparer la date uniquement

    this.cartes.getAllCarte().subscribe(
      (res) => {
        this.listCartes = res.filter((carte: Cartes) => {
          const demandeDate = new Date(carte.time);
          demandeDate.setHours(0, 0, 0, 0); // Remettre à zéro les heures, minutes, secondes et millisecondes pour comparer la date uniquement
          return carte.delevranceF === false && demandeDate >= startOfWeek && demandeDate <= today;
        });

        // Charger les utilisateurs pour chaque demande
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
        console.error('Error fetching demande cartes:', err);
      }
    );
  }
  
  getCarte(idCarte:any){
    this.cartes.getCarte(idCarte).subscribe(
      res=>{
        if(res.idUser==null){

        }else{
          this.router.navigate(['validationi',idCarte]);
        }
      }
    )
  
    
  }
}
