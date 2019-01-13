import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { ServerPickerComponent } from './server-picker/server-picker.component';
import { ClusterCreateService } from './cluster-create.service';
import { DbmsType } from '../models/dbmsType.model';
import { Environment } from '../models/environment.model';
import { stringify } from 'querystring';
import { ApplicationClusterServersPOST, Cluster } from '../models/cluster.model';
import { Application } from '../models/application.model';


@Component({
  selector: 'app-cluster-create',
  templateUrl: './cluster-create.component.html',
  styleUrls: [ './cluster-create.component.css' ]
})
export class ClusterCreateComponent implements OnInit {
  serverFormGroup: FormGroup;
  servers: FormArray;
  dbmsTypeChoices: DbmsType[];
  environmentChoices: Environment[];
  applicationChoices: Application[];
  application: Application;
  newAppToggleSw: boolean;
  createDB_cluster: Cluster;
  applicationClusterServersPOST: ApplicationClusterServersPOST;

  newAppToggleModel: any = {
    onColor: 'primary',
    offColor: 'secondary',
    onText: 'New',
    offText: 'Existing',
    disabled: false,
    size: 'sm',
    value: false
  };

  constructor(private fb: FormBuilder,
              public dialog: MatDialog,
              private clusterCreateService: ClusterCreateService) {
  }

  addServer(pickedServer) {
    pickedServer.node_role = 'PoolServerLocked';
    const server = this.fb.control({
      cluster: [],
      server_name: pickedServer.server_name,
      server_ip: pickedServer.server_ip,
      cpu: pickedServer.cpu,
      ram_gb: pickedServer.ram_gb,
      db_gb: pickedServer.db_gb,
      environment: pickedServer.environment,
      datacenter: pickedServer.datacenter,
      node_role: '',
      server_health: 'ServerConfig',
      os_version: '',
      db_version: '',
      pending_restart_sw: [ false ],
      active_sw: [ true ]
    });
    this.serverFA.push(server);
    console.log(this.serverFormGroup);
    console.log(this.serverFA);
  }

  get f() {
    return this.serverFormGroup.controls;
  }

  get serverFA() {
    return this.serverFormGroup.get('servers') as FormArray;
  }

  ngOnInit() {
    this.newAppToggleSw = false;
    this.serverFormGroup = this.fb.group({
      requested_cpu: [ '2', [ Validators.required, Validators.min(1), Validators.max(14), Validators.pattern('^[0-9]*$') ] ],
      requested_ram_gb: [ '4', [ Validators.required, Validators.min(2), Validators.max(36) ] ],
      requested_db_gb: [ '10', [ Validators.required, Validators.min(0), Validators.max(1024) ] ],
      // =======================
      application: [],
      application_name: [ '', Validators.required ],
      cluster_name: [ '', [ Validators.required, Validators.minLength(4), Validators.maxLength(30) ] ],
      dbms_type: [ '', [ Validators.required ] ],
      env_name: [ '', [ Validators.required ] ],
      tls_enabled_sw: [ true, [ Validators.required ] ],
      backup_retention_days: [ '14', [ Validators.required, Validators.min(14), Validators.max(35) ] ],
      cluster_health: [ 'ClusterConfig', [ Validators.required ] ],
      active_sw: [ true, [ Validators.required ] ],
      servers: this.fb.array([]),
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
    console.log('env=' + env);
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
      if (pickedServer) {
        console.log('Dialog result: ' + stringify(pickedServer));
        this.addServer(pickedServer);
      }
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
      environment_id: this.serverFormGroup.controls.env_name.value,
      dbms_type: this.serverFormGroup.controls.dbms_type.value,
      cluster_name: this.serverFormGroup.controls.cluster_name.value,
      tls_enabled_sw: this.serverFormGroup.controls.tls_enabled_sw.value,
      backup_retention_days: this.serverFormGroup.controls.backup_retention_days.value,
      cluster_health: 'ClusterConfig'
    };
    console.log('applicationClusterServersPOST: ' + stringify(this.applicationClusterServersPOST));
    this.clusterCreateService.createApplClusterServers(this.applicationClusterServersPOST)
      .subscribe(
        result => {
          console.log('New Cluster: ' + stringify(result));
          this.createDB_cluster = result;
        },
        error => { console.error('Failed to create New Application/Cluster/Servers: ' + error); }
      );
  }
}
