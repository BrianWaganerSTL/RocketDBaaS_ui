import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { HandleError, HttpErrorHandler } from '../../../http-error-handler.service';
import { MetricsPingDb } from '../../../models/metricsPingDb.model';

@Injectable()
export class ServerMetricsPingDbService {
  metricsUrl = 'http://localhost:8000/api/servers';  // URL to web api
  private handleError: HandleError;

  constructor(
    private httpClient: HttpClient,
    httpErrorHandler: HttpErrorHandler) {
    this.handleError = httpErrorHandler.createHandleError('ServerMetricsService');
  }

  getMetricsPingDb(serverId: number): Observable<MetricsPingDb[]> {
    const url = `${this.metricsUrl}/${serverId}/metrics/pingdb/`;
    return this.httpClient.get<MetricsPingDb[]>(url)
      .pipe(
        retry(3),  // retry a failed request up to 3 times
        catchError(this.handleError<MetricsPingDb[]>('getMetricsPingDb'))
      );
  }
}
