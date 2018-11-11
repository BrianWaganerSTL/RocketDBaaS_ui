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
    switch (a.note_color) {
      case 'Primary':
        cssClasses = 'primary';
        break;
      case 'Secondary':
        cssClasses = 'secondary';
        break;
      case 'Success':
        cssClasses = 'success';
        break;
      case 'Danger':
        cssClasses = 'danger';
        break;
      case 'Warning':
        cssClasses = 'warning';
        break;
      case 'Info':
        cssClasses = 'info';
        break;
      case 'Light':
        cssClasses = 'light';
        break;
      case 'Dark':
        cssClasses = 'dark';
        break;
    }
    return cssClasses;
  }
}
