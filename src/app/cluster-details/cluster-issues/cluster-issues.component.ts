import {Component, Input, OnInit} from '@angular/core';
import {IssueModel} from '../../models/issue.model';
import {ClusterIssuesService} from './cluster-issues.service';

@Component({
  selector: 'app-cluster-issues',
  templateUrl: './cluster-issues.component.html',
  styleUrls: ['./cluster-issues.css'],
  providers: [ClusterIssuesService]
})
export class ClusterIssuesComponent implements OnInit {
  @Input() serverId: number;
  issues: IssueModel[];

  constructor(private clusterIssuesService: ClusterIssuesService) {
  }

  ngOnInit() {
    this.showIssues();
  }

  showIssues(): void {
    this.clusterIssuesService.getIssues(this.serverId)
      .subscribe(issues => this.issues = issues);
  }

  getCssClass(a) {
    let cssClasses;
    switch (a.note_color) {
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
