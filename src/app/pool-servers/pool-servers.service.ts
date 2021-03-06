import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

import { HandleError, HttpErrorHandler } from '../http-error-handler.service';
import { globals } from '../../environments/environment';
import { Server } from '../models/server.model';

@Injectable()
export class PoolServersService {
  private handleError: HandleError;

  constructor(
    private httpClient: HttpClient,
    httpErrorHandler: HttpErrorHandler) {
    this.handleError = httpErrorHandler.createHandleError('PoolServersService');
  }

  getPoolServers(): Observable<Server[]> {
    const url = `${globals.apiUrl}/poolservers/`;
    return this.httpClient.get<Server[]>(url)
      .pipe(
        retry(3),  // retry a failed request up to 3 times
        catchError(this.handleError('getPoolServers', []))
      );
  }
}
