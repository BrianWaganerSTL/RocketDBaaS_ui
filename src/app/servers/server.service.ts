import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {catchError} from 'rxjs/operators';

import {Server} from './server.model';
import {HandleError, HttpErrorHandler} from '../http-error-handler.service';

// const httpOptions = {
//   headers: new HttpHeaders({
//     'Content-Type': 'application/json',
//     'Authorization': 'my-auth-token'
//   })
// };

@Injectable()
export class ServersService {
  url = 'http://localhost:8000/api/servers/';  // URL to web api
  private handleError: HandleError;

  constructor(
    private http: HttpClient,
    httpErrorHandler: HttpErrorHandler) {
    this.handleError = httpErrorHandler.createHandleError('ServersService');
  }

  /** GET servers from the server */
  getServers(clusterId: number): Observable<Server[]> {
    return this.http.get<Server[]>(this.url + clusterId + '/')
      .pipe(
        catchError(this.handleError('getServers', []))
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
