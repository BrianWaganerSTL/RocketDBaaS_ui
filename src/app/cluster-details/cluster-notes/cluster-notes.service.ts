import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { HandleError, HttpErrorHandler } from '../../http-error-handler.service';
import { Note } from '../../models/note.model';
import { globals } from '../../../environments/environment';

@Injectable()
export class ClusterNotesService {
  private handleError: HandleError;

  constructor(
    private httpClient: HttpClient,
    httpErrorHandler: HttpErrorHandler) {
    this.handleError = httpErrorHandler.createHandleError('ClusterNotesService');
  }

  getNotes(clusterId: number): Observable<Note[]> {
    const url = `${globals.apiUrl}/clusters/${clusterId}/notes/`;
    return this.httpClient.get<Note[]>(url)
      .pipe(
        retry(3),  // retry a failed request up to 3 times
        catchError(this.handleError<Note[]>('getNotes'))
      );
  }
}
