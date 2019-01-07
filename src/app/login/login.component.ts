import { Component, OnInit } from '@angular/core';
import { LoginService } from './login.service';
import { User } from '../models/user.obj';
import { stringify } from 'querystring';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [ './login.component.css' ]
})
export class LoginComponent implements OnInit {
  constructor(private authService: AuthService,
              private loginService: LoginService) { }

  // user: User;
  username: string;
  password: string;

  ngOnInit() {
    this.authService.user;
  :
    User;
  }

  login() {
    console.log('In login:');
    // this.user = {
    //     username: this.username,
    //     password: this.password,
    //     email: '',
    //     token: ''
    //   };
    // user.username = this.username;
    this.authService.user.username = this.username;
    this.authService.user.password = this.password;

    this.loginService.login(this.username, this.password)
      .subscribe(token => {
        this.authService.user.token = token.token;
        console.log('Token: ' + token.token);
        console.log(stringify(this.authService._user));
      });
  }
}
