import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { HandleError, HttpErrorHandler } from '../http-error-handler.service';
import { globals } from '../../environments/environment';
import { DbmsType } from '../models/dbmsType.model';

@Injectable()
export class ClusterCreateService {
  private handleError: HandleError;

  constructor(
    private httpClient: HttpClient,
    httpErrorHandler: HttpErrorHandler) {
    this.handleError = httpErrorHandler.createHandleError('ClusterCreateService');
  }

  getDbmsTypes(): Observable<DbmsType[]> {
    const url = `${globals.apiUrl}/dbmstypes/`;
    return this.httpClient.get<DbmsType[]>(url)
      .pipe(
        retry(3),  // retry a failed request up to 3 times
        catchError(this.handleError<DbmsType[]>('getDbmsTypes'))
      );
  }
}
