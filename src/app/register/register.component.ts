import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { userservice } from '../Service/User.service'; // Assurez-vous d'importer correctement UserService
import { User } from '../Models/User';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  inputForm!: FormGroup;
  success = false;
  error = false;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private userService: userservice // Assurez-vous que l'injection de UserService est correcte
  ) {}

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.inputForm = this.fb.group({
      password: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      confirmpassword: ['', Validators.required],
      tel: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      entreprisename: ['', Validators.required],
      numcompte: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      matriculeFiscale:['', [Validators.required, Validators.pattern('^[0-9]*$')]], 
      libelledecompte:['']// Assurez-vous que ce champ est également pris en compte dans le formulaire
    });
  }

  onSubmit() {
    if (this.inputForm.invalid) {
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

    this.userService.addUser(user).subscribe(
      res => {
        alert("Inscription réussie !");
        setTimeout(() => {
          this.success = true;
          
        }, 2000);
        this.inputForm.reset();
        // Redirection vers la page de connexion
        this.router.navigate(['login']);
      },
      err => {
        alert("Une erreur s'est produite lors de l'inscription : " + err);
      }
    );
  }
}
