import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { User } from '../Models/User';
import { userservice } from '../Service/User.service';

@Component({
  selector: 'app-demandedecarte',
  templateUrl: './demandedecarte.component.html',
  styleUrls: ['./demandedecarte.component.css'],
  standalone: true,
  imports: [CommonModule, NavbarComponent]

})
export class DemandedecarteComponent implements OnInit {
  userc: any;
  iduser=localStorage.getItem('id')!;


  constructor(private userService: userservice) {}

  ngOnInit(): void {
    console.log(this.iduser);
    this.iduser = localStorage.getItem('id')!;
    if (this.iduser) {
      this.userService.getUser(this.iduser).subscribe(user => {
        this.userc = user;
        console.log(this.userc.entreprisename);
        console.log(this.userc.libelledecompte);


      });
    }
  }
}
