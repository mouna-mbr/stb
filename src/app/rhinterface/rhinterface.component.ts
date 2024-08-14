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
  selector: 'app-rhinterface',
  standalone: true,
  imports: [CommonModule, NavbarComponent, PdfGeneratorComponent, ReactiveFormsModule],
  templateUrl: './rhinterface.component.html',
  styleUrls: ['./rhinterface.component.css'] // corrected from 'styleUrl' to 'styleUrls'
})
export class RhinterfaceComponent implements OnInit {
  inputForm!: FormGroup;
  success = false;
  selectedValue: string = 'libelle';
  check!: boolean;
  isdone: boolean=false;
  nbrentreprise: number = 0;
  longue!:any;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userService: userservice, // corrected from 'userservice' to 'UserService'
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    console.log(this.isdone)
    this.createForm();
    this.userService.getAllUsers().subscribe(
      (users) => {
        const allUsersSameGroup = users.filter((user: User) => user.idroupemere == localStorage.getItem('id'));
        this.userService.getUser(localStorage.getItem('id')).subscribe(
          (user) => {
            this.nbrentreprise = user.nbentreprise;
            console.log(this.nbrentreprise)
            console.log(allUsersSameGroup.length)
            this.longue=allUsersSameGroup.length
            if (allUsersSameGroup.length === user.nbentreprise) {
              this.isdone = true;
            }
            console.log(this.isdone)

          }
        );
      },
      (err) => {
        console.error('Error fetching users:', err);
      }
    );
  }

  createForm() {
    this.inputForm = this.fb.group({
      password: ['', [Validators.required, passwordLengthValidator]],
      email: ['', [Validators.required, Validators.email]],
      entreprisename: ['', Validators.required],
      numcompte: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      matriculeFiscale: ['', [Validators.required, Validators.pattern('^[0-9A-Za-z]{13}$')]],
      tel: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
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

    const user: User = {
      libelledecompte: "RH",
      password: this.inputForm.value.password,
      email: this.inputForm.value.email,
      confirmpassword: this.inputForm.value.password,
      tel: this.inputForm.value.tel,
      entreprisename: this.inputForm.value.entreprisename,
      numcompte: this.inputForm.value.numcompte,
      matriculeFiscale: this.inputForm.value.matriculeFiscale,
      role: "RH",
      isAGroup: false,
      nbentreprise: 0,
      isAccepted: true,
      idroupemere: localStorage.getItem('id'),
    };

    this.userService.getAllUsers().subscribe(
      (res: User[]) => {
        const existingUserEmail = res.find(u => u.email === user.email);
        const existingUserName = res.find(u => u.entreprisename === user.entreprisename);
        const existingUserTel = res.find(u => u.tel === user.tel);
        const existingUserPassword = res.find(u => u.password === user.password);

        if (existingUserEmail) {
          this.showError('L\'email existe déjà.', 'Erreur');
        } else if (existingUserName) {
          this.showError('Le nom de l\'entreprise existe déjà.');
        } else if (existingUserTel) {
          this.showError('Le numéro GSM existe déjà.');
        } else if (existingUserPassword) {
          this.showError('Le mot de passe existe déjà.');
        } else if (this.isdone) {
          this.showError('Le nombre maximal d\'entreprises a été atteint.');
        } else {
          this.userService.addUser(user).subscribe(
            () => {
              this.showSuccess('Utilisateur créé avec succès !');
              setTimeout(() => {
                this.success = true;
                if(this.longue===this.nbrentreprise-1){
                  this.router.navigate(['home']);
                }else{
                 this.inputForm.reset();

                }

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
