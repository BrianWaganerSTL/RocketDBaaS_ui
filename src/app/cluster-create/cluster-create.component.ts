import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { ServerPickerComponent } from './server-picker/server-picker.component';
import { ClusterCreateService } from './cluster-create.service';
import { DbmsType } from '../models/dbmsType.model';
import { Environment } from '../models/environment.model';

import { ApplicationClusterServersPOST, Cluster } from '../models/cluster.model';
import { Application } from '../models/application.model';
import { Server } from '../models/server.model';
import { stringify } from 'querystring';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cluster-create',
  templateUrl: './cluster-create.component.html',
  styleUrls: [ './cluster-create.component.css' ]
})
export class ClusterCreateComponent implements OnInit {
  serverFormGroup: FormGroup;
  dbmsTypeChoices: DbmsType[];
  environmentChoices: Environment[];
  applicationChoices: Application[];
  application: Application;
  newAppToggleSw: boolean;
  createDB_cluster: Cluster;
  applicationClusterServersPOST: ApplicationClusterServersPOST;
  server_ids: Int8Array[];
  servers: Server[];

  newAppToggleModel: any = {
    onColor: 'primary',
    offColor: 'secondary',
    onText: 'New',
    offText: 'Existing',
    disabled: false,
    size: 'sm',
    value: false
  };

  alerts: any = [];
  dismissible = true;

  constructor(private fb: FormBuilder,
              public dialog: MatDialog,
              private clusterCreateService: ClusterCreateService,
              private router: Router) {
    this.server_ids = [];
    this.servers = [];
  }

  addServer(pickedServer) {
    console.log('pickedServer:' + stringify(pickedServer));
    pickedServer.node_role = 'PoolServerLocked';
    this.server_ids.push(pickedServer.id);
    this.servers.push(pickedServer);
  }

  get f() {
    return this.serverFormGroup.controls;
  }

  ngOnInit() {
    this.newAppToggleSw = false;
    this.serverFormGroup = this.fb.group({
      requested_cpu: [ '2', [ Validators.required, Validators.min(1), Validators.max(14), Validators.pattern('^[0-9]*$') ] ],
      requested_ram_gb: [ '4', [ Validators.required, Validators.min(2), Validators.max(36) ] ],
      requested_db_gb: [ '10', [ Validators.required, Validators.min(0), Validators.max(1024) ] ],
      // =======================
      application_name: [ '', Validators.required ],
      cluster_name: [ '', [ Validators.required, Validators.minLength(4), Validators.maxLength(30) ] ],
      dbms_type: [ '', [ Validators.required ] ],
      env_name: [ '', [ Validators.required ] ],
      tls_enabled_sw: [ true, [ Validators.required ] ],
      backup_retention_days: [ '14', [ Validators.required, Validators.min(14), Validators.max(35) ] ],
      cluster_health: [ 'ClusterConfig', [ Validators.required ] ],
      active_sw: [ true, [ Validators.required ] ]
    });
    this.serverFormGroup.valueChanges.subscribe(console.log);
    this.getChoices();
  }

  getChoices(): void {
    this.clusterCreateService.getApplications()
      .subscribe(applications => this.applicationChoices = applications);
    this.clusterCreateService.getDbmsTypes()
      .subscribe(dbmsType => this.dbmsTypeChoices = dbmsType);
    this.clusterCreateService.getEnvironments()
      .subscribe(environment => this.environmentChoices = environment);
  }


  openServerDialog() {
    const env = this.serverFormGroup.controls.env_name.value;
    const dbmsType = this.serverFormGroup.controls.dbms_type.value;
    const reqCpu = this.serverFormGroup.controls.requested_cpu.value;
    const reqRamGb = this.serverFormGroup.controls.requested_ram_gb.value;
    const reqDbGb = this.serverFormGroup.controls.requested_db_gb.value;
    const serverDialogRef = this.dialog.open(ServerPickerComponent, {
      data: {
        env: env,
        dbmsType: dbmsType,
        reqCpu: reqCpu,
        reqRamGb: reqRamGb,
        reqDbGb: reqDbGb
      },
    });
    serverDialogRef.afterClosed().subscribe(pickedServer => {
      if (pickedServer) { this.addServer(pickedServer); }
    });
  }

  setNewAppToggle(swValue) {
    console.log('In setRefreshToggle value=' + swValue);
    this.newAppToggleSw = swValue;
  }

  // ==================================================================================================
  addClusterToDB(): void {
    this.applicationClusterServersPOST = {
      application_name: this.serverFormGroup.controls.application_name.value,
      environment_name: this.serverFormGroup.controls.env_name.value,
      dbms_type: this.serverFormGroup.controls.dbms_type.value,
      cluster_name: this.serverFormGroup.controls.cluster_name.value,
      tls_enabled_sw: this.serverFormGroup.controls.tls_enabled_sw.value,
      backup_retention_days: this.serverFormGroup.controls.backup_retention_days.value,
      cluster_health: 'ClusterUp',
      server_ids: this.server_ids,
    };
    console.log('applicationClusterServersPOST: ' + stringify(this.applicationClusterServersPOST));
    this.clusterCreateService.createApplClusterServers(this.applicationClusterServersPOST)
      .subscribe(
        result => {
          console.log('New Cluster: ' + stringify(result));
          this.alerts = [ { type: 'success', msg: '<strong>Well done!</strong> Successfully added the Cluster' } ];
        },
        err => {
          console.warn('Failed to create New Application, Cluster, Servers: Error: %s', stringify(err.error).replace(/%20/g, ' '));
          console.warn('ErrorHeaders:', err);
          this.alerts = [ {
            type: 'danger',
            msg: '<strong>Warning: </strong>' + stringify(err.error).replace(/%20/g, ' ')
          } ];
        }
      );
  }

  onClosed(dismissedAlert: any): void {
    console.log('dismissedAlert:' + stringify(dismissedAlert));
    if (dismissedAlert.valueOf().type === 'success') { this.router.navigateByUrl('/clusters'); }
  }
}
