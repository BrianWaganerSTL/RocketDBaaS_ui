import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Observable} from 'rxjs';
import {catchError, retry} from 'rxjs/operators';
import {HandleError, HttpErrorHandler} from '../../http-error-handler.service';
import {Note} from '../../models/note.model';

@Injectable()
export class ClusterNotesService {
  activityUrl = 'http://localhost:8000/api/cluster/';  // URL to web api
  private handleError: HandleError;

  constructor(
    private httpClient: HttpClient,
    httpErrorHandler: HttpErrorHandler) {
    this.handleError = httpErrorHandler.createHandleError('ClusterNotesService');
  }

  getNotes(clusterId: number): Observable<Note[]> {
    const url = `${this.activityUrl}${clusterId}/notes/`;
    return this.httpClient.get<Note[]>(url)
      .pipe(
        retry(3),  // retry a failed request up to 3 times
        catchError(this.handleError<Note[]>('getNotes'))
      );
  }
}
