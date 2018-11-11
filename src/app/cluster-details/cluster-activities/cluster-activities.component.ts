import {Component, Input, OnInit} from '@angular/core';
import {ServerActivity} from '../../models/serverActivity.model';
import {ClusterActivitiesService} from './cluster-activities.service';

@Component({
  selector: 'app-cluster-activities',
  templateUrl: './cluster-activities.component.html',
  styleUrls: ['./cluster-activities.component.css'],
  providers: [ClusterActivitiesService]
})
export class ClusterActivitiesComponent implements OnInit {
  @Input() clusterId: number;
  serverActivities: ServerActivity[];

  constructor(private clusterActivitiesService: ClusterActivitiesService) {
  }

  ngOnInit() {
    this.showActivities();
  }

  showActivities(): void {
    this.clusterActivitiesService.getActivities(this.clusterId)
      .subscribe(serverActivities => this.serverActivities = serverActivities);
  }

  getCssClass(a) {
    let cssClasses;
    switch (a.backup_status) {
      case 'Failed':
        cssClasses = 'bg-ActivityFailed';
        break;
      case 'Processing':
        cssClasses = 'bg-ActivityProcessing';
        break;
      case 'Successful':
        cssClasses = 'bg-ActivitySuccessful';
        break;
    }
    return cssClasses;
  }
}
