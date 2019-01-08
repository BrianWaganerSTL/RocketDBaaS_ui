import { Component, OnInit } from '@angular/core';
import { LoginService } from './login.service';
import { stringify } from 'querystring';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [ './login.component.css' ]
})
export class LoginComponent implements OnInit {
  constructor(private authService: AuthService,
              private loginService: LoginService,
              private router: Router) { }

  username: string;
  password: string;

  ngOnInit() { }

  login() {
    console.log('In login:');
    this.authService.loggedInUser.username = this.username;
    this.authService.loggedInUser.password = this.password;

    this.loginService.login(this.username, this.password)
      .subscribe(token => {
        this.authService.loggedInUser.token = token.token;
        console.log('Token: ' + token.token);
        console.log(stringify(this.authService.loggedInUser));
        this.router.navigateByUrl('overview');
      });
  }
}
