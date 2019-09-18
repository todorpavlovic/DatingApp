import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import {environment} from '../../environments/environment';
//Services are used for communication with backend, great way to share data
//between components,
//in this case we are logging in user
//sending model and as you can see,
// "map" is part of rxjs and it's neccessery in this case
// for receiving the response and storing token inside localStorage
// .pipe is used for chaining these methods

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl = environment.apiUrl + 'auth/';
  jwtHelper = new JwtHelperService();
  decodedToken: any;
  constructor(private http: HttpClient) { }

  login(model: any) {
    return this.http.post(this.baseUrl + 'login', model)
    .pipe( map((response: any) => {
      const user = response;
      if(user) {
        localStorage.setItem('token', user.token)
        this.decodedToken = this.jwtHelper.decodeToken(user.token);

      }
    }))
  }

  register(model: any){
    return this.http.post(this.baseUrl + 'register', model)
  }

  loggedIn() {
    const token = localStorage.getItem('token');
    return !this.jwtHelper.isTokenExpired(token);
  }
}
