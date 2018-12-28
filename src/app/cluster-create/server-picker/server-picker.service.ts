import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

import { HandleError, HttpErrorHandler } from '../../http-error-handler.service';
import { PoolServer } from '../../models/poolServer.model.ts';
import { globals } from '../../../environments/environment';

@Injectable()
export class ServerPickerService {
  private handleError: HandleError;

  constructor(
    private httpClient: HttpClient,
    httpErrorHandler: HttpErrorHandler) {
    this.handleError = httpErrorHandler.createHandleError('ServerPickerService');
  }

  getPoolServers(filters): Observable<PoolServer[]> {
    let params = new HttpParams();
    params = params.append('env', filters.env);
    params = params.append('dbms', filters.dbmsType);
    params = params.append('req_cpu', filters.reqCpu);
    params = params.append('req_ram_gb', filters.reqRamGb);
    params = params.append('req_db_gb', filters.reqDbGb);
    params = params.append('status_in_pool', 'Available');

    const url = `${globals.apiUrl}/poolservers/`;
    console.log(url + '?' + params);
    return this.httpClient.get<PoolServer[]>(url, {params: params})
      .pipe(
        retry(3),  // retry a failed request up to 3 times
        catchError(this.handleError('getPoolServers', []))
      );
  }
}
