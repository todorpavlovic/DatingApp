import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';
import { Router } from '@angular/router';

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
  constructor(public authService: AuthService, private alertify: AlertifyService,
    private router: Router) { }

  ngOnInit() {
  }

  login() {
    this.authService.login(this.model).subscribe(next => {
      this.alertify.success('You are logged in')
    }, error => {
      this.alertify.error('Error while login')
    }, () => {
      this.router.navigate(['/members'])
    })

  }


  loggedIn() {
    return this.authService.loggedIn();
  }

  logout() {
    localStorage.removeItem('token');
    this.alertify.message('You Logout')
    this.router.navigate(['/home'])
  }
}
