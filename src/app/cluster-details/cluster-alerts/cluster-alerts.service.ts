import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {catchError, retry} from 'rxjs/operators';
import {HandleError, HttpErrorHandler} from '../../http-error-handler.service';
import {AlertModel} from '../../models/alert.model';

@Injectable()
export class ClusterAlertsService {
  activityUrl = 'http://localhost:8000/api/clusters/';  // URL to web api
  private handleError: HandleError;

  constructor(
    private httpClient: HttpClient,
    httpErrorHandler: HttpErrorHandler) {
    this.handleError = httpErrorHandler.createHandleError('ClusterAlertsService');
  }

  getAlerts(clusterId: number): Observable<AlertModel[]> {
    const url = `${this.activityUrl}${clusterId}/alerts/`;
    return this.httpClient.get<AlertModel[]>(url)
      .pipe(
        retry(3),  // retry a failed request up to 3 times
        catchError(this.handleError<AlertModel[]>('getAlerts'))
      );
  }
}
