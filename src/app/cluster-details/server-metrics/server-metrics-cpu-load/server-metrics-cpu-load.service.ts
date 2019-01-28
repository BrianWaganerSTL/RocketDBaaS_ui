import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { HandleError, HttpErrorHandler } from '../../../http-error-handler.service';
import { MetricsLoad } from '../../../models/metricsLoad.model';
import { globals } from '../../../../environments/environment';

@Injectable()
export class ServerMetricsCpuLoadService {
  private handleError: HandleError;

  constructor(
    private httpClient: HttpClient,
    httpErrorHandler: HttpErrorHandler) {
    this.handleError = httpErrorHandler.createHandleError('ServerMetricsService');
  }

  getMetricsLoad(serverId: number): Observable<MetricsLoad[]> {
    // const url = `${this.activityUrl}/${clusterId}/metrics/cpu/`;
    const url = `${globals.apiUrl}/servers/${serverId}/metrics/load/`;
    return this.httpClient.get<MetricsLoad[]>(url)
      .pipe(
        retry(3),  // retry a failed request up to 3 times
        catchError(this.handleError<MetricsLoad[]>('getMetricsLoad'))
      );
  }
}
