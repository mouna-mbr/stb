import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { userservice } from '../Service/User.service'; // Assurez-vous d'importer correctement UserService
import { User } from '../Models/User';

import { ToastrService, IndividualConfig } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  inputForm!: FormGroup;
  success = false;
  selectedValue: string = 'libelle';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userService: userservice,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.inputForm = this.fb.group({
      password: ['', [Validators.required, passwordLengthValidator]],
      email: ['', [Validators.required, Validators.email]],
      confirmpassword: ['', [Validators.required, passwordLengthValidator]],
      tel: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      entreprisename: ['', Validators.required],
      numcompte: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      matriculeFiscale: ['', [Validators.required, Validators.pattern('^[0-9A-Za-z]{13}$')]],
      libelledecompte: ['']
    }, {
      validator: this.checkPasswords // Validation personnalisée pour les mots de passe
    });
  }

  checkPasswords(group: AbstractControl): { [key: string]: boolean } | null {
    const password = group.get('password')?.value;
    const confpassword = group.get('confirmpassword')?.value;
    return password === confpassword ? null : { 'notSame': true };
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

  onSubmit() {
    if (this.inputForm.invalid) {
      this.showError('Veuillez remplir correctement tous les champs du formulaire.');
      return;
    }

    const user: User = {
      libelledecompte: this.inputForm.value.libelledecompte,
      password: this.inputForm.value.password,
      email: this.inputForm.value.email,
      confirmpassword: this.inputForm.value.confirmpassword,
      tel: this.inputForm.value.tel,
      entreprisename: this.inputForm.value.entreprisename,
      numcompte: this.inputForm.value.numcompte,
      matriculeFiscale: this.inputForm.value.matriculeFiscale
    };

    this.userService.getAllUsers().subscribe(
      (res: User[]) => {
        const existingUserEmail = res.find(u => u.email === user.email);
        const existingUserName = res.find(u => u.entreprisename === user.entreprisename);
        const existingUserTel = res.find(u => u.tel === user.tel);
        const existingUserPassword = res.find(u => u.password === user.password);
        const existingUserNumcompte = res.find(u => u.numcompte === user.numcompte);
        const existingUserMatriculeFiscale = res.find(u => u.matriculeFiscale === user.matriculeFiscale);

        if (existingUserEmail) {
          this.showError('L\'email existe déjà.', 'Erreur', {
           // iconClass: 'fas fa-exclamation-circle' // Ajoutez l'icône ici si nécessaire
          });
        } else if (existingUserName) {
          this.showError('Le nom de l\'entreprise existe déjà.');
        } else if (existingUserTel) {
          this.showError('Le numéro GSM existe déjà.');
        } else if (existingUserPassword) {
          this.showError('Le mot de passe existe déjà.');
        } else if (existingUserNumcompte) {
          this.showError('Le numéro de compte existe déjà.');
        } else if (existingUserMatriculeFiscale) {
          this.showError('Le matricule fiscale existe déjà.');
        } else {
          this.userService.addUser(user).subscribe(
            () => {
              this.showSuccess('Utilisateur créé avec succès !');
              setTimeout(() => {
                this.success = true;
                this.inputForm.reset();
                this.router.navigate(['login']);
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
    this.selectedValue = target.value;
  }
}

function passwordLengthValidator(control: AbstractControl): { [key: string]: boolean } | null {
  if (control.value && control.value.length <= 5) {
    return { 'passwordLength': true };
  }
  return null;
}
