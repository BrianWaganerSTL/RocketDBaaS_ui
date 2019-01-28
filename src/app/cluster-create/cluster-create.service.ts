import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { HandleError, HttpErrorHandler } from '../http-error-handler.service';
import { globals } from '../../environments/environment';
import { DbmsType } from '../models/dbmsType.model';
import { Environment } from '../models/environment.model';
import { ApplicationClusterServersPOST, Cluster } from '../models/cluster.model';
import { Application } from '../models/application.model';

@Injectable()
export class ClusterCreateService {
  private handleError: HandleError;

  const;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
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
        retry(1),  // retry a failed request up to 3 times
        catchError(this.handleError<Application[]>('getApplications'))
      );
  }

  createApplClusterServers(applicationClusterServersPOST: ApplicationClusterServersPOST): Observable<Cluster> {
    const url = `${globals.apiUrl}/clusters/`;
    return this.httpClient.post<Cluster>(url, applicationClusterServersPOST, this.httpOptions)
      .pipe(
        retry(1),  // retry a failed request up to 3 times
        catchError(err => {
          this.handleError<Cluster>('createApplClusterServers');
          throw err;
        })
      );
  }

  getDbmsTypes(): Observable<DbmsType[]> {
    const url = `${globals.apiUrl}/dbmstypes/`;
    return this.httpClient.get<DbmsType[]>(url)
      .pipe(
        retry(1),  // retry a failed request up to 3 times
        catchError(this.handleError<DbmsType[]>('getDbmsTypes'))
      );
  }

  getEnvironments(): Observable<Environment[]> {
    const url = `${globals.apiUrl}/environments/`;
    return this.httpClient.get<Environment[]>(url)
      .pipe(
        retry(1),  // retry a failed request up to 3 times
        catchError(this.handleError<Environment[]>('getEnvironments'))
      );
  }
}
