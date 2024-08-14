import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../Models/User';

@Injectable({
  providedIn: 'root'
})
export class userservice {
  readonly API_URL = 'http://localhost:5285/api/Users';

  constructor(private httpClient: HttpClient) { }

  getAllUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>(this.API_URL);
  }

  addUser(user: User): Observable<User> {
    return this.httpClient.post<User>(this.API_URL, user);
  }

  editUser(id: number, user: User): Observable<void> {
    return this.httpClient.put<void>(`${this.API_URL}/${id}`, user);
  }

  deleteUser(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.API_URL}/${id}`);
  }

  getUser(id: any): Observable<User> {
    return this.httpClient.get<User>(`${this.API_URL}/${id}`);
  }

  // Adjusted endpoint names to match typical CRUD operations
  // Assuming these endpoints exist in the backend
  getUserByCompteId(id: number): Observable<User> {
    return this.httpClient.get<User>(`${this.API_URL}/getbycompteid/${id}`);
  }

  getUserByEmail(email: string): Observable<boolean> {
    return this.httpClient.get<boolean>(`${this.API_URL}/getbyemail/${email}`);
  }
}
