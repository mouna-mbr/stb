import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { userservice } from '../app/Service/User.service';
import { User } from '../app/Models/User';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  inputForm!: FormGroup;
  success: boolean = false;
  error: boolean = false;

  title = 'tableau';
  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private userService: userservice
  ) {}
  
  createForm() {
    this.inputForm = this.fb.group({
      adressLocation: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      confirmpassword: ['', Validators.required],
      tel: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      username: ['', Validators.required],
      sexe: ['']
    });
  }

  onSubmit() {
    console.log(this.inputForm.value);
    let user = new User();
    user.adressLocation = this.inputForm.value.adressLocation;
    user.password = this.inputForm.value.password;
    user.email = this.inputForm.value.email;
    user.confirmpassword = this.inputForm.value.confirmpassword;
    user.tel = this.inputForm.value.tel;
    user.username = this.inputForm.value.username;
    user.sexe = this.inputForm.value.sexe;

    console.log(user);
    this.http.post<any>("http://localhost:8089/SpringMVC/user/add", user)
      .subscribe(
        res => {
          /*this.success = true;
          setTimeout(() => {
            this.success = false;
          }, 2000);*/
          this.inputForm.reset();
          localStorage.setItem("id", JSON.stringify(res.idEtudiant));
          //this.router.navigate(['profil', res.idEtudiant]);
        },
       /* err => {
          this.error = true;
          setTimeout(() => {
            this.error = false;
          }, 2000);
        }*/
      );
  }
}
