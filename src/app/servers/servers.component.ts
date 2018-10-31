import {Component, Input, OnInit} from '@angular/core';
import {ServersService} from './server.service';
import {Server} from './server.model';


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
    this.serverService.getServers()
      .subscribe(servers => this.servers = servers);
  }
}
