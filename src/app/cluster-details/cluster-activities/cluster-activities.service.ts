import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { HandleError, HttpErrorHandler } from '../../http-error-handler.service';
import { ServerActivity } from '../../models/serverActivity.model';
import { globals } from '../../../environments/environment';

@Injectable()
export class ClusterActivitiesService {
  private handleError: HandleError;

  constructor(
    private httpClient: HttpClient,
    httpErrorHandler: HttpErrorHandler) {
    this.handleError = httpErrorHandler.createHandleError('ClusterActivitiesService');
  }

  getActivities(clusterId: number): Observable<ServerActivity[]> {
    const url = `${globals.apiUrl}/clusters/${clusterId}/activities/`;
    return this.httpClient.get<ServerActivity[]>(url)
      .pipe(
        retry(3),  // retry a failed request up to 3 times
        catchError(this.handleError<ServerActivity[]>('getActivities'))
      );
  }
}
