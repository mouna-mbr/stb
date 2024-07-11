import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { PdfGeneratorComponent } from '../pdf-generator/pdf-generator.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IndividualConfig, ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { userservice } from '../Service/User.service';
import { DemandecartesService } from '../Service/DemandecartesService.service';

@Component({
  selector: 'app-validationinitial',
  standalone: true,
  imports: [CommonModule, NavbarComponent, PdfGeneratorComponent,ReactiveFormsModule],
  templateUrl: './validationinitial.component.html',
  styleUrl: './validationinitial.component.css'
})
export class ValidationinitialComponent {
  userc: any;
  iduserco = localStorage.getItem('id')!;
  inputForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private userService:userservice,
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
    console.log(this.iduserco);

    this.createForm();
    this.iduserco = localStorage.getItem('id')!;
    if (this.iduserco) {
      this.userService.getUser(this.iduserco).subscribe(user => {
        this.userc = user;
        console.log(this.userc.entreprisename);
        console.log(this.userc.libelledecompte);


      });
    }
  }
  onaccept():void{
    
  }

}
