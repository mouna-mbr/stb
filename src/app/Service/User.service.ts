import { Injectable } from '@angular/core';

import { HttpClient} from '@angular/common/http';
import { User } from '../Models/User';

@Injectable({
  providedIn: 'root'
})
export class userservice {
  readonly API_URL = 'http://localhost:9090/SpringMVC/user';

  constructor(private httpClient: HttpClient) { }
  getAllUser() {
    return this.httpClient.get(`${this.API_URL}/all`)
  }
  addUser(user : any) {
    return this.httpClient.post(`${this.API_URL}/add`, user )
  }
  editUser(id:any,user  : any){
    return this.httpClient.put(`${this.API_URL}/`+id, user )
  }
  deleteUser(id : any){
    return  this.httpClient.delete(`${this.API_URL}/delete/${id}`)
  }
  getUser(id : any) {
    return this.httpClient.get<User>(`${this.API_URL}/get/${id}`)
  }
 
  getEtudiantbycompteid(id:any){
    return this.httpClient.get<User>(`${this.API_URL}/getbycompteid/${id}`)
  }

}
