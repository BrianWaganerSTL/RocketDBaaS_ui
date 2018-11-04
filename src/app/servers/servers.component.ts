import {Component, Input, OnInit} from '@angular/core';
import {ServersService} from './server.service';
import {Server} from './server.model';
import {until} from 'selenium-webdriver';


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

  getServers(): void {
    this.serverService.getServers(this.clusterId)
      .subscribe(servers => this.servers = servers);
  }
}
