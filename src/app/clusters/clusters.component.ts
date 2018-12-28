import { Component, OnDestroy, OnInit } from '@angular/core';

import { Cluster } from '../models/cluster.model';
import { ClustersService } from './clusters.service';
import { Application } from '../models/application.model';
import { interval } from 'rxjs';
import { AppComponent } from '../app.component';
import { GlobalVarsService } from '../global-vars.service';

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
  refreshTimer: any;
  toggle = {};

  constructor(private clustersService: ClustersService,
              private appComponent: AppComponent,
              private globalVarsService: GlobalVarsService) {}

  ngOnInit() {
    this.getClusters(); // Initial Load
    // Refresh from database
    this.refreshTimer = interval((15 * 1000))
      .subscribe((value: number) => {
        console.log('refreshToggleModel=' + this.globalVarsService.getGRefreshSw());
        if (this.globalVarsService.getGRefreshSw()) {
          console.log('Refresh Overview,  cnt:' + value);
          this.getClusters();
          if (value === 60) {
            this.refreshTimer.unsubscribe();
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
