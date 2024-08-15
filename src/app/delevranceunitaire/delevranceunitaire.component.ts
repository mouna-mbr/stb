import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { PdfGeneratorComponent } from '../pdf-generator/pdf-generator.component';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IndividualConfig, ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { userservice } from '../Service/User.service';
import { Cartes } from '../Models/Cartes';
import { CarteService } from '../Service/CarteService.service';

@Component({
  selector: 'app-delevranceunitaire',
  standalone: true,
  imports: [CommonModule, NavbarComponent, PdfGeneratorComponent, ReactiveFormsModule],
  templateUrl: './delevranceunitaire.component.html',
  styleUrls: ['./delevranceunitaire.component.css']
})
export class DelevranceunitaireComponent implements OnInit {
  userc: any;
  iduserco : any;
  inputForm!: FormGroup;
  existingCodes: { codepins: number[], codecarts: number[], numerocartes: number[] } = { codepins: [], codecarts: [], numerocartes: [] };

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private userService: userservice,
    private actRoute: ActivatedRoute,
    private carteservice: CarteService
  ) {}

  ngOnInit(): void {
    this.inputForm = this.fb.group({
      gsm: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(8), Validators.pattern('^[0-9]{8}$')]],
      cin: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(8)]],
      nomprenom: ['', Validators.required],
      email: ['', [Validators.email]], // Ajoute la validation d'email
      datedenaissance: ['', [Validators.required, this.ageValidator(18)]]
    });

    this.iduserco = localStorage.getItem('id')!;
    if (this.iduserco) {
      this.userService.getUser(this.iduserco).subscribe(user => {
        this.userc = user;
      });
    }

    // Fetch all existing codes
    this.carteservice.getAllCartes().subscribe((cartes: Cartes[]) => {
      this.existingCodes.codepins = cartes.map(carte => carte.codePin);
      this.existingCodes.codecarts = cartes.map(carte => carte.codeCarte);
      this.existingCodes.numerocartes = cartes.map(carte => carte.numeroDuCarte);
    });
  }

  generateUniqueCode(min: number, max: number, existingCodes: number[]): number {
    let code;
    do {
      code = Math.floor(min + Math.random() * (max - min));
    } while (existingCodes.includes(code));
    return code;
  }

  onSubmitE() {
    if (this.inputForm.invalid) {
      this.showError('Veuillez remplir correctement tous les champs du formulaire.');
      return;
    }

    // Generate unique codes
    const codepin = this.generateUniqueCode(100, 999, this.existingCodes.codepins);
    const codecarte = this.generateUniqueCode(1000, 9999, this.existingCodes.codecarts);
    const numeroducarte = this.generateUniqueCode(1000000000000000, 9999999999999999, this.existingCodes.numerocartes);

    // Calculate the date of validation as the current date plus 4 years
    const currentDate = new Date();
    const datedevalidation = new Date(currentDate.setFullYear(currentDate.getFullYear() + 4));

    this.actRoute.params.subscribe((param) => {
      const idDemande = param['id'];

      const Carte: Cartes = {
        cin: this.inputForm.value.cin,
        idUser: this.iduserco,
        gsm: this.inputForm.value.gsm,
        email: this.inputForm.value.email,
        dateDeNaissance: this.inputForm.value.datedenaissance,
        nomPrenom: this.inputForm.value.nomprenom,
        dateDeValidation: datedevalidation,
        codePin: codepin,
        codeCarte: codecarte,
        numeroDuCarte: numeroducarte,
        delevranceF: false,
        delevranceI: true,
        time: new Date(),
        statut: "En Attente",
        idDemande: idDemande
      };

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
