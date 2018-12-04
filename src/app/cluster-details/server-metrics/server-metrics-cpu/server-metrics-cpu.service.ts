import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { HandleError, HttpErrorHandler } from '../../../http-error-handler.service';
import { MetricsCpu } from '../../../models/metricsCpu.model';
import { globals } from '../../../../environments/environment';

@Injectable()
export class ServerMetricsCpuService {
  private handleError: HandleError;

  constructor(
    private httpClient: HttpClient,
    httpErrorHandler: HttpErrorHandler) {
    this.handleError = httpErrorHandler.createHandleError('ServerMetricsService');
  }

  getMetricsCpu(serverId: number): Observable<MetricsCpu[]> {
    // const url = `${this.activityUrl}/${clusterId}/metrics/cpu/`;
    const url = `${globals.apiUrl}/servers/${serverId}/metrics/cpu/`;
    return this.httpClient.get<MetricsCpu[]>(url)
      .pipe(
        retry(3),  // retry a failed request up to 3 times
        catchError(this.handleError<MetricsCpu[]>('getMetricsCpu'))
      );
  }
}
