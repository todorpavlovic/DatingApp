import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

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
  baseUrl = 'http://localhost:5000/api/auth/';

  constructor(private http: HttpClient) { }

  login(model: any) {
    return this.http.post(this.baseUrl + 'login', model)
    .pipe( map((response: any) => {
      const user = response;
      if(user) {
        localStorage.setItem('token', user.token)
      }
    }))
  }

  register(model: any){
    return this.http.post(this.baseUrl + 'register', model)
  }
}
