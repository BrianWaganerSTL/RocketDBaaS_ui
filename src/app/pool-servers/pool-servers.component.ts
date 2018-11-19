import {Component, OnInit} from '@angular/core';
import {PoolServer} from '../models/poolServer.model.ts';
import {PoolServersService} from './pool-servers.service';

@Component({
  selector: 'app-pool-servers',
  templateUrl: './pool-servers.component.html',
  styleUrls: ['./pool-servers.component.css'],
  providers: [PoolServersService]
})
export class PoolServersComponent implements OnInit {
  poolServers: PoolServer[];

  constructor(private poolServersService: PoolServersService) {
  }

  ngOnInit() {
    this.showPoolServers();
  }

  showPoolServers(): void {
    this.poolServersService.getPoolServers()
      .subscribe(poolServers => this.poolServers = poolServers);
  }

  getCssClass(a) {
    let cssClasses;
    switch (a.status_in_pool) {
      case 'Available':
        cssClasses = 'bg-PoolServerAvailable';
        break;
      case 'Locked':
        cssClasses = 'bg-PoolServerLocked';
        break;
      case 'Used':
        cssClasses = 'bg-PoolServerUsed';
        break;
    }
    return cssClasses;
  }
}
