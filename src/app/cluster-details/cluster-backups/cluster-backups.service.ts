import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

import { Backup } from '../../models/backup.model';
import { HandleError, HttpErrorHandler } from '../../http-error-handler.service';
import { globals } from '../../../environments/environment';

@Injectable()
export class ClusterBackupsService {
  private handleError: HandleError;

  constructor(
    private httpClient: HttpClient,
    httpErrorHandler: HttpErrorHandler) {
    this.handleError = httpErrorHandler.createHandleError('ClusterBackupsService');
  }

  getBackups(clusterId: number): Observable<Backup[]> {
    const url = `${globals.apiUrl}/clusters/${clusterId}/backups/`;
    return this.httpClient.get<Backup[]>(url)
      .pipe(
        retry(3),  // retry a failed request up to 3 times
        catchError(this.handleError('getBackups', []))
      );
  }
}
