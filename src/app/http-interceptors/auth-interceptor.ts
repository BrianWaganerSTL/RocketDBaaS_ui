import { Injectable } from '@angular/core';
import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';

import { AuthService } from '../auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private auth: AuthService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    // Get the auth token from the service.
    const authToken = this.auth.loggedInUser.token;

    // Clone the request and set the new header in one step.
    let authReq = req.clone();
    if (req.url !== '/login' && this.auth.loggedInUser.token !== '') {
      authReq = req.clone({
        setHeaders: {
          'x-csrftoken': authToken
          // 'Access-Control-Allow-Origin': 'http://127.0.0.1:8080',
          // 'Access-Control-Allow-Methods': 'POST',
          // 'Access-Control-Allow-Headers': 'Content-Type, Authorization',
          //   'Access-Control-Allow-Headers, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers'
          // 'Access-Control-Allow-Origin': '*',
          // 'Access-Control-Allow-Credentials': 'true',
          // 'Access-Control-Allow-Methods': 'DELETE,GET,OPTIONS,PATCH,POST,PUT',
          // 'Access-Control-Allow-Headers': 'accept,accept-encoding,authorization,content-type,dnt,origin,user-agent,x-csrftoken,x-requested-with'
        }
      });

    }

    // send cloned request with header to the next handler.
    return next.handle(authReq);
  }
}
