import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment} from './../../environments/environment';
import { User, CreateUserDTO } from './../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  // private apiUrl: string = 'https://young-sands-07814.herokuppapp.com/api/products';
  private apiUrl: string = 'https://young-sands-07814.herokuapp.com/api/users';
  // private apiUrl: string = `${environment.API_URL}/api/products`;

  constructor(
    private http: HttpClient
  ) { }

  create(dto: CreateUserDTO){
    return this.http.post<User>(this.apiUrl, dto);
  }

  getAll(){
    return this.http.get<User[]>(this.apiUrl);
  }
}
