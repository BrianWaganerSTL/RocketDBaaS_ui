import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import {catchError, retry} from 'rxjs/operators';
import {HandleError, HttpErrorHandler} from '../http-error-handler.service';
import {Cluster} from '../models/cluster.model';

// const httpOptions = {
//   headers: new HttpHeaders({
//     'Content-Type': 'application/json',
//     'Authorization': 'my-auth-token'
//   })
// };

@Injectable()
export class ClusterDetailsService {
  clusterUrl = 'http://localhost:8000/api/clusters/';  // URL to web api
  clusterChanged = new Subject<Cluster[]>();
  private handleError: HandleError;

  constructor(
    private httpClient: HttpClient,
    httpErrorHandler: HttpErrorHandler) {
    this.handleError = httpErrorHandler.createHandleError('ClusterDetailsService');
  }

  getCluster(clusterId: number): Observable<Cluster> {
    const url = `${this.clusterUrl}${clusterId}/`;
    return this.httpClient.get<Cluster>(url)
      .pipe(
        retry(3),  // retry a failed request up to 3 times
        catchError(this.handleError<Cluster>('getCluster'))
      );
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
