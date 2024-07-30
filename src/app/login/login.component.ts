import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { userservice } from '../Service/User.service';
import { ToastrService, IndividualConfig } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  inputform!: FormGroup;

  constructor(
    private fb: FormBuilder, 
    private http: HttpClient,
    private router: Router,
    private userService: userservice,
    private toastr: ToastrService
  ){}

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

  ngOnInit(): void {
    this.inputform = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      rememberMe: [false]
    });

    this.checkRememberedUser();
  }

  checkRememberedUser() {
    const rememberedEmail = localStorage.getItem('rememberedEmail');
    if (rememberedEmail) {
      this.inputform.patchValue({
        email: rememberedEmail,
        rememberMe: true
      });
    }
  }

  onsubmit() {
    this.userService.getAllUsers().subscribe(res => {
      if (!res || res.length === 0) {
        this.showError("User not found!!");
        return;
      }
  
      const user = res.find((a: any) => {
        return a.email === this.inputform.value.email && a.password === this.inputform.value.password;
      });
  
      if (!user) {
        this.showError("User not found!!");
        return;
      }
  
      if (user.isaccepted === false) {
        this.showError("User not Accepted!!");
      } else {
        if (this.inputform.value.rememberMe) {
          localStorage.setItem('rememberedEmail', this.inputform.value.email);
        } else {
          localStorage.removeItem('rememberedEmail');
        }
  
        localStorage.setItem('id', user.idUser);
        this.router.navigate(['home']);
        this.showSuccess("Vous êtes connecté.");
      }
    }, error => {
      console.error('Error fetching users:', error);
      this.showError("An error occurred while fetching users.");
    });
  }
  
}
