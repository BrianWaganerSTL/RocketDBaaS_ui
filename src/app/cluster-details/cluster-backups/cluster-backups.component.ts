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
  // id: number;
  // error: any;

  constructor(private clusterBackupsService: ClusterBackupsService) {
  }

  ngOnInit() {
    this.showBackups();
  }

  // getCssClass(server) {
  //   let cssClasses;
  //   switch (server.server_health) {
  //     case 'ServerConfig':
  //       cssClasses = 'bg-ServerConfig';
  //       break;
  //     case 'ServerUp':
  //       if (server.node_role === 'Primary') {
  //         cssClasses = 'bg-ServerUp-Primary';
  //       } else {
  //         cssClasses = 'bg-ServerUp-Other';
  //       }
  //       break;
  //     case 'ServerUpWithIssues':
  //       cssClasses = 'bg-ServerUpWithIssues';
  //       break;
  //     case 'ServerDown':
  //       cssClasses = 'bg-ServerDown';
  //       break;
  //     case 'ServerOnLineMaint':
  //       cssClasses = 'bg-ServerOnLineMaint';
  //       break;
  //   }
  //   return cssClasses;
  // }

  showBackups(): void {
    this.clusterBackupsService.getBackups(this.clusterId)
      .subscribe(backups => this.backups = backups);
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
