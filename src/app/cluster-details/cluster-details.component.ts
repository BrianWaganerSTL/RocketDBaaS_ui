import {Component, OnInit} from '@angular/core';
import {Cluster} from '../clusters/cluster.model';
import {ClusterDetailsService} from './clusters-details.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {switchMap} from 'rxjs/operators';


@Component({
  selector: 'app-cluster-details',
  templateUrl: './cluster-details.component.html',
  styleUrls: ['./cluster-details.component.css'],
  // providers: [ClusterDetailsService],
})
export class ClusterDetailsComponent implements OnInit {
  cluster: Observable<Cluster>;

  constructor(private clusterDetailsService: ClusterDetailsService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    this.cluster = this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.clusterDetailsService.getClusters(+params.get('clusterId')))
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

// getClusters(): void {
//   this.clusterDetailsService.getClusters(this.clusterId)
//     .subscribe(clusters => this.clusters = clusters);
// }

// edit(cluster) {
//   this.editCluster = cluster;
// }

// update() {
//   if (this.editCluster) {
//     this.clusterDetailsService.updateCluster(this.editCluster)
//       .subscribe(cluster => { this.cluster = cluster; });
//   }
// }
}
