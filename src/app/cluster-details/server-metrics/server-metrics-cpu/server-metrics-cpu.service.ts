import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { HandleError, HttpErrorHandler } from '../../../http-error-handler.service';
import { globals } from '../../../../environments/environment';

@Injectable()
export class ServerMetricsCpuService {
  private handleError: HandleError;

  constructor(
    private httpClient: HttpClient,
    httpErrorHandler: HttpErrorHandler) {
    this.handleError = httpErrorHandler.createHandleError('ServerMetricsService');
  }

  getMetricsCpu(serverId: number): Observable<any[]> {
    const url = `${globals.apiUrl}/servers/${serverId}/charts/cpus/`;
    return this.httpClient.get<any[]>(url)
      .pipe(
        retry(3),  // retry a failed request up to 3 times
        catchError(this.handleError<any[]>('getMetricsCpu'))
      );
  }
}
