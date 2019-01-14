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

  // tab;
  paramsSubscription: Subscription;
  tabSelectedName;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private clusterDetailsComponent: ClusterDetailsComponent) {}

  // resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
  //   console.log('flag1:' + this.route.snapshot.queryParams);
  //   console.log('flag2:' + this.route.snapshot.fragment);
  //   console.log('flag3:' + route.params[ 'tab' ]);
  // }

  // this.router.navigate([Backups], {relativeTo: this.route});

  ngOnInit() {
    // console.log('In Cluster-Tab.Component   (Pre) ClusterId=' + this.clusterDtl.clusterId + ', tab=' + this.clusterDtl.tab );
    // this.clusterDtl = {
    //   clusterId: +this.route.snapshot.paramMap.get('clusterId'),
    //   tab: this.route.snapshot.paramMap.get('tab')
    // };
    // console.log('In Cluster-Tab.Component  (snapshot) ClusterId=' + this.clusterDtl.clusterId + ', tab=' + this.clusterDtl.tab );
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
          // this.showData();
        }
      );
    // console.log('\'In Cluster-Tab.Component (post) ClusterId=' + this.clusterDtl.clusterId + ', tab=' + this.clusterDtl.tab );
    // this.route.queryParams
    //   .subscribe(
    //     (queryParams: Params) => {
    //       this.tab = queryParams[ 'tab' ];
    //       console.log('In ClusterTabsComponent: ============== (INITIAL) tab:' + this.tab + ' ==============');
    //     }
    //   );
    //
    // this.clusterDtl = {
    //   clusterId: this.route.snapshot.params[ 'id' ],
    //   tab: this.route.snapshot.params[ 'tab' ]
    // };
    // console.log('In ClusterTabsComponent: <<<<<< (INITIAL)  ClusterId:' + this.clusterDtl.clusterId + ', tab:' + this.clusterDtl.tab + '  >>>>>>>>>');
    // this.paramsSubscription = this.route.params
    //   .subscribe(
    //     (params: Params) => {
    //       console.log('Params:' + params);
    //       this.clusterDtl.clusterId = params[ 'id' ];
    //       this.clusterDtl.tab = params[ 'tab' ];
    //       console.log('In ClusterTabsComponent: <<<<<<(CHANGES)  ClusterId:' + this.clusterDtl.clusterId + ', tab:' + this.clusterDtl.tab + '  >>>>>>>>>');
    //     }
    //   );
  }

  ngOnDestroy() {
    // this.refreshTimer.unsubscribe();
    // this.paramsSubscription.unsubscribe();
    // this.sub.unsubscribe();
  }
}
