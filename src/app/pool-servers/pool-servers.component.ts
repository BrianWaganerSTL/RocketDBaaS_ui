import { Component, OnDestroy, OnInit } from '@angular/core';
import { PoolServersService } from './pool-servers.service';
import { Server } from '../models/server.model';
import { GlobalVars } from '../global-vars.service';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-pool-servers',
  templateUrl: './pool-servers.component.html',
  styleUrls: ['./pool-servers.component.css'],
  providers: [PoolServersService]
})
export class PoolServersComponent implements OnInit, OnDestroy {
  servers: Server[];
  refreshTimer: Subscription;

  constructor(private poolServersService: PoolServersService,
              private globalVars: GlobalVars) {
  }

  ngOnInit() {
    this.showPoolServers(); // Initial Load
    this.refreshTimer = interval((this.globalVars.getGRefreshRate()))
      .subscribe((value: number) => {
        if (this.globalVars.getGRefreshSw()) {
          console.log('Refresh PoolServers,  cnt:' + value);
          this.showPoolServers();
          if (value === this.globalVars.getGRefreshMaxCnt()) {
            this.refreshTimer.unsubscribe();
            this.globalVars.setGRefreshSw(false);
          }
        }
      });
  }

  showPoolServers(): void {
    this.poolServersService.getPoolServers()
      .subscribe(servers => this.servers = servers);
  }

  ngOnDestroy() {
    if (this.refreshTimer) {
      this.refreshTimer.unsubscribe();
    }
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
