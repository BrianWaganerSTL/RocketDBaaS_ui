import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Observable} from 'rxjs';
import {catchError, retry} from 'rxjs/operators';
import {HandleError, HttpErrorHandler} from '../../http-error-handler.service';
import {MetricsCpu} from '../../models/metricsCpu.model';

@Injectable()
export class ClusterMetricsService {
  metricsUrl = 'http://localhost:8000/api/clusters';  // URL to web api
  private handleError: HandleError;

  constructor(
    private httpClient: HttpClient,
    httpErrorHandler: HttpErrorHandler) {
    this.handleError = httpErrorHandler.createHandleError('ClusterMetricsService');
  }

  getMetricsCpu(clusterId: number): Observable<MetricsCpu[]> {
    // const url = `${this.activityUrl}/${clusterId}/metrics/cpu/`;
    const url = `${this.metricsUrl}/metrics/cpu/`;
    return this.httpClient.get<MetricsCpu[]>(url)
      .pipe(
        retry(3),  // retry a failed request up to 3 times
        catchError(this.handleError<MetricsCpu[]>('getMetricsCpu'))
      );
  }
}
