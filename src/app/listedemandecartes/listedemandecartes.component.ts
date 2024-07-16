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
        console.log(this.listDemandeCartes);
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
