import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { User } from '../Models/User';
import { PdfGeneratorComponent } from '../pdf-generator/pdf-generator.component';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IndividualConfig, ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { DemandecartesService } from '../Service/DemandecartesService.service'; // Renommé pour suivre la convention de nommage
import {  Demandecarteswithoutid } from '../Models/Demandecartes';
import { userservice } from '../Service/User.service';
import { Cartes } from '../Models/Cartes';
import { CarteService } from '../Service/CarteService.service';

@Component({
  selector: 'app-delevranceunitaire',
  standalone: true,
  imports: [CommonModule, NavbarComponent, PdfGeneratorComponent,ReactiveFormsModule],
  templateUrl: './delevranceunitaire.component.html',
  styleUrl: './delevranceunitaire.component.css'
})
export class DelevranceunitaireComponent implements OnInit {
  userc: any;
  iduserco = localStorage.getItem('id')!;
  inputForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private userService:userservice,
    private actRoute: ActivatedRoute,
    private carteservice: CarteService // Renommé pour suivre la convention de nommage
  ) {}

  ngOnInit(): void {
    this.inputForm = this.fb.group({
      gsm: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(8), Validators.pattern('^[0-9]{8}$')]],
      cin: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(8)]],
      nomprenom: ['', Validators.required],
      email: ['', [Validators.email]],  // Ajoute la validation d'email
      datedenaissance: ['', [Validators.required, this.ageValidator(18)]]
    });
    this.iduserco = localStorage.getItem('id')!;
    if (this.iduserco) {
      this.userService.getUser(this.iduserco).subscribe(user => {
        this.userc = user;
      //  console.log(this.userc.entreprisename);
       // console.log(this.userc.libelledecompte);


      });
    }
  }
  onSubmitE() {
    if (this.inputForm.invalid) {
      this.showError('Veuillez remplir correctement tous les champs du formulaire.');
      return;
    }
  
    // Générer un code de 3 chiffres unique et aléatoire pour codepin, qui ne soit pas 000
    let codepin;
    do {
      codepin = Math.floor(100 + Math.random() * 900); // Génère un nombre entre 100 et 999
    } while (codepin === 0); // Utilisez la syntaxe correcte
  
    // Générer un code de 4 chiffres unique et aléatoire pour codecarte, qui ne soit pas 0000
    let codecarte;
    do {
      codecarte = Math.floor(1000 + Math.random() * 9000); // Génère un nombre entre 1000 et 9999
    } while (codecarte === 0); // Utilisez la syntaxe correcte
  
    // Générer un numéro de carte de 12 chiffres unique et aléatoire pour numeroducarte, qui ne soit pas 000000000000
    let numeroducarte;
    do {
      numeroducarte = Math.floor(100000000000 + Math.random() * 900000000000); // Génère un nombre entre 100000000000 et 999999999999
    } while (numeroducarte === 0); // Utilisez la syntaxe correcte
  
    // Calculer la date de validation comme la date actuelle plus 4 ans
    const currentDate = new Date();
    const datedevalidation = new Date(currentDate.setFullYear(currentDate.getFullYear() + 4));
  
    this.actRoute.params.subscribe((param) => {
      const idDemande = param['id'];
  
      const Carte: Cartes = {
        cin: this.inputForm.value.cin,
        idUser: this.iduserco, // Assurez-vous que l'ID de l'utilisateur est un nombre
        gsm: this.inputForm.value.gsm,
        email: this.inputForm.value.email,
        datedenaissance: this.inputForm.value.datedenaissance,
        nomprenom: this.inputForm.value.nomprenom,
        datedevalidation: datedevalidation,
        codepin: codepin,
        codecarte: codecarte,
        numeroducarte: numeroducarte,
        delevranceF: false,
        delevranceI: true,
        time: new Date(),
        statut: "En Attente",
        idDemande: idDemande
      };
  
      console.log(codepin);
      console.log(codecarte + " code carte de 4");
      console.log(numeroducarte);
  
      this.carteservice.addCarte(Carte).subscribe(
        () => {
          this.showSuccess('Demande ajoutée avec succès !');
          setTimeout(() => {
            this.inputForm.reset();
          }, 2000);
          this.router.navigate(['home']);
        },
        err => {
          this.showError('Une erreur s\'est produite lors de la demande.');
        }
      );
    });
  }
  
  
  ageValidator(minAge: number) {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      if (control.value) {
        const birthDate = new Date(control.value);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
          age--;
        }
        if (age < minAge) {
          return { 'ageInvalid': true };
        }
      }
      return null;
    };
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



}
