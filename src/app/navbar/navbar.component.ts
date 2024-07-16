import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { DemandecartesService } from '../Service/DemandecartesService.service';
import { map } from 'rxjs/operators';
import { Demandecartes } from '../Models/Demandecartes';



@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
  standalone: true,
  imports: [NavbarComponent]

})
export class NavbarComponent implements OnInit {
  count!: number;

  ngOnInit(): void {
    this.getCountOfDemandesWithValidationIFalse().subscribe(
      count => this.count = count,
      error => console.error('Error fetching count:', error)
    );
  

  }
  constructor(private fb: FormBuilder,private route:Router , private actRoute:ActivatedRoute,private demandeservice: DemandecartesService){}
  logout() {
    localStorage.removeItem('id');
    this.route.navigate(["login"]);
  }
  notif() {
    this.route.navigate(["listedesdemandes"]);
  }
  getCountOfDemandesWithValidationIFalse(): Observable<number> {
    return this.demandeservice.getAllDemandeCarte().pipe(
      map(demandes => demandes.filter((demande: Demandecartes) => !demande.validationI).length)
    );
  }
}  


