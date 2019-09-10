import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})

//To use services we need to implement them inside constructor of the class
//then it's easy to access methods inside this service
//we are subscribing to this method to get some informations is it successfull or not

export class NavComponent implements OnInit {
  model: any = {};
  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  login() {
    this.authService.login(this.model).subscribe(next => {
      console.log('Logged In')
    }, error => {console.log('Fail to login')})

  }


  loggedIn() {
    const token = localStorage.getItem('token');
    //    !!token   means that this function will return true or false
    return !!token;
  }

  logout() {
    localStorage.removeItem('token');
  }
}
