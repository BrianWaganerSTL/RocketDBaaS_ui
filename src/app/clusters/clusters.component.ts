import {Component, OnDestroy, OnInit} from '@angular/core';

import {Cluster} from '../models/cluster.model';
import {ClustersService} from './clusters.service';
import {Application} from '../models/application.model';
import {interval} from 'rxjs';

@Component({
  selector: 'app-clusters',
  templateUrl: './clusters.component.html',
  providers: [ClustersService],
  styleUrls: ['./clusters.component.css']
})
export class ClustersComponent implements OnInit, OnDestroy {
  clusters: Cluster[];
  application: Application;
  editCluster: Cluster; // the cluster currently being edited
  toggle = {};
  refreshTimer: any;

  constructor(private clustersService: ClustersService) {
    this.toggle = {}; // init is required
  }

  ngOnInit() {
    this.getClusters();

    // Refresh from database
    this.refreshTimer = interval((15 * 1000))
      .subscribe((value: number) => {
        console.log('Refresh Overview,  cnt:' + value);
        this.getClusters();
        if (value === 60) {
          this.refreshTimer.unsubscribe();
        }
      });
  }

  ngOnDestroy() {
    this.refreshTimer.unsubscribe();
  }

  getClusters(): void {
    this.clustersService.getClusters()
      .subscribe(clusters => this.clusters = clusters);
  }

  add(cluster_name: string): void {
    this.editCluster = undefined;
    cluster_name = cluster_name.trim();
    if (!cluster_name) {
      return;
    }

    // The server will generate the id for this new cluster
    const newCluster: Cluster = {cluster_name} as Cluster;
    this.clustersService.addCluster(newCluster)
      .subscribe(cluster => this.clusters.push(cluster));
  }

  delete(cluster: Cluster): void {
    this.clusters = this.clusters.filter(c => c !== cluster);
    this.clustersService.deleteCluster(cluster.id).subscribe();
    /*
    // oops ... subscribe() is missing so nothing happens
    this.clusterService.deleteCluster(cluster.id);
    */
  }

  edit(cluster) {
    this.editCluster = cluster;
  }

  search(searchTerm: string) {
    this.editCluster = undefined;
    if (searchTerm) {
      this.clustersService.searchClusters(searchTerm)
        .subscribe(clusters => this.clusters = clusters);
    }
  }

  update() {
    if (this.editCluster) {
      this.clustersService.updateCluster(this.editCluster)
        .subscribe(cluster => {
          // replace the cluster in the clusters list with update from server
          const ix = cluster ? this.clusters.findIndex(c => c.id === cluster.id) : -1;
          if (ix > -1) {
            this.clusters[ix] = cluster;
          }
        });
      this.editCluster = undefined;
    }
  }
}
