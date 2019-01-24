import { Injectable } from '@angular/core';
import { HandleError, HttpErrorHandler } from '../http-error-handler.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { globals } from '../../environments/environment';
import { catchError, retry } from 'rxjs/operators';
import { ThresholdTest } from '../models/ThresholdTest.model';

@Injectable()
export class ThresholdTestsService {
  private handleError: HandleError;

  constructor(
    private httpClient: HttpClient,
    httpErrorHandler: HttpErrorHandler) {
    this.handleError = httpErrorHandler.createHandleError('ThresholdTestsService');
  }

  getThresholdTests(): Observable<ThresholdTest[]> {
    const url = `${globals.apiUrl}/threshold_tests/`;
    return this.httpClient.get<ThresholdTest[]>(url)
      .pipe(
        retry(3),  // retry a failed request up to 3 times
        catchError(this.handleError('getThresholdTests', []))
      );
  }
}
