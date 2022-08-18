import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from './../../environments/environment';
import { Auth } from './../models/auth.model';
import { User } from './../models/user.model';

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

  profile(token: string){
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', `Bearer ${token}`);
    // console.log(token);
    // headers = headers.set('Content-type', 'application/json');
    return this.http.get<User>(`${this.apiUrl}/profile`, { headers });
  }
}
