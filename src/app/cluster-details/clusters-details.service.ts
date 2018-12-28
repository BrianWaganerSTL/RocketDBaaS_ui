import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { HandleError, HttpErrorHandler } from '../http-error-handler.service';
import { Cluster } from '../models/cluster.model';
import { globals } from '../../environments/environment';

@Injectable()
export class ClusterDetailsService {
  private handleError: HandleError;

  constructor(
    private httpClient: HttpClient,
    httpErrorHandler: HttpErrorHandler) {
    this.handleError = httpErrorHandler.createHandleError('ClusterDetailsService');
  }

  getCluster(clusterId: number): Observable<Cluster> {
    const url = `${globals.apiUrl}/clusters/${clusterId}/`;
    return this.httpClient.get<Cluster>(url)
      .pipe(
        retry(3),  // retry a failed request up to 3 times
        catchError(this.handleError<Cluster>('getCluster'))
      );
  }
}
