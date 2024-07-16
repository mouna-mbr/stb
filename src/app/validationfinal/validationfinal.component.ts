import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { PdfGeneratorComponent } from '../pdf-generator/pdf-generator.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Demandecartes } from '../Models/Demandecartes';
import { ActivatedRoute, Router } from '@angular/router';
import { IndividualConfig, ToastrService } from 'ngx-toastr';
import { DemandecartesService } from '../Service/DemandecartesService.service';
import { userservice } from '../Service/User.service';

@Component({
  selector: 'app-validationfinal',
  standalone: true,
  imports: [CommonModule, NavbarComponent, PdfGeneratorComponent, ReactiveFormsModule],
  templateUrl: './validationfinal.component.html',
  styleUrl: './validationfinal.component.css'
})
export class ValidationfinalComponent implements OnInit {
  userc: any;
  iduserco:any;
  inputForm!: FormGroup;
  iddemande: any;
  ledemande!: Demandecartes;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private userService: userservice,
    private actRoute: ActivatedRoute,
    private demandecarteService: DemandecartesService // Renommé pour suivre la convention de nommage
  ) {}

  createForm() {
    this.inputForm = this.fb.group({
      nombredescarte: ['', Validators.required],
      cgu: ['', Validators.required],
      commentaire: ['']
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

  ngOnInit(): void {
    this.createForm();
 
    this.actRoute.params.subscribe(
      (param) => {
        this.iddemande = param['id'];
        //console.log(this.iddemande);
        this.demandecarteService.getDemandeCarte(this.iddemande).subscribe(
          (demande) => {
            this.ledemande = demande;
            this.iduserco = this.ledemande.idUser;
           // console.log(this.iduserco)
            if (this.iduserco) {
              this.userService.getUser(this.iduserco).subscribe(
                (user) => {
                  this.userc = user;
                 // console.log(this.userc.entreprisename);
                 // console.log(this.userc.libelledecompte);
                },
                (err) => {
                  console.error(err);
                }
              );
            }
          },
          (err) => {
            this.showError('Erreur lors de la récupération de la demande.');
          }
        );
      }
    );
  }

 
  onAccept(): void {

    this.demandecarteService.getDemandeCarte(this.iddemande).subscribe(demande => {
      demande.statut = 'Acceptée Dans La Validation Final '; 
      demande.validationF = true;
      console.log(demande);


      this.demandecarteService.editDemandeCarte(this.iddemande, demande).subscribe(() => {
        this.router.navigate(["listedesdemandes"]);
        console.log(demande);
      });
    });
  }
  onRefus(): void {
    this.demandecarteService.getDemandeCarte(this.iddemande).subscribe(demande => {
      demande.statut = 'Refusée dans la validation Final'; 
      demande.validationF = true;
      console.log(demande);

      this.demandecarteService.editDemandeCarte(this.iddemande, demande).subscribe(() => {
        this.router.navigate(["listedesdemandes"]);
        console.log(demande);
      });
    });
  }
}
