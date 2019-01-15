import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ServerActivity } from '../../models/serverActivity.model';
import { ServerActivitiesService } from './server-activities.service';
import { interval, Subscription } from 'rxjs';
import { AppComponent } from '../../app.component';
import { GlobalVars } from '../../global-vars.service';

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
  refreshTimer: Subscription;

  constructor(private serverActivitiesService: ServerActivitiesService,
              private appComponent: AppComponent,
              private globalVars: GlobalVars) {
  }

  ngOnInit() {
    this.showData(); // Initial Load
    // Refresh from database
    this.refreshTimer = interval((this.globalVars.getGRefreshRate()))
      .subscribe((value: number) => {
        console.log('refreshToggleModel=' + this.globalVars.getGRefreshSw());
        if (this.globalVars.getGRefreshSw()) {
          console.log('Refresh ServerActivities,  cnt:' + value);
          this.showData();
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
