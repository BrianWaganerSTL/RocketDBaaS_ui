import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { HandleError, HttpErrorHandler } from '../http-error-handler.service';
import { globals } from '../../environments/environment';
import { DbmsType } from '../models/dbmsType.model';
import { Environment } from '../models/environment.model';
import { Cluster } from '../models/cluster.model';
import { Application } from '../models/application.model';

@Injectable()
export class ClusterCreateService {
  private handleError: HandleError;

  const;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': '6289e86c56ffe922bf93addad01108cb6683c0bd',
    })
  };

  constructor(
    private httpClient: HttpClient,
    httpErrorHandler: HttpErrorHandler) {
    this.handleError = httpErrorHandler.createHandleError('ClusterCreateService');
  }

  getApplications(): Observable<Application[]> {
    const url = `${globals.apiUrl}/applications/`;
    return this.httpClient.get<Application[]>(url)
      .pipe(
        retry(3),  // retry a failed request up to 3 times
        catchError(this.handleError<Application[]>('getApplications'))
      );
  }

  getDbmsTypes(): Observable<DbmsType[]> {
    const url = `${globals.apiUrl}/dbmstypes/`;
    return this.httpClient.get<DbmsType[]>(url)
      .pipe(
        retry(3),  // retry a failed request up to 3 times
        catchError(this.handleError<DbmsType[]>('getDbmsTypes'))
      );
  }

  getEnvironments(): Observable<Environment[]> {
    const url = `${globals.apiUrl}/environments/`;
    return this.httpClient.get<Environment[]>(url)
      .pipe(
        retry(3),  // retry a failed request up to 3 times
        catchError(this.handleError<Environment[]>('getEnvironments'))
      );
  }

  addClusterToDB(cluster: Cluster): Observable<Cluster> {
    const url = `${globals.apiUrl}/create_cluster/`;

    return this.httpClient.post<Cluster>(url, cluster, this.httpOptions)
      .pipe(
        retry(3),  // retry a failed request up to 3 times
        catchError(this.handleError<Cluster>('addClusterToDB'))
      );
  }
}
