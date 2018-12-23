import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-cluster-tabs',
  templateUrl: './cluster-tabs.component.html',
  styleUrls: [ './cluster-tabs.component.css' ]
})
export class ClusterTabsComponent implements OnInit, OnDestroy {
  clusterDtl: { clusterId: number, tab: number };
  tab;
  paramsSubscription;
  tabSelectedName;

  constructor(private route: ActivatedRoute,
              private router: Router) {}

  // resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
  //   console.log('flag1:' + this.route.snapshot.queryParams);
  //   console.log('flag2:' + this.route.snapshot.fragment);
  //   console.log('flag3:' + route.params[ 'tab' ]);
  // }

  // this.router.navigate([Backups], {relativeTo: this.route});

  ngOnInit() {
    console.log('flag4:' + this.route.snapshot.queryParams);
    console.log('flag5:' + this.route.snapshot.fragment);
    this.route.queryParams
      .subscribe(
        (queryParams: Params) => {
          this.tab = queryParams[ 'tab' ];
          console.log('In ClusterTabsComponent: ============== (INITIAL) tab:' + this.tab + ' ==============');
        }
      );

    this.clusterDtl = {
      clusterId: this.route.snapshot.params[ 'id' ],
      tab: this.route.snapshot.params[ 'tab' ]
    };
    console.log('In ClusterTabsComponent: <<<<<< (INITIAL)  ClusterId:' + this.clusterDtl.clusterId + ', tab:' + this.clusterDtl.tab + '  >>>>>>>>>');
    this.paramsSubscription = this.route.params
      .subscribe(
        (params: Params) => {
          console.log('Params:' + params);
          this.clusterDtl.clusterId = params[ 'id' ];
          this.clusterDtl.tab = params[ 'tab' ];
          console.log('In ClusterTabsComponent: <<<<<<(CHANGES)  ClusterId:' + this.clusterDtl.clusterId + ', tab:' + this.clusterDtl.tab + '  >>>>>>>>>');
        }
      );
  }

  ngOnDestroy() {
    // this.refreshTimer.unsubscribe();
    this.paramsSubscription.unsubscribe();
    // this.sub.unsubscribe();
  }
}
