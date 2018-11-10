import {Component, Input, OnInit} from '@angular/core';
import {ClusterBackupsService} from './cluster-backups.service';
import {Backup} from '../../models/backup.model';

@Component({
  selector: 'app-cluster-backups',
  templateUrl: './cluster-backups.component.html',
  styleUrls: ['./cluster-backups.component.css'],
  providers: [ClusterBackupsService]
})
export class ClusterBackupsComponent implements OnInit {
  @Input() clusterId: number;
  backups: Backup[];

  constructor(private clusterBackupsService: ClusterBackupsService) {
  }

  ngOnInit() {
    this.showBackups();
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
