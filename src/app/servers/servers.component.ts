import {Component, Input, OnInit} from '@angular/core';
import {ServersService} from './servers.service';
import {Server} from '../models/server.model';


@Component({
  selector: 'app-servers',
  templateUrl: './servers.component.html',
  styleUrls: ['./servers.component.css'],
  providers: [ServersService]
})
export class ServersComponent implements OnInit {
  @Input() clusterId: number;
  servers: Server[];

  constructor(private serverService: ServersService) {
  }

  ngOnInit() {
    this.getServers();
  }

  getServers(): void {
    this.serverService.getServers(this.clusterId)
      .subscribe(servers => this.servers = servers);
  }

  getCssClass(server) {
    let cssClasses;
    switch (server.server_health) {
      case 'ServerConfig':
        cssClasses = 'bg-ServerConfig';
        break;
      case 'ServerUp':
        if (server.node_role === 'Primary') {
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
    console.log('cssFgClass=' + cssClass);
    return cssClass;
  }
}
