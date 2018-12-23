import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

import { ClusterDetailsComponent } from './cluster-details/cluster-details.component';
import { ClustersComponent } from './clusters/clusters.component';
import { PoolServersComponent } from './pool-servers/pool-servers.component';
import { ClusterCreateComponent } from './cluster-create/cluster-create.component';
import { ClusterTabsComponent } from './cluster-details/cluster-tabs/cluster-tabs.component';
import { ClusterTabsResolver } from './cluster-details/cluster-tabs/cluster-tabs-resolver.service';

const appRoutes: Routes = [
  { path: '', redirectTo: '/clusters', pathMatch: 'full' },
  { path: 'overview', redirectTo: '/clusters', pathMatch: 'full' },
  {
    path: 'clusters',
    component: ClustersComponent,
    pathMatch: 'full',
    data: { title: 'RocketDBaaS - Overview' }
  },
  {
    path: 'clusters/:clusterId',
    component: ClusterDetailsComponent,
    // resolver: { clusterId: ClusterResolver },
    children: [
      {
        path: '', redirectTo: 'tab/Restores', pathMatch: 'full'
      },
      {
        path: 'tab/:tab', component: ClusterTabsComponent
      }
    ]
  },
  { path: 'clusters/:clusterId', component: ClusterDetailsComponent },
  { path: 'poolservers', component: PoolServersComponent },
  { path: 'cluster/create', component: ClusterCreateComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      {
        enableTracing: true, // <-- debugging purposes only
      }
    )
  ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {
}
