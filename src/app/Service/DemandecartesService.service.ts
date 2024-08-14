import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Demandecartes } from '../Models/Demandecartes';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DemandecartesService {
  private readonly API_URL = 'http://localhost:5285/api/DemandeCartes';

  constructor(private httpClient: HttpClient) { }

  getAllDemandeCarte(): Observable<Demandecartes[]> {
    return this.httpClient.get<Demandecartes[]>(this.API_URL);
  }
 
  addDemandeCarte(demandecarte: any): Observable<Demandecartes> {
    return this.httpClient.post<Demandecartes>(this.API_URL, demandecarte);
  }

  editDemandeCarte(id: number, demandecarte: Demandecartes): Observable<Demandecartes> {
    return this.httpClient.put<Demandecartes>(`${this.API_URL}/${id}`, demandecarte);
  }

  deleteDemandeCarte(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.API_URL}/${id}`);
  }

  getDemandeCarte(id: number): Observable<Demandecartes> {
    return this.httpClient.get<Demandecartes>(`${this.API_URL}/${id}`);
  }
}
