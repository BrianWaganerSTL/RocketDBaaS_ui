import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Observable} from 'rxjs';
import {catchError, retry} from 'rxjs/operators';
import {HandleError, HttpErrorHandler} from '../../http-error-handler.service';
import {ApplicationContact} from '../../models/applicationContact.model';

@Injectable()
export class ApplicationContactsService {
  activityUrl = 'http://localhost:8000/api/applications/';  // URL to web api
  private handleError: HandleError;

  constructor(
    private httpClient: HttpClient,
    httpErrorHandler: HttpErrorHandler) {
    this.handleError = httpErrorHandler.createHandleError('ApplicationContactsService');
  }

  getApplicationContacts(applicationId: number): Observable<ApplicationContact[]> {
    const url = `${this.activityUrl}${applicationId}/contacts/`;
    return this.httpClient.get<ApplicationContact[]>(url)
      .pipe(
        retry(3),  // retry a failed request up to 3 times
        catchError(this.handleError<ApplicationContact[]>('getApplicationContacts'))
      );
  }
}
