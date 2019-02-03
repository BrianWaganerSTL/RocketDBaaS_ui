import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ClusterDetailsComponent } from '../cluster-details.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cluster-tabs',
  templateUrl: './cluster-tabs.component.html',
  styleUrls: [ './cluster-tabs.component.css' ],
  providers: [ ClusterDetailsComponent ]
})
export class ClusterTabsComponent implements OnInit, OnDestroy {
  @Input() clusterDtl: { clusterId: number, tab: string };
  paramsSubscription: Subscription;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private clusterDetailsComponent: ClusterDetailsComponent) {}

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
          console.log('In Cluster-Tab.Component  (subscribe) clusterId=' + this.clusterDtl.clusterId + ', tab=' + this.clusterDtl.tab +
            ',clusterDetailsComponent.tab=' + this.clusterDetailsComponent.tab);
        }
      );
  }

  ngOnDestroy() {
    // this.refreshTimer.unsubscribe();
    // this.paramsSubscription.unsubscribe();
    // this.sub.unsubscribe();
  }
}
