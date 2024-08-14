import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { User } from '../Models/User';
import { PdfGeneratorComponent } from '../pdf-generator/pdf-generator.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IndividualConfig, ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { DemandecartesService } from '../Service/DemandecartesService.service'; // Renommé pour suivre la convention de nommage
import { Demandecarteswithoutid } from '../Models/Demandecartes';
import { userservice } from '../Service/User.service'; // Renommé pour suivre la convention de nommage

@Component({
  selector: 'app-demandedecarte',
  templateUrl: './demandedecarte.component.html',
  styleUrls: ['./demandedecarte.component.css'],
  standalone: true,
  imports: [CommonModule, NavbarComponent, PdfGeneratorComponent, ReactiveFormsModule]
})
export class DemandedecarteComponent implements OnInit {
  userc: User | undefined;
  iduserco: any | null = localStorage.getItem('id');
  inputForm!: FormGroup;
  groupUsers: User[] = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private userService: userservice, // Renommé pour suivre la convention de nommage
    private demandecarteService: DemandecartesService // Renommé pour suivre la convention de nommage
  ) {}

  ngOnInit(): void {
    this.createForm();
    
    if (this.iduserco) {
      this.userService.getUser(this.iduserco).subscribe(
        user => {
          this.userc = user;
          if (user.isAGroup) {
            this.userService.getAllUsers().subscribe(
              users => {
                this.groupUsers = users.filter((u:User) => u.idroupemere === u.idUser);
              },
              err => {
                console.error('Error fetching users:', err);
              }
            );
          }
        },
        err => {
          console.error('Error fetching user:', err);
        }
      );
    }
  }

  createForm() {
    this.inputForm = this.fb.group({
      nombredescarte: ['', Validators.required],
      cgu: [false, Validators.requiredTrue], // Assurez-vous que c'est un boolean pour le checkbox
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

  onSubmitE() {
    if (this.inputForm.invalid) {
      this.showError('Veuillez remplir correctement tous les champs du formulaire.');
      return;
    }

    const demandeCarte: Demandecarteswithoutid = {
      nombredescarte: this.inputForm.value.nombredescarte,
      idUser: this.iduserco!, // Assurez-vous que l'ID de l'utilisateur est un string
      commentaire: this.inputForm.value.commentaire,
      validationI: false,
      validationF: false,
      statut: "En Attente",
      time: new Date()
    };

    this.demandecarteService.addDemandeCarte(demandeCarte).subscribe(
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
  }
}
