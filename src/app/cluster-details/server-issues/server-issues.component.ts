import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { IssueTrackerModel } from '../../models/issueTrackerModel';
import { ServerIssuesService } from './server-issues.service';
import { interval } from 'rxjs';
import { AppComponent } from '../../app.component';
import { GlobalVarsService } from '../../global-vars.service';

@Component({
  selector: 'app-server-issues',
  templateUrl: './server-issues.component.html',
  styleUrls: [ './server-issues.component.css' ],
  providers: [ ServerIssuesService ]
})
export class ServerIssuesComponent implements OnInit, OnDestroy {
  @Input() serverId: number;
  issues: IssueTrackerModel[];
  alive = true;
  refreshTimer;

  constructor(private serverIssuesService: ServerIssuesService,
              private appComponent: AppComponent,
              private globalVarsService: GlobalVarsService) {
  }

  ngOnInit() {
    this.showData();   // Initial Load
    console.log('Initial ServerIssues');
    this.refreshTimer = interval((20 * 1000)) // 20 seconds
      .subscribe((value: number) => {
        if (this.globalVarsService.getGRefreshSw()) {
          console.log('Refresh ServerIssues,  cnt:' + value);
          this.showData();
          if (value === 60) {
            this.refreshTimer.unsubscribe();
          }
        }
      });
  }

  ngOnDestroy() {
    if (this.refreshTimer) {
      this.refreshTimer.unsubscribe();
    }
  }

  showData() {
    console.log('GetIssues(server:' + this.serverId + ')');
    // if ( this.clusterDetailsComponent.tabSelectedName === 'Issues') {
    this.serverIssuesService.getIssues(this.serverId)
      .subscribe(data => this.issues = data);
    // }
  }

  getIcon(a) {
    if (a.closed_sw)
      return 'assets/icons/TuxBlue(Transparent).png';
    else if (a.current_status === 'Critical')
      return 'assets/icons/TuxFire(Transparent).png';
    else
      return 'assets/icons/TuxGreen(Transparent).png';
  }

  getCssClass(a) {
    let cssClasses;
    switch (a.current_status) {
      case 'Normal':
        cssClasses = 'bg-issueNormal';
        break;
      case 'Warning':
        cssClasses = 'bg-issueWarning';
        break;
      case 'Critical':
        cssClasses = 'bg-issueCritical';
        break;
      case 'Blackout':
        cssClasses = 'bg-issueBlackout';
        break;
      case 'Info':
        cssClasses = 'bg-issueInfo';
        break;
      case 'Unknown':
        cssClasses = 'bg-issueUnknown';
        break;
    }
    return cssClasses;
  }
}
