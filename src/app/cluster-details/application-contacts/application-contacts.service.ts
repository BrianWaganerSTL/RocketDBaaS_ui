import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { HandleError, HttpErrorHandler } from '../../http-error-handler.service';
import { ApplicationContact } from '../../models/applicationContact.model';
import { globals } from '../../../environments/environment';

@Injectable()
export class ApplicationContactsService {
  private handleError: HandleError;

  constructor(
    private httpClient: HttpClient,
    httpErrorHandler: HttpErrorHandler) {
    this.handleError = httpErrorHandler.createHandleError('ApplicationContactsService');
  }

  getApplicationContacts(applicationId: number): Observable<ApplicationContact[]> {
    const url = `${globals.apiUrl}/applications/${applicationId}/contacts/`;
    return this.httpClient.get<ApplicationContact[]>(url)
      .pipe(
        retry(3),  // retry a failed request up to 3 times
        catchError(this.handleError<ApplicationContact[]>('getApplicationContacts'))
      );
  }
}
