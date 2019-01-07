import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';


import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Cluster } from '../models/cluster.model';
import { HandleError, HttpErrorHandler } from '../http-error-handler.service';
import { globals } from '../../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'my-auth-token'
  })
};

@Injectable({ providedIn: 'root' })
export class ClustersService {
  private handleError: HandleError;
  url = `${globals.apiUrl}/clusters/`;

  constructor(
    private http: HttpClient,
    httpErrorHandler: HttpErrorHandler) {
    this.handleError = httpErrorHandler.createHandleError('ClustersService');
  }

  getClusters(term: string): Observable<Cluster[]> {
    term = term.trim();
    console.log('In getClusters Filter=[' + term + ']');

    // Add safe, URL encoded search parameter if there is a search term
    const options = term ?
      { params: new HttpParams().set('cluster_name', term) } : {};
    return this.http.get<Cluster[]>(this.url, options)
      .pipe(
        catchError(this.handleError<Cluster[]>('getClusters', []))
      );
  }

  //////// Save methods //////////
  /** POST: add a new cluster to the database */
  addCluster(cluster: Cluster): Observable<Cluster> {
    return this.http.post<Cluster>(this.url, cluster, httpOptions)
      .pipe(
        catchError(this.handleError('addCluster', cluster))
      );
  }

  /** DELETE: delete the cluster from the server */
  deleteCluster(id: number): Observable<{}> {
    const url = `${this.url}${id}`; // DELETE api/clusters/42
    return this.http.delete(url, httpOptions)
      .pipe(
        catchError(this.handleError('deleteCluster'))
      );
  }

  /** PUT: update the cluster on the server. Returns the updated cluster upon success. */
  updateCluster(cluster: Cluster): Observable<Cluster> {
    httpOptions.headers =
      httpOptions.headers.set('Authorization', 'my-new-auth-token');

    return this.http.put<Cluster>(this.url, cluster, httpOptions)
      .pipe(
        catchError(this.handleError('updateCluster', cluster))
      );
  }
}
