import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
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
  pickServerForm: FormGroup;
  dcChoices: string[] = ['CH', 'PA'];

  constructor(@Inject(MAT_DIALOG_DATA)
              public data: any,
              private fb: FormBuilder,
              private serverPickerService: ServerPickerService) {
  }

  ngOnInit() {
    this.showPoolServers(this.data);

    // this.pickServerForm = this.fb.group({
    //   cluster_name: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(30)]],
    //   dbms_type: ['', [Validators.required]],
    //   // application: applicationModel,
    //   environment: ['', [Validators.required]],
    //   requested_cpu: ['', [Validators.required, Validators.min(1), Validators.max(14), Validators.pattern('^[0-9]*$')]],
    //   requested_ram_gb: ['', [Validators.required, Validators.min(2), Validators.max(36)]],
    //   requested_db_gb: ['', [Validators.required, Validators.min(0), Validators.max(1024)]],
    //   // read_write_port: serverPort,
    //   // read_only_port: serverPort,
    //   tls_enabled_sw: [true, [Validators.required]],
    //   backup_retention_days: ['14', [Validators.required, Validators.min(1), Validators.max(35)]],
    //   cluster_health: ['ClusterConfig', [Validators.required]],
    //   active_sw: [true, [Validators.required]],
    //   eff_dttm: [],
    //   exp_dttm: [],
    //   created_dttm: [],
    //   updated_dttm: [],
    //   servers: this.fb.group({
    //     data_center: [''],
    //     server_name: ['']
    //     // ServerConfig
    //   })
    // });
    // this.pickServerForm.valueChanges.subscribe(console.log);
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

  // get f() {
  //   return this.pickServerForm.controls;
  // }
  // addServer() {
  //   const server = this.fb.group({
  //     cluster: [],
  //     server_name: [],
  //     server_ip: [],
  //     cpu: [],
  //     ram_gb: [],
  //     db_gb: [],
  //     data_center: [],
  //     node_role: [],
  //     server_health: [],
  //     os_version: [],
  //     db_version: [],
  //     pending_restart_sw: [false],
  //     active_sw: [true]
  //   });
  //   this.server.push(server);
  // }
}
