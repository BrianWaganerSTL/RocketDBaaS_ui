import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material';
import { ServerPickerService } from './server-picker.service';
import { Server } from '../../models/server.model';

@Component({
  selector: 'app-server-picker',
  templateUrl: './server-picker.component.html',
  styleUrls: ['./server-picker.component.css']
})
export class ServerPickerComponent implements OnInit {
  servers: Server[];

  constructor(@Inject(MAT_DIALOG_DATA)
              public data: any,
              private fb: FormBuilder,
              private serverPickerService: ServerPickerService) {
  }

  ngOnInit() {
    this.showPoolServers(this.data);
  }

  showPoolServers(filters): void {
    this.serverPickerService.getPoolServers(filters)
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
