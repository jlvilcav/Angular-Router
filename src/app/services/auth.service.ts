import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { switchMap, tap } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

import { environment } from './../../environments/environment';
import { Auth } from './../models/auth.model';
import { User } from './../models/user.model';
// import { pipe } from 'rxjs';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // private apiUrl: string = 'https://young-sands-07814.herokuppapp.com/api/products';
  private apiUrl: string = 'https://young-sands-07814.herokuapp.com/api/auth';
  // private apiUrl: string = `${environment.API_URL}/api/products`;
  private user = new BehaviorSubject<User | null>(null);

  user$ = this.user.asObservable();

  constructor(
    private http: HttpClient,
    private tokenService: TokenService
  ) { }

  login(email: string, password: string){
    return this.http.post<Auth>(`${this.apiUrl}/login`, {email, password})
    .pipe(
      tap(response => this.tokenService.saveToken(response.access_token))
    );
  }

  profile(){
    // let headers = new HttpHeaders();
    // headers = headers.set('Authorization', `Bearer ${token}`);
    // console.log(token);
    // headers = headers.set('Content-type', 'application/json');
    return this.http.get<User>(`${this.apiUrl}/profile`, {  })
            .pipe(
              tap(user => {
                this.user.next(user);
              })
            );
  }

  loginAndGet(email: string, password: string){
    return this.login(email, password)
    .pipe(
      switchMap(() => this.profile())
    );
  }

  logout(){
    this.tokenService.removeToken();
  }
}
