import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HandleError, HttpErrorHandler } from '../http-error-handler.service';
import { globals } from '../../environments/environment';
import { Observable } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Token } from '../models/user.obj';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({ providedIn: 'root' })
export class LoginService {
  private readonly handleError: HandleError;

  constructor(
    private http: HttpClient,
    httpErrorHandler: HttpErrorHandler) {
    this.handleError = httpErrorHandler.createHandleError('LoginService');
  }

  login(username: string, password: string): Observable<Token> {
    const url = `${globals.apiUrl}/api-token-auth/`;
    const body = '{"username":"' + username + '","password":"' + password + '"}';
    return this.http.post<Token>(url, body, httpOptions)
      .pipe(
        retry(3),  // retry a failed request up to 3 times
        catchError(this.handleError<Token>('login'))
      );
  }
}
