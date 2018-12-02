import { Component, Input, OnInit } from '@angular/core';
import { ClusterServersService } from './cluster-servers.service';
import { Server } from '../../models/server.model';


@Component({
  selector: 'app-cluster-servers',
  templateUrl: './cluster-servers.component.html',
  styleUrls: ['./cluster-servers.component.css'],
  providers: [ClusterServersService]
})
export class ClusterServersComponent implements OnInit {
  @Input() clusterId: number;
  servers: Server[];

  constructor(private clusterServerService: ClusterServersService) {
  }

  ngOnInit() {
    this.showServers();
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
    // console.log('cssFgClass=' + cssClass);
    return cssClass;
  }
}
