import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { HandleError, HttpErrorHandler } from '../../../http-error-handler.service';
import { MetricsPingServer } from '../../../models/metricsPingServer.model';

@Injectable()
export class ServerMetricsPingServerService {
  metricsUrl = 'http://localhost:8000/api/servers';  // URL to web api
  private handleError: HandleError;

  constructor(
    private httpClient: HttpClient,
    httpErrorHandler: HttpErrorHandler) {
    this.handleError = httpErrorHandler.createHandleError('ServerMetricsService');
  }

  getMetricsPingServer(serverId: number): Observable<MetricsPingServer[]> {
    const url = `${this.metricsUrl}/${serverId}/metrics/pingserver/`;
    return this.httpClient.get<MetricsPingServer[]>(url)
      .pipe(
        retry(3),  // retry a failed request up to 3 times
        catchError(this.handleError<MetricsPingServer[]>('getMetricsPingServer'))
      );
  }
}
