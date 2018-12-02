import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { HandleError, HttpErrorHandler } from '../../../http-error-handler.service';
import { MetricsLoad } from '../../../models/metricsLoad.model';

@Injectable()
export class ServerMetricsLoadService {
  metricsUrl = 'http://localhost:8000/api/servers';  // URL to web api
  private handleError: HandleError;

  constructor(
    private httpClient: HttpClient,
    httpErrorHandler: HttpErrorHandler) {
    this.handleError = httpErrorHandler.createHandleError('ServerMetricsService');
  }

  getMetricsLoad(serverId: number): Observable<MetricsLoad[]> {
    // const url = `${this.activityUrl}/${clusterId}/metrics/cpu/`;
    const url = `${this.metricsUrl}/${serverId}/metrics/load/`;
    return this.httpClient.get<MetricsLoad[]>(url)
      .pipe(
        retry(3),  // retry a failed request up to 3 times
        catchError(this.handleError<MetricsLoad[]>('getMetricsLoad'))
      );
  }
}
