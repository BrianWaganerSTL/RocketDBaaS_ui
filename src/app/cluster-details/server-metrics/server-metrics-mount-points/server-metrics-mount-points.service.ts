import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { HandleError, HttpErrorHandler } from '../../../http-error-handler.service';
import { MetricsMountPoints } from '../../../models/metricsMountPoints.model';
import { globals } from '../../../../environments/environment';

@Injectable()
export class ServerMetricsMountPointsService {
  private handleError: HandleError;

  constructor(
    private httpClient: HttpClient,
    httpErrorHandler: HttpErrorHandler) {
    this.handleError = httpErrorHandler.createHandleError('ServerMetricsService');
  }

  getMetricsMountPoints(serverId: number): Observable<MetricsMountPoints[]> {
    const url = `${globals.apiUrl}/servers/${serverId}/metrics/mountpoints/`;
    return this.httpClient.get<MetricsMountPoints[]>(url)
      .pipe(
        retry(3),  // retry a failed request up to 3 times
        catchError(this.handleError<MetricsMountPoints[]>('getMetricsMountPoints'))
      );
  }
}
