import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { userservice } from '../Service/User.service';
import { ToastrService, IndividualConfig } from 'ngx-toastr';
import { User } from '../Models/User';

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
  ) {}

  showSuccess(message: string) {
    const toastrOptions: Partial<IndividualConfig> = {
      timeOut: 2000, // Duration in milliseconds (2 seconds)
      toastClass: 'toast-custom toast-success' // Custom classes for success
    };
    this.toastr.success(message, 'Succès', toastrOptions);
  }

  showError(message: string, title: string = 'Erreur', options?: Partial<IndividualConfig>) {
    const toastrOptions: Partial<IndividualConfig> = {
      timeOut: 2000, // Duration in milliseconds (2 seconds)
      toastClass: 'toast-custom'
      // iconClass: 'fas fa-exclamation-circle' // Add icon here if necessary
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

  onSubmit() {
    this.userService.getAllUsers().subscribe(res => {
      if (!res || res.length === 0) {
        this.showError("Utilisateur non trouvé !!");
        return;
      }

      const user = res.find((a: User) => 
        a.email === this.inputform.value.email && a.password === this.inputform.value.password 
    );


      if (!user) {
        this.showError("Utilisateur non trouvé !!");
        return;
      } else if (user && !user.isAccepted) {
        this.showError("Utilisateur non accepté !!");
        
        console.log(user.isAccepted);
        return;
      }

      if (this.inputform.value.rememberMe) {
        localStorage.setItem('rememberedEmail', this.inputform.value.email);
      } else {
        localStorage.removeItem('rememberedEmail');
      }

      localStorage.setItem('id', user.idUser);
      localStorage.setItem('role', user.role);

      if (user.role === "admine") {
        this.router.navigate(['dashboard']);
      } else {
        this.router.navigate(['home']);
      }
      this.showSuccess("Vous êtes connecté.");
    }, error => {
      console.error('Erreur lors de la récupération des utilisateurs :', error);
      this.showError("Une erreur s'est produite lors de la récupération des utilisateurs.");
    });
  }
}
