import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ClusterRestoresService } from './cluster-restores.service';
import { Restore } from '../../models/restore.model';
import { interval, Subscription } from 'rxjs';
import { GlobalVars } from '../../global-vars.service';

@Component({
  selector: 'app-cluster-restores',
  templateUrl: './cluster-restores.component.html',
  styleUrls: ['./cluster-restores.component.css'],
  providers: [ClusterRestoresService]
})
export class ClusterRestoresComponent implements OnInit, OnDestroy {
  @Input() clusterId: number;
  restores: Restore[];
  refreshTimer: Subscription;

  constructor(private clusterRestoresService: ClusterRestoresService,
              private globalVars: GlobalVars) {
  }

  ngOnInit() {
    this.showRestores(); // Initial Load
    // Refresh from database
    this.refreshTimer = interval((this.globalVars.getGRefreshRate()))
      .subscribe((value: number) => {
        console.log('refreshToggleModel=' + this.globalVars.getGRefreshSw());
        if (this.globalVars.getGRefreshSw()) {
          console.log('Refresh Clusters,  cnt:' + value);
          this.showRestores();
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
  }

  showRestores(): void {
    this.clusterRestoresService.getRestores(this.clusterId)
      .subscribe(restores => this.restores = restores);
  }

  getCssClass(r) {
    let cssClasses;
    switch (r.restore_status) {
      case 'Failed':
        cssClasses = 'bg-RestoreFailed';
        break;
      case 'Running':
        cssClasses = 'bg-RestoreRunning';
        break;
      case 'Successful':
        cssClasses = 'bg-RestoreSuccessful';
        break;
    }
    return cssClasses;
  }
}
