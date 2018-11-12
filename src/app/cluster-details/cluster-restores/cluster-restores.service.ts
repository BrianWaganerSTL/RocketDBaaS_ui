import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {catchError, retry} from 'rxjs/operators';

import {HandleError, HttpErrorHandler} from '../../http-error-handler.service';
import {Restore} from '../../models/restore.model';

@Injectable()
export class ClusterRestoresService {
  restoresUrl = 'http://localhost:8000/api/clusters/';  // URL to web api
  private handleError: HandleError;

  constructor(
    private httpClient: HttpClient,
    httpErrorHandler: HttpErrorHandler) {
    this.handleError = httpErrorHandler.createHandleError('ClusterRestoresService');
  }

  getRestores(clusterId: number): Observable<Restore[]> {
    const url = `${this.restoresUrl}${clusterId}/restores/`;
    return this.httpClient.get<Restore[]>(url)
      .pipe(
        retry(3),  // retry a failed request up to 3 times
        catchError(this.handleError('getRestores', []))
      );
  }
}
