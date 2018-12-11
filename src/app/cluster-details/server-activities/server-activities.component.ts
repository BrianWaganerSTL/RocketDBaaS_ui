import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ServerActivity } from '../../models/serverActivity.model';
import { ServerActivitiesService } from './server-activities.service';
import { interval } from 'rxjs';

@Component({
  selector: 'app-server-activities',
  templateUrl: './server-activities.component.html',
  styleUrls: [],
  providers: [ ServerActivitiesService ]
})
export class ServerActivitiesComponent implements OnInit, OnDestroy {
  @Input() serverId: number;
  serverActivities: ServerActivity[];
  alive = true;
  refreshTimer;

  constructor(private serverActivitiesService: ServerActivitiesService) {
  }

  ngOnInit() {
    this.showData();
    console.log('Initial ServerActivities'); // Initial Load
    this.refreshTimer = interval((15 * 1000)) // 15 seconds
      .subscribe((value: number) => {
        console.log('Refresh ServerActivities,  cnt:' + value);
        this.showData();
        if (value === 60) {
          this.refreshTimer.unsubscribe();
        }
      });
  }

  ngOnDestroy() {
    this.refreshTimer.unsubscribe();
  }

  showData(): void {
    this.serverActivitiesService.getActivities(this.serverId)
      .subscribe(data => this.serverActivities = data);
  }

  getCssClass(a) {
    let cssClasses;
    switch (a.activity_status) {
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
