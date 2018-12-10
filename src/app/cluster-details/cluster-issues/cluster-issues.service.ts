import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { HandleError, HttpErrorHandler } from '../../http-error-handler.service';
import { IssueTrackerModel } from '../../models/issueTrackerModel';
import { globals } from '../../../environments/environment';

@Injectable()
export class ClusterIssuesService {
  private handleError: HandleError;

  constructor(
    private httpClient: HttpClient,
    httpErrorHandler: HttpErrorHandler) {
    this.handleError = httpErrorHandler.createHandleError('ClusterIssuesService');
  }

  getIssues(serverId: number): Observable<IssueTrackerModel[]> {
    const url = `${globals.apiUrl}/servers/${serverId}/issuetracker/`;
    return this.httpClient.get<IssueTrackerModel[]>(url)
      .pipe(
        retry(3),  // retry a failed request up to 3 times
        catchError(this.handleError<IssueTrackerModel[]>('getIssues'))
      );
  }
}
