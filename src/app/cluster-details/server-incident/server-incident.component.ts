import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ServerIncidentService } from './server-incident.service';
import { interval, Subscription } from 'rxjs';
import { AppComponent } from '../../app.component';
import { GlobalVars } from '../../global-vars.service';
import { Incident } from '../../models/incident.model';

@Component({
  selector: 'app-server-incidents',
  templateUrl: './server-incident.component.html',
  styleUrls: [ './server-incident.component.css' ],
  providers: [ ServerIncidentService ]
})
export class ServerIncidentComponent implements OnInit, OnDestroy {
  @Input() serverId: number;
  incidents: Incident[];
  alive = true;
  refreshTimer: Subscription;

  constructor(private serverIncidentsService: ServerIncidentService,
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
          console.log('Refresh Incidents,  cnt:' + value);
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

  showData() {
    console.log('GetIncidents(server:' + this.serverId + ')');
    // if ( this.clusterDetailsComponent.tabSelectedName === 'Issues') {
    this.serverIncidentsService.getIncidents(this.serverId)
      .subscribe(data => this.incidents = data);
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
    }
    return cssClasses;
  }
}
