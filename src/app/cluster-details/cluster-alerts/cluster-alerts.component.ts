import {Component, Input, OnInit} from '@angular/core';
import {AlertModel} from '../../models/alert.model';
import {ClusterAlertsService} from './cluster-alerts.service';

@Component({
  selector: 'app-cluster-alerts',
  templateUrl: './cluster-alerts.component.html',
  styleUrls: ['./cluster-alerts.component.css'],
  providers: [ClusterAlertsService]
})
export class ClusterAlertsComponent implements OnInit {
  @Input() clusterId: number;
  alerts: AlertModel[];

  constructor(private clusterAlertsService: ClusterAlertsService) {
  }

  ngOnInit() {
    this.showAlerts();
  }

  showAlerts(): void {
    this.clusterAlertsService.getAlerts(this.clusterId)
      .subscribe(alerts => this.alerts = alerts);
  }

  getCssClass(a) {
    let cssClasses;
    switch (a.alert_status) {
      case 'Normal':
        cssClasses = 'bg-alertNormal';
        break;
      case 'Warning':
        cssClasses = 'bg-alertWarning';
        break;
      case 'Critical':
        cssClasses = 'bg-alertCritical';
        break;
      case 'Blackout':
        cssClasses = 'bg-alertBlackout';
        break;
      case 'Info':
        cssClasses = 'bg-alertInfo';
        break;
      case 'Unknown':
        cssClasses = 'bg-alertUnknown';
        break;
    }
    return cssClasses;
  }
}
