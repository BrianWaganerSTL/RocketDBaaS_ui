import { Component, OnInit } from '@angular/core';
import { PoolServersService } from './pool-servers.service';
import { Server } from '../models/server.model';

@Component({
  selector: 'app-pool-servers',
  templateUrl: './pool-servers.component.html',
  styleUrls: ['./pool-servers.component.css'],
  providers: [PoolServersService]
})
export class PoolServersComponent implements OnInit {
  servers: Server[];

  constructor(private poolServersService: PoolServersService) {
  }

  ngOnInit() {
    this.showPoolServers();
  }

  showPoolServers(): void {
    this.poolServersService.getPoolServers()
      .subscribe(servers => this.servers = servers);
  }

  getCssClass(a) {
    let cssClasses;
    switch (a.node_role) {
      case 'Available':
        cssClasses = 'bg-PoolServerAvailable';
        break;
      case 'Locked':
        cssClasses = 'bg-PoolServerLocked';
        break;
    }
    return cssClasses;
  }
}
