import {Component, OnDestroy, OnInit} from '@angular/core';
import {Cluster} from '../models/cluster.model';
import {ClusterDetailsService} from './clusters-details.service';
import {ActivatedRoute, Router} from '@angular/router';
import {interval} from 'rxjs';

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
  tabSelectedName: string;
  refreshTimer: any;

  constructor(private clusterDetailsService: ClusterDetailsService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    this.showCluster();
    // Refresh from database
    this.refreshTimer = interval((15 * 1000))
      .subscribe((value: number) => {
        console.log('Refresh ClusterDetails,  cnt:' + value);
        this.showCluster();
        if (value === 60) {
          this.refreshTimer.unsubscribe();
        }
      });
  }

  ngOnDestroy() {
    this.refreshTimer.unsubscribe();
  }


  showCluster() {
    this.id = parseInt(this.route.snapshot.paramMap.get('clusterId'));
    console.log('clusterId=' + this.id);
    this.clusterDetailsService.getCluster(this.id)
      .subscribe(
        (data: Cluster) => this.cluster = {...data}, // success path
        error => this.error = error // error path
      );
  }

  setTab(value) {
    this.tabSelectedName = value;
  }

  getTab() {
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
    console.log('cssClass=' + cssClass);
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
