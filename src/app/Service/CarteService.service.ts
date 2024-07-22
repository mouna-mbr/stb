import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Cartes } from '../Models/Cartes';

@Injectable({
  providedIn: 'root'
})
export class CarteService {
  readonly API_URL = 'http://localhost:9090/SpringMVC/carte';

  constructor(private httpClient: HttpClient) { }

  getAllCarte() {
    return this.httpClient.get<any>(`${this.API_URL}/all`);
  }
 

  addCarte(carte: any) {
    return this.httpClient.post(`${this.API_URL}/add`, carte);
  }

  editCarte(id: any, carte: any) {
    return this.httpClient.put(`${this.API_URL}/${id}`, carte);
  }

  deleteCarte(id: any) {
    return this.httpClient.delete(`${this.API_URL}/delete/${id}`);
  }

  getCarte(id: any) {
    return this.httpClient.get<Cartes>(`${this.API_URL}/${id}`);
  }
  
 
}
