import { Injectable } from '@angular/core';
import { User } from './models/user.obj';

/** Mock client-side authentication/authorization service */
@Injectable()
export class AuthService {
  _user: User;

  get user(): { username: string; password: string; email: string; token: string } {
    return this._user;
  }

  set user(value: { username: string; password: string; email: string; token: string }) {
    this._user = value;
  }

  getAuthorizationToken() {
    return this._user.token;
  }
}
