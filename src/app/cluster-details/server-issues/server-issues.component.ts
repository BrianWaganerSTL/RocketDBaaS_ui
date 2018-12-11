import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { IssueTrackerModel } from '../../models/issueTrackerModel';
import { ServerIssuesService } from './server-issues.service';
import { interval } from 'rxjs';

@Component({
  selector: 'app-server-issues',
  templateUrl: './server-issues.component.html',
  styleUrls: [],
  providers: [ ServerIssuesService ]
})
export class ServerIssuesComponent implements OnInit, OnDestroy {
  @Input() serverId: number;
  issues: IssueTrackerModel[];
  alive = true;
  refreshTimer;

  constructor(private serverIssuesService: ServerIssuesService) {
  }

  ngOnInit() {
    this.showData();
    console.log('Initial ServerIssues'); // Initial Load
    this.refreshTimer = interval((15 * 1000)) // 15 seconds
      .subscribe((value: number) => {
        console.log('Refresh ServerIssues,  cnt:' + value);
        this.showData();
        if (value === 60) {
          this.refreshTimer.unsubscribe();
        }
      });
  }

  ngOnDestroy() {
    this.refreshTimer.unsubscribe();
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
      return 'assets/icons/Blue%20Tux(Transparent).png';
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
