import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from './../../environments/environment';
import { Auth } from './../models/auth.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // private apiUrl: string = 'https://young-sands-07814.herokuppapp.com/api/products';
  private apiUrl: string = 'https://young-sands-07814.herokuapp.com/api/auth';
  // private apiUrl: string = `${environment.API_URL}/api/products`;

  constructor(
    private http: HttpClient
  ) { }

  login(email: string, password: string){
    return this.http.post<Auth>(`${this.apiUrl}/login`, {email, password});
  }

  profile(){
    return this.http.get(`${this.apiUrl}/profile`);
  }
}
