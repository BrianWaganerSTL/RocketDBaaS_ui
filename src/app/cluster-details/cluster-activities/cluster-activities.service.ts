import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Observable} from 'rxjs';
import {catchError, retry} from 'rxjs/operators';
import {HandleError, HttpErrorHandler} from '../../http-error-handler.service';
import {ServerActivity} from '../../models/serverActivity.model';

@Injectable()
export class ClusterActivitiesService {
  activityUrl = 'http://localhost:8000/api/clusters/';  // URL to web api
  private handleError: HandleError;

  constructor(
    private httpClient: HttpClient,
    httpErrorHandler: HttpErrorHandler) {
    this.handleError = httpErrorHandler.createHandleError('ClusterActivitiesService');
  }

  getActivities(clusterId: number): Observable<ServerActivity[]> {
    const url = `${this.activityUrl}${clusterId}/activities/`;
    return this.httpClient.get<ServerActivity[]>(url)
      .pipe(
        retry(3),  // retry a failed request up to 3 times
        catchError(this.handleError<ServerActivity[]>('getActivities'))
      );
  }
}
