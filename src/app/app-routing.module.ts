import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {PageNotFoundComponent} from './page-not-found/page-not-found.component';

import {ClusterDetailsComponent} from './cluster-details/cluster-details.component';
import {ClustersComponent} from './clusters/clusters.component';

const appRoutes: Routes = [
  {path: '', redirectTo: '/clusters', pathMatch: 'full'},
  {path: 'overview', redirectTo: '/clusters', pathMatch: 'full'},
  {path: 'clusters', component: ClustersComponent, data: {title: 'RocketDBaaS - Overview'}},
  {path: 'clusters/:clusterId', component: ClusterDetailsComponent},
  {path: '**', component: PageNotFoundComponent}
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
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {
}
