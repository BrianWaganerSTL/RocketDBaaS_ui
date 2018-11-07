import {Component, OnInit} from '@angular/core';
import {Cluster} from '../clusters/cluster.model';
import {ClusterDetailsService} from './clusters-details.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-cluster-details',
  templateUrl: './cluster-details.component.html',
  styleUrls: ['./cluster-details.component.css'],
})
export class ClusterDetailsComponent implements OnInit {
  id: number;
  error: any;
  cluster: Cluster;

  constructor(private clusterDetailsService: ClusterDetailsService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    this.showCluster();
  }

  showCluster() {
    this.id = parseInt(this.route.snapshot.paramMap.get('clusterId'));
    this.clusterDetailsService.getCluster(this.id)
      .subscribe(
        (data: Cluster) => this.cluster = {...data}, // success path
        error => this.error = error // error path
      );
  }

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
}

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
