import { Injectable, OnDestroy } from '@angular/core';
import { User } from './models/user.obj';

/** Mock client-side authentication/authorization service */
@Injectable()
export class AuthService implements OnDestroy {
  private _loggedInUser: User;


  get loggedInUser(): { username: string; password: string; email: string; token: string } {
    return this._loggedInUser;
  }

  set loggedInUser(value: { username: string; password: string; email: string; token: string }) {
    this._loggedInUser = value;
  }

  constructor() {
    this._loggedInUser = { username: '', password: '', email: '', token: '' };
    console.log('+++ Service AuthService created');
    // this._loggedInUser = this._loggedInUser({'', '','',''});

  }

  ngOnDestroy(): void {
    console.log('--- Service AuthService destroyed');
  }
}
