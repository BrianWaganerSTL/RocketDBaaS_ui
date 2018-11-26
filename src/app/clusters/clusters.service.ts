import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';


import {Observable} from 'rxjs';
import {catchError} from 'rxjs/operators';

import {Cluster} from '../models/cluster.model';
import {HandleError, HttpErrorHandler} from '../http-error-handler.service';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'my-auth-token'
  })
};

@Injectable({providedIn: 'root'})
export class ClustersService {
  clustersUrl = 'http://localhost:8000/api/clusters/';  // URL to web api
  private handleError: HandleError;

  constructor(
    private http: HttpClient,
    httpErrorHandler: HttpErrorHandler) {
    this.handleError = httpErrorHandler.createHandleError('ClustersService');
  }

  /** GET clusters from the server */
  getClusters(): Observable<Cluster[]> {
    return this.http.get<Cluster[]>(this.clustersUrl)
      .pipe(
        catchError(this.handleError('getClusters', []))
      );
  }

  /* GET clusters whose name contains search term */
  searchClusters(term: string): Observable<Cluster[]> {
    term = term.trim();

    // Add safe, URL encoded search parameter if there is a search term
    const options = term ?
      {params: new HttpParams().set('cluster_name', term)} : {};
    // return this.http.get<Cluster[]>(this.clustersUrl + '1/')
    return this.http.get<Cluster[]>(this.clustersUrl, options)
      .pipe(
        catchError(this.handleError<Cluster[]>('searchClusters', []))
      );
  }

  //////// Save methods //////////

  /** POST: add a new cluster to the database */
  addCluster(cluster: Cluster): Observable<Cluster> {
    return this.http.post<Cluster>(this.clustersUrl, cluster, httpOptions)
      .pipe(
        catchError(this.handleError('addCluster', cluster))
      );
  }

  /** DELETE: delete the cluster from the server */
  deleteCluster(id: number): Observable<{}> {
    const url = `${this.clustersUrl}/${id}`; // DELETE api/clusters/42
    return this.http.delete(url, httpOptions)
      .pipe(
        catchError(this.handleError('deleteCluster'))
      );
  }

  /** PUT: update the cluster on the server. Returns the updated cluster upon success. */
  updateCluster(cluster: Cluster): Observable<Cluster> {
    httpOptions.headers =
      httpOptions.headers.set('Authorization', 'my-new-auth-token');

    return this.http.put<Cluster>(this.clustersUrl, cluster, httpOptions)
      .pipe(
        catchError(this.handleError('updateCluster', cluster))
      );
  }

  getCssClass(element, value) {
    let cssClass;
    switch (element) {
      case 'cluster_health':
        switch (value) {
          case 'ClusterConfiguring':
            cssClass = 'fg-ClusterConfiguring';
            break;
          case 'ClusterUp':
            cssClass = 'fg-ClusterUp';
            break;
          case 'ClusterUpWithIssues':
            cssClass = 'fg-ClusterUpWithIssues';
            break;
          case 'ClusterDown':
            cssClass = 'fg-ClusterDown';
            break;
          case 'ClusterOnLineMaint':
            cssClass = 'fg-ClusterOnLineMaint';
            break;
        }
        break;
      case 'issue':
        switch (value) {
          case 'Normal':
            cssClass = 'bg-issueNormal';
            break;
          case 'Warning':
            cssClass = 'bg-issueWarning';
            break;
          case 'Critical':
            cssClass = 'bg-issueCritical';
            break;
          case 'Blackout':
            cssClass = 'bg-issueBlackout';
            break;
          case 'Info' :
            cssClass = 'bg-issueInfo';
            break;
          case 'Unknown':
            cssClass = 'bg-issueUnknown';
            break;
        }
        break;
    }
    return cssClass;
  }
}
