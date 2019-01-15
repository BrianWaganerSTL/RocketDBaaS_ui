import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ClusterServersService } from './cluster-servers.service';
import { Server } from '../../models/server.model';
import { GlobalVars } from '../../global-vars.service';
import { interval, Subscription } from 'rxjs';


@Component({
  selector: 'app-cluster-servers',
  templateUrl: './cluster-servers.component.html',
  styleUrls: [],
  providers: [ClusterServersService]
})
export class ClusterServersComponent implements OnInit, OnDestroy {
  @Input() clusterId: number;
  servers: Server[];
  refreshTimer: Subscription;

  constructor(private clusterServerService: ClusterServersService,
              private globalVars: GlobalVars) {
  }

  ngOnInit() {
    this.showServers(); // Initial Load
    // Refresh from database
    this.refreshTimer = interval((this.globalVars.getGRefreshRate()))
      .subscribe((value: number) => {
        console.log('refreshToggleModel=' + this.globalVars.getGRefreshSw());
        if (this.globalVars.getGRefreshSw()) {
          console.log('Refresh Servers,  cnt:' + value);
          this.showServers();
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

  showServers(): void {
    this.clusterServerService.getServers(this.clusterId)
      .subscribe(servers => this.servers = servers);
  }

  getCssClass(a) {
    let cssClasses;
    switch (a.server_health) {
      case 'ServerConfig':
        cssClasses = 'bg-ServerConfig';
        break;
      case 'ServerUp':
        if (a.node_role === 'Primary') {
          cssClasses = 'bg-ServerUp-Primary';
        } else {
          cssClasses = 'bg-ServerUp-Other';
        }
        break;
      case 'ServerUpWithIssues':
        cssClasses = 'bg-ServerUpWithIssues';
        break;
      case 'ServerDown':
        cssClasses = 'bg-ServerDown';
        break;
      case 'ServerOnLineMaint':
        cssClasses = 'bg-ServerOnLineMaint';
        break;
    }
    return cssClasses;
  }

  getFgClass2(inValue) {
    let cssClass;
    switch (inValue) {
      case 'ServerConfig':
        cssClass = 'fg-ServerConfig';
        break;
      case 'ServerUp':
        cssClass = 'fg-ServerUp';
        break;
      case 'ServerUpWithIssues':
        cssClass = 'fg-ServerUpWithIssues';
        break;
      case 'ServerDown':
        cssClass = 'fg-ServerDown';
        break;
      case 'ServerOnLineMaint':
        cssClass = 'fg-ServerOnLineMaint';
        break;
    }
    return cssClass;
  }
}
