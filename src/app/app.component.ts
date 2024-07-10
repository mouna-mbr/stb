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

  title = 'STB';
  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private userService: userservice
  ) {}
}
