import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {catchError, retry} from 'rxjs/operators';
import {HandleError, HttpErrorHandler} from '../../http-error-handler.service';
import {IssueModel} from '../../models/issue.model';

@Injectable()
export class ClusterIssuesService {
  issueUrl = 'http://localhost:8000/api/servers';  // URL to web api
  private handleError: HandleError;

  constructor(
    private httpClient: HttpClient,
    httpErrorHandler: HttpErrorHandler) {
    this.handleError = httpErrorHandler.createHandleError('ClusterIssuesService');
  }

  getIssues(serverId: number): Observable<IssueModel[]> {
    const url = `${this.issueUrl}/${serverId}/issues/`;
    return this.httpClient.get<IssueModel[]>(url)
      .pipe(
        retry(3),  // retry a failed request up to 3 times
        catchError(this.handleError<IssueModel[]>('getIssues'))
      );
  }
}
