import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { HandleError, HttpErrorHandler } from '../../http-error-handler.service';
import { IssueModel } from '../../models/issue.model';
import { globals } from '../../../environments/environment';

@Injectable()
export class ClusterIssuesService {
  private handleError: HandleError;

  constructor(
    private httpClient: HttpClient,
    httpErrorHandler: HttpErrorHandler) {
    this.handleError = httpErrorHandler.createHandleError('ClusterIssuesService');
  }

  getIssues(serverId: number): Observable<IssueModel[]> {
    const url = `${globals.apiUrl}/servers/${serverId}/issues/`;
    return this.httpClient.get<IssueModel[]>(url)
      .pipe(
        retry(3),  // retry a failed request up to 3 times
        catchError(this.handleError<IssueModel[]>('getIssues'))
      );
  }
}
