import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ClusterBackupsService } from './cluster-backups.service';
import { Backup } from '../../models/backup.model';
import { interval, Subscription } from 'rxjs';
import { GlobalVars } from '../../global-vars.service';

@Component({
  selector: 'app-cluster-backups',
  templateUrl: './cluster-backups.component.html',
  styleUrls: ['./cluster-backups.component.css'],
  providers: [ClusterBackupsService]
})
export class ClusterBackupsComponent implements OnInit, OnDestroy {
  @Input() clusterId: number;
  backups: Backup[];
  refreshTimer: Subscription;

  constructor(private clusterBackupsService: ClusterBackupsService,
              private globalVars: GlobalVars) {
  }

  ngOnInit() {
    this.showBackups(); // Initial Load
    // Refresh from database
    this.refreshTimer = interval((this.globalVars.getGRefreshRate()))
      .subscribe((value: number) => {
        console.log('refreshToggleModel=' + this.globalVars.getGRefreshSw());
        if (this.globalVars.getGRefreshSw()) {
          console.log('Refresh Backups,  cnt:' + value);
          this.showBackups();
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

  showBackups(): void {
    this.clusterBackupsService.getBackups(this.clusterId)
      .subscribe(backups => this.backups = backups);
  }

  getCssClass(b) {
    let cssClasses;
    switch (b.backup_status) {
      case 'Failed':
        cssClasses = 'bg-BkupFailed';
        break;
      case 'Running':
        cssClasses = 'bg-BkupRunning';
        break;
      case 'Successful':
        cssClasses = 'bg-BkupSuccessful';
        break;
    }
    return cssClasses;
  }
}

//   showBackups() {
//     this.id = parseInt(this.route.snapshot.paramMap.get('clusterId'));
//     this.clusterBackupsService.getBackups(this.id)
//       .subscribe(
//         (data: Backup[]) => this.backups = {...data}, // success path
//         error => this.error = error // error path
//       );
//   }
// }
