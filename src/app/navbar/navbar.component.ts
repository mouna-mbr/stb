import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CommonModule } from '@angular/common';

import { DemandecartesService } from '../Service/DemandecartesService.service';
import { Demandecartes } from '../Models/Demandecartes';
import { userservice } from '../Service/User.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'], // Use "styleUrls" instead of "styleUrl"
  standalone: true,
  imports: [CommonModule], // Do not import the component itself in its own imports array
})
export class NavbarComponent implements OnInit {
  count!: number;
  isconnected: boolean = false;
  rhadmine: boolean = false;
  rh: boolean = false;
  admine: boolean = false;
  validateur: boolean = false;
  initiateur: boolean = false;

  constructor(
    private fb: FormBuilder,
    private route: Router,
    private actRoute: ActivatedRoute,
    private demandeservice: DemandecartesService,
    private userservice: userservice, // Capitalized the service class name to match Angular conventions
  ) {}

  ngOnInit(): void {
    this.getCountOfDemandesWithValidationIFalse().subscribe(
      count => this.count = count,
      error => console.error('Error fetching count:', error)
    );

    this.isconnected = localStorage.getItem('id') !== null;

    const role = localStorage.getItem('role');
    const userId = localStorage.getItem('id');
    console.log(role)
    console.log(role === 'RH' && userId)
    if (role === 'RH') {
      this.userservice.getUser(userId).subscribe(
        user => {
          if (user.isAGroup) {
            console.log(user.isAGroup)
            this.rhadmine = true;
            console.log("rh admine")
          } else {
            this.rh = true;
            console.log(user.isAGroup)

            console.log("rh ")

          }
        },
        error => console.error('Error fetching user:', error)
      );
    } else if (role === 'admine') {
      this.admine = true;
    } else if (role === 'validateur') {
      this.validateur = true;
    } else if (role === 'initiateur') {
      this.initiateur = true;
    }

 

  }

  logout() {
    localStorage.removeItem('id');
    localStorage.removeItem('role');

    this.route.navigate(['login']);
  }

  notif() {
    this.route.navigate(['listedesdemandes']);
  }

  getCountOfDemandesWithValidationIFalse(): Observable<number> {
    return this.demandeservice.getAllDemandeCarte().pipe(
      map(demandes => demandes.filter((demande: Demandecartes) => !demande.validationI).length)
    );
  }

  register() {
    this.route.navigate(['register']);
  }
}
