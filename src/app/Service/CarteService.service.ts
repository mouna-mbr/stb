import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cartes } from '../Models/Cartes';

@Injectable({
  providedIn: 'root'
})
export class CarteService {
  readonly API_URL = 'http://localhost:5285/api/Cartes';

  constructor(private httpClient: HttpClient) { }

  // Get all cartes
  getAllCartes(): Observable<Cartes[]> {
    return this.httpClient.get<Cartes[]>(this.API_URL);
  }

  // Add a new carte
  addCarte(carte: Cartes): Observable<Cartes> {
    return this.httpClient.post<Cartes>(this.API_URL, carte);
  }

  // Edit an existing carte
  editCarte(id: string | number, carte: Cartes): Observable<Cartes> {
    return this.httpClient.put<Cartes>(`${this.API_URL}/${id}`, carte);
  }

  // Delete a carte by id
  deleteCarte(id: string | number): Observable<void> {
    return this.httpClient.delete<void>(`${this.API_URL}/${id}`);
  }

  // Get a single carte by id
  getCarte(id: string | number): Observable<Cartes> {
    return this.httpClient.get<Cartes>(`${this.API_URL}/${id}`);
  }
}
