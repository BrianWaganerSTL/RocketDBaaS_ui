import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {HttpClientModule, HttpClientXsrfModule} from '@angular/common/http';

import {HttpClientInMemoryWebApiModule} from 'angular-in-memory-web-api';
import {InMemoryDataService} from './in-memory-data.service';

import {RequestCache, RequestCacheWithMap} from './request-cache.service';

import {AppComponent} from './app.component';
import {AuthService} from './auth.service';
import {ConfigComponent} from './config/config.component';
import {DownloaderComponent} from './downloader/downloader.component';
import {HeroesComponent} from './heroes/heroes.component';
import {ClustersComponent} from './clusters/clusters.component';
import {HttpErrorHandler} from './http-error-handler.service';
import {MessageService} from './message.service';
import {MessagesComponent} from './messages/messages.component';
import {PackageSearchComponent} from './package-search/package-search.component';
import {UploaderComponent} from './uploader/uploader.component';
import {Router} from '@angular/router';
import {httpInterceptorProviders} from './http-interceptors';
import {AlertModule} from 'ngx-bootstrap';
import {ServersComponent} from './servers/servers.component';
import {ClusterDetailsComponent} from './cluster-details/cluster-details.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {AppRoutingModule} from './app-routing.module';
import {ClusterDetailsService} from './cluster-details/clusters-details.service';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AlertModule.forRoot(),
    HttpClientModule,
    HttpClientXsrfModule.withOptions({
      cookieName: 'My-Xsrf-Cookie',
      headerName: 'My-Xsrf-Header',
    }),

    // The HttpClientInMemoryWebApiModule module intercepts HTTP requests
    // and returns simulated server responses.
    // Remove it when a real server is ready to receive requests.
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, {
        dataEncapsulation: false,
        passThruUnknownUrl: true,
        put204: false // return entity after PUT/update
      }
    ),
    AppRoutingModule
  ],
  declarations: [
    AppComponent,
    ConfigComponent,
    DownloaderComponent,
    HeroesComponent,
    ClustersComponent,
    ClusterDetailsComponent,
    MessagesComponent,
    UploaderComponent,
    PackageSearchComponent,
    ServersComponent,
    PageNotFoundComponent,
  ],
  providers: [
    AuthService,
    HttpErrorHandler,
    MessageService,
    ClusterDetailsService,
    {provide: RequestCache, useClass: RequestCacheWithMap},
    httpInterceptorProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  // Diagnostic only: inspect router configuration
  constructor(router: Router) {
    // Use a custom replacer to display function names in the route configs
    // const replacer = (key, value) => (typeof value === 'function') ? value.name : value;

    // console.log('Routes: ', JSON.stringify(router.config, replacer, 2));
  }
}

