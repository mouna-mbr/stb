import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Demandecartes } from '../Models/Demandecartes';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DemandecartesService {
  readonly API_URL = 'http://localhost:9090/SpringMVC/demandecarte';

  constructor(private httpClient: HttpClient) { }

  getAllDemandeCarte() {
    return this.httpClient.get<any>(`${this.API_URL}/all`);
  }
 

  addDemandeCarte(demandedecartes: any) {
    return this.httpClient.post(`${this.API_URL}/add`, demandedecartes);
  }

  editDemandeCarte(id: any, demandedecartes: any) {
    return this.httpClient.put(`${this.API_URL}/${id}`, demandedecartes);
  }

  deleteDemandeCarte(id: any) {
    return this.httpClient.delete(`${this.API_URL}/delete/${id}`);
  }

  getDemandeCarte(id: any) {
    return this.httpClient.get<Demandecartes>(`${this.API_URL}/${id}`);
  }


 
}
