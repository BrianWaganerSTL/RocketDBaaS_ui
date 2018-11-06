import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import {Observable, Subject} from 'rxjs';
import {catchError, retry} from 'rxjs/operators';
import {Cluster} from '../clusters/cluster.model';
import {HandleError, HttpErrorHandler} from '../http-error-handler.service';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'my-auth-token'
  })
};

@Injectable()
export class ClusterDetailsService {
  url = 'http://localhost:8000/api/clusters/';  // URL to web api
  clusterChanged = new Subject<Cluster[]>();
  private handleError: HandleError;

  // getClusters$: Observable<Cluster>;

  constructor(
    private httpClient: HttpClient,
    httpErrorHandler: HttpErrorHandler) {
    this.handleError = httpErrorHandler.createHandleError('ClusterDetailsService');
  }

  /** GET clusters from the server */
  getClusters(clusterId: number): Observable<Cluster> {
    return this.httpClient.get<Cluster>(this.url + clusterId + '/')
      .pipe(
        retry(3), // Retry up to 3 times before failing
        catchError(this.handleError(
          'clusters-details.service',
          {})));
  }

  //////// Save methods //////////

  // /** POST: add a new cluster to the database */
  // addCluster(cluster: Cluster): Observable<Cluster> {
  //   return this.http.post<Cluster>(this.url, cluster, httpOptions)
  //     .pipe(
  //       catchError(this.handleError('addCluster', cluster))
  //     );
  // }

  // /** DELETE: delete the cluster from the server */
  // deleteCluster(id: number): Observable<{}> {
  //   const url = `${this.url}/${id}`; // DELETE api/clusters/42
  //   return this.http.delete(url, httpOptions)
  //     .pipe(
  //       catchError(this.handleError('deleteCluster'))
  //     );
  // }
  //
  // /** PUT: update the cluster on the server. Returns the updated cluster upon success. */
  // updateCluster(cluster: Cluster): Observable<Cluster> {
  //   httpOptions.headers =
  //     httpOptions.headers.set('Authorization', 'my-new-auth-token');
  //
  //   return this.http.put<Cluster>(this.url, cluster, httpOptions)
  //     .pipe(
  //       catchError(this.handleError('updateCluster', cluster))
  //     );
  // }
}
