import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { PdfGeneratorComponent } from '../pdf-generator/pdf-generator.component';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Cartes } from '../Models/Cartes';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { userservice } from '../Service/User.service';
import { IndividualConfig, ToastrService } from 'ngx-toastr';
import { CarteService } from '../Service/CarteService.service';
import { User } from '../Models/User';

@Component({
  selector: 'app-rhsousentreprise',
  standalone: true,
  imports: [CommonModule, NavbarComponent, PdfGeneratorComponent, ReactiveFormsModule],
  templateUrl: './rhsousentreprise.component.html',
  styleUrls: ['./rhsousentreprise.component.css'] // corrected from 'styleUrl' to 'styleUrls'
})
export class RhsousentrepriseComponent implements OnInit {
  inputForm!: FormGroup;
  inputFormi!: FormGroup;
  success = false;
  selectedValue: string = 'libelle';
  check!: boolean;
  isdone: boolean = false;
  nbrentreprise: number = 0;
  longue!: any;
  iduserco!: any;
  userc!: User;
  isvalidateur: boolean = true;
  initiateur: boolean = true;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userService: userservice, // corrected from 'userservice' to 'UserService'
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    console.log(this.isdone);
    this.createForm();
    this.createFormi();
    this.iduserco = localStorage.getItem('id')!;
    if (this.iduserco) {
      this.userService.getUser(this.iduserco).subscribe(user => {
        this.userc = user;
        console.log(user)
        this.userService.getAllUsers().subscribe(
          (users) => {
            const validateur = users.filter(
              (user: User) => user.idGroupeMere == localStorage.getItem('id') && user.role == "validateur"
            );
            const initiateur = users.filter(
              (user: User) => user.idGroupeMere == localStorage.getItem('id') && user.role == "initiateur"
            );
            console.log(validateur.length)
            if (validateur.length >=1) {
              this.isvalidateur = false;
            }
            console.log(initiateur.length)
            if (initiateur.length >=1) {
              this.initiateur = false;
            }
          },
          (err) => {
            console.error('Error fetching users:', err);
          }
        );
      });
    }
  }

  createForm() {
    this.inputForm = this.fb.group({
      password: ['', [Validators.required, passwordLengthValidator]],
      email: ['', [Validators.required, Validators.email]],
      tel: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
    });
  }

  createFormi() {
    this.inputFormi = this.fb.group({
      passwordi: ['', [Validators.required, passwordLengthValidator]],
      emaili: ['', [Validators.required, Validators.email]],
      teli: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
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

  onSubmit() {
    if (this.inputForm.invalid) {
      this.showError('Veuillez remplir correctement tous les champs du formulaire.');
      console.log(this.inputForm);
      return;
    }

    const uservalidateur: User = {
      libelleDeCompte: "validateur",
      password: this.inputForm.value.password,
      email: this.inputForm.value.email,
      confirmPassword: this.inputForm.value.password,
      tel: this.inputForm.value.tel,
      entrepriseName: this.userc.entrepriseName,
      numCompte: this.userc.numCompte,
      matriculeFiscale: this.userc.matriculeFiscale,
      role:"validateur",
      isAGroup: false,
      nbEntreprise: 0,
      isAccepted: true,
      idGroupeMere: localStorage.getItem('id'),
    };

    this.userService.getAllUsers().subscribe(
      (res: User[]) => {
        const existingUserEmail = res.find(u => u.email === uservalidateur.email);
        const existingUserTel = res.find(u => u.tel === uservalidateur.tel);
        const existingUserPassword = res.find(u => u.password === uservalidateur.password);

        if (existingUserEmail) {
          this.showError('L\'email existe déjà.', 'Erreur');
        } else if (existingUserTel) {
          this.showError('Le numéro GSM existe déjà.');
        } else if (existingUserPassword) {
          this.showError('Le mot de passe existe déjà.');
        } else {
          this.userService.addUser(uservalidateur).subscribe(
            () => {
              this.showSuccess('Utilisateur créé avec succès !');
              setTimeout(() => {
                this.success = true;
                this.inputForm.reset();
              }, 2000);
            },
            err => {
              this.showError('Une erreur s\'est produite lors de l\'inscription : ' + err);
            }
          );
        }
      },
      err => {
        this.showError('Une erreur s\'est produite lors de la récupération des utilisateurs : ' + err);
      }
    );
  }

  onSubmitInitiateur() { // corrected from 'onSubmitinitiateur' to 'onSubmitInitiateur'
    if (this.inputFormi.invalid) {
      this.showError('Veuillez remplir correctement tous les champs du formulaire.');
      console.log(this.inputFormi);
      return;
    }

    const userinitiateur: User = {
      libelleDeCompte: "initiateur",
      password: this.inputFormi.value.passwordi,
      email: this.inputFormi.value.emaili,
      confirmPassword: this.inputFormi.value.passwordi,
      tel: this.inputFormi.value.teli,
      entrepriseName: this.userc.entrepriseName,
      numCompte: this.userc.numCompte,
      matriculeFiscale: this.userc.matriculeFiscale,
      role: "initiateur",
      isAGroup: false,
      nbEntreprise: 0,
      isAccepted: true,
      idGroupeMere: localStorage.getItem('id'),
    };

    this.userService.getAllUsers().subscribe(
      (res: User[]) => {
        const existingUserEmail = res.find(u => u.email === userinitiateur.email);
        const existingUserTel = res.find(u => u.tel === userinitiateur.tel);
        const existingUserPassword = res.find(u => u.password === userinitiateur.password);

        if (existingUserEmail) {
          this.showError('L\'email existe déjà.', 'Erreur');
        } else if (existingUserTel) {
          this.showError('Le numéro GSM existe déjà.');
        } else if (existingUserPassword) {
          this.showError('Le mot de passe existe déjà.');
        } else {
          this.userService.addUser(userinitiateur).subscribe(
            () => {
              this.showSuccess('Utilisateur créé avec succès !');
              setTimeout(() => {
                this.success = true;
                this.inputFormi.reset();
                this.router.navigate(["home"])
              }, 2000);
            },
            err => {
              this.showError('Une erreur s\'est produite lors de l\'inscription : ' + err);
            }
          );
        }
      },
      err => {
        this.showError('Une erreur s\'est produite lors de la récupération des utilisateurs : ' + err);
      }
    );
  }

  onLibelleDeCompteChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    this.inputForm.controls['libelledecompte'].setValue(target.value);
  }
}

function passwordLengthValidator(control: AbstractControl): { [key: string]: boolean } | null {
  if (control.value && control.value.length <= 5) {
    return { 'passwordLength': true };
  }
  return null;
}
