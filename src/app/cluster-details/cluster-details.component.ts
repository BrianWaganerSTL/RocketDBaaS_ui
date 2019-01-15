import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Cluster } from '../models/cluster.model';
import { ClusterDetailsService } from './clusters-details.service';
import { ClusterServersService } from './cluster-servers/cluster-servers.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Server } from '../models/server.model';
import { interval, Subscription } from 'rxjs';
import { GlobalVars } from '../global-vars.service';


@Component({
  selector: 'app-cluster-details',
  templateUrl: './cluster-details.component.html',
  styleUrls: [],
  providers: [ ClusterDetailsService ]
})
export class ClusterDetailsComponent implements OnInit, OnDestroy {
  constructor(private clusterDetailsService: ClusterDetailsService,
              private clusterServersService: ClusterServersService,
              private route: ActivatedRoute,
              private router: Router,
              private globalVars: GlobalVars) {
  }

  @Input() tabs;
  clusterDtl: { clusterId: number, tab: string };
  paramsSubscription: Subscription;
  tabSubscription: Subscription;
  refreshTimer: Subscription;
  private id: number;
  error: any;
  cluster: Cluster;
  servers: Server[];
  tabSelectedName: string;
  tab: string;

  ngOnInit() {
    this.clusterDtl = {
      clusterId: +this.route.snapshot.paramMap.get('clusterId'),
      tab: this.route.snapshot.paramMap.get('tab')
    };
    this.paramsSubscription = this.route.params
      .subscribe(
        (params: Params) => {
          this.clusterDtl.clusterId = params[ 'clusterId' ];
          this.clusterDtl.tab = params[ 'tab' ];
          console.log('In Cluster-Details  (OnInit) clusterId' + this.clusterDtl.clusterId + ', tab=' + this.clusterDtl.tab);
          this.showData(); // Initial Load or Tab changes
        }
      );
    this.refreshTimer = interval((this.globalVars.getGRefreshRate()))
      .subscribe((value: number) => {
        console.log('refreshToggleModel=' + this.globalVars.getGRefreshSw());
        if (this.globalVars.getGRefreshSw()) {
          console.log('Refresh Cluster-Details,  cnt:' + value);
          this.showData();
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
    if (this.paramsSubscription) {
      this.paramsSubscription.unsubscribe();
    }
  }


  showData() {
    this.clusterDetailsService.getCluster(this.clusterDtl.clusterId)
      .subscribe(
        (data: Cluster) => {
          this.cluster = { ...data };
          console.log('In Cluster-Details.Component  (ShowData) clusterId=' + this.clusterDtl.clusterId + ', tab=' + this.clusterDtl.tab);
        },
        error => this.error = error// error path
      );
    this.clusterServersService.getServers(this.clusterDtl.clusterId)
      .subscribe(servers => this.servers = servers);
  }

  // onSelect(data: TabDirective): void {
  //   this.tabSelectedName = data.heading;
  //   console.error('In onSelect: ' + this.tabSelectedName);
  //   console.log('this.tabSelectedName=' + this.tabSelectedName);
  // }

  // getTab() {
  //   console.log('return tabSelectedName=' + this.tabSelectedName);
  //   return this.tabSelectedName;
  // }
  goToLink(link: string): void {
    console.log('goToLink:' + link);
    this.router.navigateByUrl(link);
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
