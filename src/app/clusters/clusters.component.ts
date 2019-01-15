import { Component, OnDestroy, OnInit } from '@angular/core';

import { Cluster } from '../models/cluster.model';
import { ClustersService } from './clusters.service';
import { Application } from '../models/application.model';
import { interval, Subscription } from 'rxjs';
import { AppComponent } from '../app.component';
import { GlobalVars } from '../global-vars.service';

@Component({
  selector: 'app-clusters',
  templateUrl: './clusters.component.html',
  providers: [ ClustersService, AppComponent ],
  styleUrls: ['./clusters.component.css']
})
export class ClustersComponent implements OnInit, OnDestroy {
  private clusterNameSearch = '';
  clusters: Cluster[];
  application: Application;
  refreshTimer: Subscription;
  toggle = {};

  constructor(private clustersService: ClustersService,
              private appComponent: AppComponent,
              private globalVars: GlobalVars) {}

  ngOnInit() {
    this.getClusters(); // Initial Load
    this.refreshTimer = interval((this.globalVars.getGRefreshRate()))
      .subscribe((value: number) => {
        if (this.globalVars.getGRefreshSw()) {
          console.log('Refresh Clusters,  cnt:' + value);
          this.getClusters();
          if (value === this.globalVars.getGRefreshMaxCnt()) {
            this.refreshTimer.unsubscribe();
            this.globalVars.setGRefreshSw(false);
          }
        }
      });
  }

  ngOnDestroy() {
    if (this.refreshTimer) {
      this.refreshTimer.unsubscribe();
    }
  }

  getClusters(): void {
    console.log('In ClusterComponents: GetCluster()');
    this.clustersService.getClusters(this.clusterNameSearch)
      .subscribe(clusters => this.clusters = clusters);
  }

  onKey(clusterNmSearch: string) {
    this.clusterNameSearch = clusterNmSearch;
    this.getClusters();
  }

  getFgClass(inValue) {
    let cssClass;
    switch (inValue) {
      case 'ClusterConfig':
        cssClass = 'fg-ClusterConfig';
        break;
      case 'ClusterUp':
        cssClass = 'fg-ClusterUp';
        break;
      case 'ClusterUpWithIssues':
        cssClass = 'fg-ClusterUpWithIssues';
        break;
      case 'ClusterDown':
        cssClass = 'fg-ClusterDown';
        break;
      case 'ClusterOnLineMaint':
        cssClass = 'fg-ClusterOnLineMaint';
        break;
    }
    console.log('cssClass=' + cssClass);
    return cssClass;
  }
}
