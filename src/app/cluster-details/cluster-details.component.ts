import { Component, OnDestroy, OnInit } from '@angular/core';
import { Cluster } from '../models/cluster.model';
import { ClusterDetailsService } from './clusters-details.service';
import { ClusterServersService } from './cluster-servers/cluster-servers.service';
import { ActivatedRoute, Router } from '@angular/router';
import { interval } from 'rxjs';
import { Server } from '../models/server.model';
import { TabDirective } from 'ngx-bootstrap';

@Component({
  selector: 'app-cluster-details',
  templateUrl: './cluster-details.component.html',
  styleUrls: ['./cluster-details.component.css'],
  providers: [ClusterDetailsService]
})
export class ClusterDetailsComponent implements OnInit, OnDestroy {
  private id: number;
  error: any;
  cluster: Cluster;
  servers: Server[];
  tabSelectedName: string;
  refreshTimer: any;
  tabLoadTimes: Date[] = [];

  getTimeLoaded(index: number) {
    if (!this.tabLoadTimes[index]) {
      this.tabLoadTimes[index] = new Date();
    }

    return this.tabLoadTimes[index];
  }
  constructor(private clusterDetailsService: ClusterDetailsService,
              private clusterServersService: ClusterServersService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    this.showCluster();
    this.refreshTimer = interval((60 * 1000))
      .subscribe((value: number) => {
        console.log('Refresh ClusterDetails,  cnt:' + value);
        this.showCluster();
        if (value >= 60) {
          this.refreshTimer.unsubscribe();
        }
      });
  }

  ngOnDestroy() {
    this.refreshTimer.unsubscribe();
  }


  showCluster() {
    console.log('ShowCLuster: this.tabSelectedName=' + this.tabSelectedName);
    this.id = parseInt(this.route.snapshot.paramMap.get('clusterId'));
    console.log('clusterId=' + this.id);
    this.clusterDetailsService.getCluster(this.id)
      .subscribe(
        (data: Cluster) => this.cluster = {...data}, // success path
        error => this.error = error // error path
      );
    this.clusterServersService.getServers(this.id)
      .subscribe(servers => this.servers = servers);
  }

  onSelect(data: TabDirective): void {
    this.tabSelectedName = data.heading;
    console.error('In onSelect: ' + this.tabSelectedName);
    console.log('this.tabSelectedName=' + this.tabSelectedName);
  }

  getTab() {
    console.log('return tabSelectedName=' + this.tabSelectedName);
    return this.tabSelectedName;
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
    // console.log('cssClass=' + cssClass);
    return cssClass;
  }
}
  //
  // setTab(feature: string) {
  //   this.tabSelected.emit(feature);
  // }
// this.route.params
//   .subscribe(
//     (params: Params) => {
//       console.log(params);
//       this.clusterId = +params['clusterId'];
//       this.clusterDetailsService.getClusters(this.clusterId);
//     },
//   (error) => console.error(error)
//   );
// this.clusterId = parseInt(this.route.snapshot.paramMap.get('clusterId'));
// this.route.data
//   .subscribe(
//     (data: Data) => {
//       this.cluster = data['cluster'];
//     });
//  this.getClusters();


// edit(cluster) {
//   this.editCluster = cluster;
// }

// update() {
//   if (this.editCluster) {
//     this.clusterDetailsService.updateCluster(this.editCluster)
//       .subscribe(cluster => { this.cluster = cluster; });
//   }
// }
// }
