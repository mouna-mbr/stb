import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import * as Chartist from 'chartist';
import { BarChart, LineChart } from 'chartist';
import { NavbarComponent } from '../navbar/navbar.component';
import { PdfGeneratorComponent } from '../pdf-generator/pdf-generator.component';
import { ReactiveFormsModule } from '@angular/forms';
import { userservice } from '../Service/User.service';
import { User } from '../Models/User';
import { CarteService } from '../Service/CarteService.service';
import { Cartes } from '../Models/Cartes';

@Component({
  selector: 'app-adminehome',
  templateUrl: './adminehome.component.html',
  styleUrls: ['./adminehome.component.css'],
  imports: [CommonModule, NavbarComponent, PdfGeneratorComponent, ReactiveFormsModule],
  standalone: true,

})
export class AdminehomeComponent implements OnInit {

  userCount: number = 0;
  carteCount: number = 0;
  Acceptuser: number = 0;
  groupUserPercentage: number = 0;
  carteenattentePercentage: number = 0;
  userattentePercentage: number = 0;
  listUsersNotAccepted: User[] = [];
  user!:User;

  constructor(private userService: userservice,private  carteservice :CarteService) {}

  ngOnInit(): void {
    this.loadUserCount();
    this.loadUserStats();

    this.loadCartCount();
    this.loadCrateStats();

    this.loadUsernotAccepted();
    this.loaduserattentePercentage();

  }

  loadUserCount(): void {
    this.userService.getAllUsers().subscribe(
      (users) => {
        this.userCount = users.length;
      },
      (err) => {
        console.error('Error fetching users:', err);
      }
    );
  }
  loadCartCount(): void {
    this.carteservice.getAllCarte().subscribe(
      (cartes) => {
        this.carteCount = cartes.length;
      },
      (err) => {
        console.error('Error fetching users:', err);
      }
    );
  }


  loadUserStats(): void {
    this.userService.getAllUsers().subscribe(
      (users) => {
        this.userCount = users.length;
        const groupUsers = users.filter((user:User) => user.isagroup);
        this.groupUserPercentage = (groupUsers.length / this.userCount) * 100;
      },
      (err) => {
        console.error('Error fetching users:', err);
      }
    );
  }
  
  loadUsernotAccepted(): void {
    this.userService.getAllUsers().subscribe(
      (users) => {
        const acceptuser = users.filter((user:User) => !user.isaccepted);
        this.Acceptuser = acceptuser.length ;
        this.listUsersNotAccepted=acceptuser;
      },
      (err) => {
        console.error('Error fetching users:', err);
      }
    );
  }
  loaduserattentePercentage(): void {
    this.carteservice.getAllCarte().subscribe(
      (users) => {
        this.userCount = users.length;
        const status =  users.filter((user:User) => !user.isaccepted);
        this.userattentePercentage = (status.length / this.carteCount) * 100;
      },
      (err) => {
        console.error('Error fetching users:', err);
      }
    );
  }

  loadCrateStats(): void {
    this.carteservice.getAllCarte().subscribe(
      (cartes) => {
        this.carteCount = cartes.length;
        const status = cartes.filter((carte:Cartes) => carte.statut==='En Attente');
        this.carteenattentePercentage = (status.length / this.carteCount) * 100;
      },
      (err) => {
        console.error('Error fetching users:', err);
      }
    );
  }
  Accepter(id: number): void {
    console.log(id)

    this.userService.getUser(id).subscribe(
      (user) => {
        this.user = user;
        this.user.isaccepted = true;
  
        this.userService.editUser(id, this.user).subscribe(
          (useramod) => {
            console.log('User accepted:', useramod);
          },
          (err) => {
            console.error('Error updating user:', err);
          }
        );
      },
      (err) => {
        console.error('Error fetching user:', err);
      }
    );
  }
  Refuser(id: number): void {
    console.log(id)
    this.userService.getUser(id).subscribe(
      (user) => {
        this.user = user;
        this.user.isaccepted = false;
  
        this.userService.editUser(id, this.user).subscribe(
          (useramod) => {
            console.log('User accepted:', useramod);
          },
          (err) => {
            console.error('Error updating user:', err);
          }
        );
      },
      (err) => {
        console.error('Error fetching user:', err);
      }
    );
  }
  
}
