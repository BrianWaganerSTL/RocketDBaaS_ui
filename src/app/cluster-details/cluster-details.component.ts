import { Component, OnDestroy, OnInit } from '@angular/core';
import { Cluster } from '../models/cluster.model';
import { ClusterDetailsService } from './clusters-details.service';
import { ClusterServersService } from './cluster-servers/cluster-servers.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Server } from '../models/server.model';


@Component({
  selector: 'app-cluster-details',
  templateUrl: './cluster-details.component.html',
  styleUrls: [],
  providers: [ClusterDetailsService]
})
export class ClusterDetailsComponent implements OnInit, OnDestroy {
  constructor(private clusterDetailsService: ClusterDetailsService,
              private clusterServersService: ClusterServersService,
              private route: ActivatedRoute,
              private router: Router) {
  }
  private id: number;
  error: any;
  cluster: Cluster;
  servers: Server[];
  // paramsSubscription: Subscription;
  tabSelectedName: string;
  tab: string;
  // refreshTimer;
  // tabLoadTimes: Date[] = [];
  // links = [ 'Metrics', 'Backups', 'Restores', 'Activities', 'Issues', 'Contacts', 'Notes' ];
  // activeLink = this.links[0];
  // background = '';
  //
  // @ViewChild('tabGroup') tabGroup;
  // ngAfterViewInit() {
  //   console.log(this.tabGroup.selectedIndex);
  //
  // }
  // public tabChanged(tabChangeEvent: MatTabChangeEvent): void {
  //   console.log(tabChangeEvent);
  // }

  // getTimeLoaded(index: number) {
  //   if (!this.tabLoadTimes[index]) {
  //     this.tabLoadTimes[index] = new Date();
  //   }
  //
  //   return this.tabLoadTimes[index];
  // }


  ngOnInit() {
    this.showData();
    // this.refreshTimer = interval((60 * 1000))
    //   .subscribe((value: number) => {
    //     console.log('Refresh ClusterDetails,  cnt:' + value);
    //     this.showData();
    //     if (value >= 60) {
    //       this.refreshTimer.unsubscribe();
    //     }
    //   });
    //
    //   this.paramsSubscription = this.route.data
    //     .subscribe(
    //       (params) => {
    //         this.tabSelectedName = params['tab'];
    //         console.log('<<< tabSelectedName via link: ' + this.tabSelectedName + ' >>>');
    //
    //       }
    //     );
    // console.log('link value for this.links[\'Backups\'] = ' + this.links['Backups']);
    //
    // this.tabGroup.selectedIndex(0);

    // this.sub = this.route.ParamMap.pipe(
    //   switchMap(params => {
    //     // (+) before `params.get()` turns the string into a number
    //     this.selected = +params.get('tab');
    //   })
    // )
    //   .subscribe(keys => {
    //     // Defaults to 0 if no query param provided.
    //     this.tab = keys['tab'] || 'Metrics';
    //   });
  }

  ngOnDestroy() {
    // this.refreshTimer.unsubscribe();
    //this.paramsSubscription.unsubscribe();
    // this.sub.unsubscribe();
  }



  showData() {
    // console.log('ShowCLuster: this.tabSelectedName=' + this.tabSelectedName);
    this.id = parseInt(this.route.snapshot.paramMap.get('clusterId'));
    console.log('clusterId=' + this.id);
    this.tab = this.route.snapshot.paramMap.get('tab');
    console.log('tab=' + this.tab);
    this.clusterDetailsService.getCluster(this.id)
      .subscribe(
        (data: Cluster) => this.cluster = {...data}, // success path
        error => this.error = error // error path
      );
    this.clusterServersService.getServers(this.id)
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
