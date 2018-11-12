import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {catchError, retry} from 'rxjs/operators';
import {HandleError, HttpErrorHandler} from '../../http-error-handler.service';
import {Server} from '../../models/server.model';

@Injectable()
export class ClusterServersService {
  serversUrl = 'http://localhost:8000/api/clusters/';  // URL to web api
  private handleError: HandleError;

  constructor(
    private httpClient: HttpClient,
    httpErrorHandler: HttpErrorHandler) {
    this.handleError = httpErrorHandler.createHandleError('ClusterServersService');
  }

  /** GET servers from the server */
  getServers(clusterId: number): Observable<Server[]> {
    const url = `${this.serversUrl}${clusterId}/servers/`;
    return this.httpClient.get<Server[]>(url)
      .pipe(
        retry(3),  // retry a failed request up to 3 times
        catchError(this.handleError<Server[]>('getServers'))
      );
  }
}

/* GET servers whose name contains search term */
// searchServers(term: number): Observable<Server[]> {
//   const options = term ?
//     {params: new HttpParams().set('cluster_id', String(term))} : {};
//   // return this.http.get<Servers[]>(this.url + '1/')
//   return this.http.get<Server[]>(this.url, options)
//     .pipe(
//       catchError(this.handleError<Servers[]>('searchServers', []))
//     );
// }

/** POST: add a new server to the database */
// addServer(server: Server): Observable<Server> {
//   return this.http.post<Server>(this.url, server, httpOptions)
//     .pipe(
//       catchError(this.handleError('addServers', server))
//     );
//}

/** DELETE: delete the server from the server */
// deleteServer(id: number): Observable<{}> {
//   const url = `${this.url}/${id}`; // DELETE api/servers/42
//   return this.http.delete(url, httpOptions)
//     .pipe(
//       catchError(this.handleError('deleteServer'))
//     );
// }

/** PUT: update the server on the server. Returns the updated server upon success. */
// updateServer(server: Server): Observable<Server> {
//   httpOptions.headers =
//     httpOptions.headers.set('Authorization', 'my-new-auth-token');
//
//   return this.http.put<Server>(this.url, server, httpOptions)
//     .pipe(
//       catchError(this.handleError('updateServer', server))
//     );
// }
//}
