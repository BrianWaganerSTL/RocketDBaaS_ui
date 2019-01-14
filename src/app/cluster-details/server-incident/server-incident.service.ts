import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { HandleError, HttpErrorHandler } from '../../http-error-handler.service';
import { globals } from '../../../environments/environment';
import { Incident } from '../../models/incident.model';

@Injectable()
export class ServerIncidentService {
  private handleError: HandleError;

  constructor(
    private httpClient: HttpClient,
    httpErrorHandler: HttpErrorHandler) {
    this.handleError = httpErrorHandler.createHandleError('ServerIncidentService');
  }

  getIncidents(serverId: number): Observable<Incident[]> {
    const url = `${globals.apiUrl}/servers/${serverId}/incidents/`;
    return this.httpClient.get<Incident[]>(url)
      .pipe(
        retry(3),  // retry a failed request up to 3 times
        catchError(this.handleError<Incident[]>('getIncidents'))
      );
  }
}
