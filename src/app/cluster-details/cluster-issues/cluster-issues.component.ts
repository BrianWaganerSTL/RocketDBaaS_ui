import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { IssueTrackerModel } from '../../models/issueTrackerModel';
import { ClusterIssuesService } from './cluster-issues.service';
import { interval } from 'rxjs';
import { ClusterDetailsComponent } from '../cluster-details.component';

@Component({
  selector: 'app-cluster-issues',
  templateUrl: './cluster-issues.component.html',
  styleUrls: [ './cluster-issues.css' ],
  providers: [ ClusterIssuesService, ClusterDetailsComponent ]
})
export class ClusterIssuesComponent implements OnInit, OnDestroy {
  @Input() serverId: number;
  issues: IssueTrackerModel[];
  alive = true;
  refreshTimer;

  constructor(private clusterIssuesService: ClusterIssuesService,
              private clusterDetailsComponent: ClusterDetailsComponent) {
  }

  ngOnInit() {
    this.showData();
    console.log('Initial ClusterIssues'); // Initial Load
    this.refreshTimer = interval((15 * 1000))
      .subscribe((value: number) => {
        console.log('Refresh ClusterIssues,  cnt:' + value);
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
    console.log('this.clusterDetailsComponent.tabSelectedName=' + this.clusterDetailsComponent.tabSelectedName);
    console.log('this.clusterDetailsComponent.getTab()=' + this.clusterDetailsComponent.getTab());
    // if ( this.clusterDetailsComponent.tabSelectedName === 'Issues') {
    this.clusterIssuesService.getIssues(this.serverId)
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
