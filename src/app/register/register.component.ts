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
      adressLocation: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      confirmpassword: ['', Validators.required],
      tel: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      username: ['', Validators.required],
      sexe: [''],
      dateDeNaissance: [''] // Assurez-vous que ce champ est également pris en compte dans le formulaire
    });
  }

  onSubmit() {
    if (this.inputForm.invalid) {
      return;
    }
    const user: User = {
      adressLocation: this.inputForm.value.adressLocation,
      password: this.inputForm.value.password,
      email: this.inputForm.value.email,
      confirmpassword: this.inputForm.value.confirmpassword,
      tel: this.inputForm.value.tel,
      username: this.inputForm.value.username,
      sexe: this.inputForm.value.sexe,
      dateDeNaissance: this.inputForm.value.dateDeNaissance
    };

    this.userService.addUser(user).subscribe(
      res => {
        alert("Inscription réussie !");
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
