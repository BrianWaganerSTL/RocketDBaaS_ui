import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


import { Observable } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

import { HandleError, HttpErrorHandler } from '../http-error-handler.service';
import { globals } from '../../environments/environment';
import { Incident } from '../models/incident.model';

@Injectable({ providedIn: 'root' })
export class IncidentAlertsService {
  private handleError: HandleError;
  url = `${globals.apiUrl}/incident_alerts/`;

  constructor(
    private httpClient: HttpClient,
    httpErrorHandler: HttpErrorHandler) {
    this.handleError = httpErrorHandler.createHandleError('IncidentAlertsService');
  }

  getIncidentAlerts(): Observable<Incident[]> {
    console.log('In getIncidentAlerts');
    return this.httpClient.get<Incident[]>(this.url)
      .pipe(
        retry(3),  // retry a failed request up to 3 times
        catchError(this.handleError<Incident[]>('getIncidentAlerts'))
      );
  }
}
