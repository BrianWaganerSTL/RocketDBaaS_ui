import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { HandleError, HttpErrorHandler } from '../../../http-error-handler.service';
import { MetricsMountPoints } from '../../../models/metricsMountPoints.model';

@Injectable()
export class ServerMetricsMountPointsService {
  metricsUrl = 'http://localhost:8000/api/servers';  // URL to web api
  private handleError: HandleError;

  constructor(
    private httpClient: HttpClient,
    httpErrorHandler: HttpErrorHandler) {
    this.handleError = httpErrorHandler.createHandleError('ServerMetricsService');
  }

  getMetricsMountPoints(serverId: number): Observable<MetricsMountPoints[]> {
    const url = `${this.metricsUrl}/${serverId}/metrics/mountpoints/`;
    return this.httpClient.get<MetricsMountPoints[]>(url)
      .pipe(
        retry(3),  // retry a failed request up to 3 times
        catchError(this.handleError<MetricsMountPoints[]>('getMetricsMountPoints'))
      );
  }
}
