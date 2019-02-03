import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { AppComponent } from '../app.component';
import { GlobalVars } from '../global-vars.service';
import { Incident } from '../models/incident.model';
import { IncidentAlertsService } from './incident-alerts.service';
import { MatAccordionDisplayMode } from '@angular/material';

@Component({
  selector: 'app-incident-alerts',
  templateUrl: './incident-alerts.component.html',
  styleUrls: [ './incident-alerts.component.css' ]
})

export class IncidentAlertsComponent implements OnInit, OnDestroy {
  @Input() displayMode: MatAccordionDisplayMode;
  @Input() collapsedHeight: string;
  incidentAlerts: Incident[];
  refreshTimer: Subscription;
  warning_count = 0;
  critical_count = 0;
  expansion_header_height = '20px';


  constructor(private incidentAlertsService: IncidentAlertsService,
              private appComponent: AppComponent,
              private globalVars: GlobalVars) {

  }

  ngOnInit() {
    this.getIncidentAlerts(); // Initial Load
    this.refreshTimer = interval((this.globalVars.getGRefreshRate()))
      .subscribe((value: number) => {
        if (this.globalVars.getGRefreshSw()) {
          console.log('Refresh IncidentAlerts,  cnt:' + value);
          this.getIncidentAlerts();
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

  getIncidentAlerts(): void {
    console.log('In IncidentAlertsComponents: GetIncidentAlerts()');
    this.incidentAlertsService.getIncidentAlerts()
      .subscribe(incidentAlerts => {
        this.incidentAlerts = incidentAlerts;
        this.summarizeAlerts(this.incidentAlerts);
      });
  }

  summarizeAlerts(incidentAlerts): void {
    this.warning_count = 0;
    this.critical_count = 0;
    for (const ia of incidentAlerts) {
      if (ia.current_status === 'Warning') {
        this.warning_count += 1;
      }
      if (ia.current_status === 'Critical') {
        this.critical_count += 1;
      }
      console.log('Warnings: ' + this.warning_count + ' : Critical: ' + this.critical_count);
    }
  }

  getHeaderCssClass() {
    if (this.critical_count > 0) { return 'bg-HeaderIncidentCritical'; }
    if (this.warning_count > 0) { return 'bg-HeaderIncidentWarning'; }
  }

  getCssClassText(statusType, count) {
    let cssClasses;
    switch (statusType) {
      case 'Warning':
        if (count > 0) { cssClasses = 'text-IncidentWarning'; }
        break;
      case 'Critical':
        if (count > 0) { cssClasses = 'text-IncidentCritical'; }
        break;
    }
    return cssClasses;
  }

  getCssClass(a) {
    let cssClasses;
    switch (a.current_status) {
      case 'Normal':
        cssClasses = 'bg-incidentNormal';
        break;
      case 'Warning':
        cssClasses = 'bg-incidentWarning';
        break;
      case 'Critical':
        cssClasses = 'bg-incidentCritical';
        break;
      case 'Blackout':
        cssClasses = 'bg-incidentBlackout';
        break;
      case 'Info':
        cssClasses = 'bg-incidentInfo';
        break;
      case 'Unknown':
        cssClasses = 'bg-incidentUnknown';
        break;
      case 'Watching':
        cssClasses = 'bg-incidentWatching';
        break;
    }
    return cssClasses;
  }
}
