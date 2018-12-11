import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClientXsrfModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './in-memory-data.service';
import { RequestCache, RequestCacheWithMap } from './request-cache.service';
import { AppComponent } from './app.component';
import { AuthService } from './auth.service';
import { ClustersComponent } from './clusters/clusters.component';
import { HttpErrorHandler } from './http-error-handler.service';
import { MessageService } from './message.service';
import { MessagesComponent } from './messages/messages.component';
import { PackageSearchComponent } from './package-search/package-search.component';
import { Router } from '@angular/router';
import { httpInterceptorProviders } from './http-interceptors';
import { ModalModule, TabsModule } from 'ngx-bootstrap';
import { ServersComponent } from './clusters/servers/servers.component';
import { ClusterDetailsComponent } from './cluster-details/cluster-details.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AppRoutingModule } from './app-routing.module';
import { ClusterDetailsService } from './cluster-details/clusters-details.service';
import { ClusterBackupsComponent } from './cluster-details/cluster-backups/cluster-backups.component';
import { ClusterBackupsService } from './cluster-details/cluster-backups/cluster-backups.service';
import { ClusterNotesComponent } from './cluster-details/cluster-notes/cluster-notes.component';
import { ServerMetricsComponent } from './cluster-details/server-metrics/server-metrics.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ClusterRestoresComponent } from './cluster-details/cluster-restores/cluster-restores.component';
import { ClusterRestoresService } from './cluster-details/cluster-restores/cluster-restores.service';
import { ServerIssuesComponent } from './cluster-details/server-issues/server-issues.component';
import { ServerActivitiesComponent } from './cluster-details/server-activities/server-activities.component';
import { ServerActivitiesService } from './cluster-details/server-activities/server-activities.service';
import { ServerIssuesService } from './cluster-details/server-issues/server-issues.service';
import { ClusterNotesService } from './cluster-details/cluster-notes/cluster-notes.service';
import { ApplicationContactsService } from './cluster-details/application-contacts/application-contacts.service';
import { ApplicationContactsComponent } from './cluster-details/application-contacts/application-contacts.component';
import { ClusterServersComponent } from './cluster-details/cluster-servers/cluster-servers.component';
import { ClusterServersService } from './cluster-details/cluster-servers/cluster-servers.service';
import { PoolServersComponent } from './pool-servers/pool-servers.component';
import { ClusterCreateComponent } from './cluster-create/cluster-create.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatCheckboxModule, MatChipsModule, MatDialogModule, MatInputModule, MatSelectModule } from '@angular/material';
import { ServerPickerComponent } from './cluster-create/server-picker/server-picker.component';
import { ServerPickerService } from './cluster-create/server-picker/server-picker.service';
import { ServerMetricsCpuComponent } from './cluster-details/server-metrics/server-metrics-cpu/server-metrics-cpu.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ServerMetricsMountPointsComponent } from './cluster-details/server-metrics/server-metrics-mount-points/server-metrics-mount-points.component';
import { ServerMetricsPingDbComponent } from './cluster-details/server-metrics/server-metrics-ping-db/server-metrics-ping-db.component';
import { ServerMetricsPingServerComponent } from './cluster-details/server-metrics/server-metrics-ping-server/server-metrics-ping-server.component';
import { ServerMetricsLoadComponent } from './cluster-details/server-metrics/server-metrics-load/server-metrics-load.component';


@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    HttpClientXsrfModule.withOptions({
      cookieName: 'My-Xsrf-Cookie',
      headerName: 'My-Xsrf-Header',
    }),
    NgxChartsModule,
    BrowserAnimationsModule,

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
    AppRoutingModule,
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    ModalModule.forRoot(),
    //
    ReactiveFormsModule,
    BrowserAnimationsModule,
    //
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDialogModule,
  ],
  declarations: [
    AppComponent,
    ClustersComponent,
    ClusterDetailsComponent,
    MessagesComponent,
    PackageSearchComponent,
    ServersComponent,
    PageNotFoundComponent,
    ClusterBackupsComponent,
    ClusterRestoresComponent,
    ServerActivitiesComponent,
    ServerIssuesComponent,
    ApplicationContactsComponent,
    ClusterServersComponent,
    ServerMetricsComponent,
    ClusterNotesComponent,
    PoolServersComponent,
    ClusterCreateComponent,
    ServerPickerComponent,
    ServerMetricsCpuComponent,
    ServerMetricsMountPointsComponent,
    ServerMetricsLoadComponent,
    ServerMetricsPingServerComponent,
    ServerMetricsPingDbComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    AuthService,
    HttpErrorHandler,
    MessageService,
    ClusterDetailsService,
    ClusterBackupsService,
    ClusterRestoresService,
    ServerActivitiesService,
    ServerIssuesService,
    ClusterNotesService,
    ClusterServersService,
    ApplicationContactsService,
    ServerPickerService,
    {provide: RequestCache, useClass: RequestCacheWithMap},
    httpInterceptorProviders
  ],
  bootstrap: [AppComponent],
  entryComponents: [ServerPickerComponent]
})
export class AppModule {
  // Diagnostic only: inspect router configuration
  constructor(router: Router) {
    // Use a custom replacer to display function names in the route configs
    // const replacer = (key, value) => (typeof value === 'function') ? value.name : value;

    // console.log('Routes: ', JSON.stringify(router.config, replacer, 2));
  }
}

