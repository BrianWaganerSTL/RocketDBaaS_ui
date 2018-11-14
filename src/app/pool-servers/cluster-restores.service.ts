import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {catchError, retry} from 'rxjs/operators';

import {HandleError, HttpErrorHandler} from '../http-error-handler.service';
import {PoolServer} from '../models/poolServer.model.ts';

@Injectable()
export class PoolServersService {
  poolServersUrl = 'http://localhost:8000/api/poolservers/';  // URL to web api
  private handleError: HandleError;

  constructor(
    private httpClient: HttpClient,
    httpErrorHandler: HttpErrorHandler) {
    this.handleError = httpErrorHandler.createHandleError('PoolServersService');
  }

  getPoolServers(): Observable<PoolServer[]> {
    const url = `${this.poolServersUrl}`;
    return this.httpClient.get<PoolServer[]>(url)
      .pipe(
        retry(3),  // retry a failed request up to 3 times
        catchError(this.handleError('getPoolServers', []))
      );
  }
}
