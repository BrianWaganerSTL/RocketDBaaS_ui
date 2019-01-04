import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { HandleError, HttpErrorHandler } from '../../http-error-handler.service';

@Injectable()
export class ApplicationAddService {
  private handleError: HandleError;

  constructor(
    private httpClient: HttpClient,
    httpErrorHandler: HttpErrorHandler) {
    this.handleError = httpErrorHandler.createHandleError('ApplicationAddService');
  }

  // addApplication(application: Application): Observable<Application> {
  //   const url = `${globals.apiUrl}/applications/`;
  //
  //   return this.httpClient.post<Application>(url, application, this.httpOptions)
  //     .pipe(
  //       retry(3),  // retry a failed request up to 3 times
  //       catchError(this.handleError<Application>('addApplication'))
  //     );
  // }
}
