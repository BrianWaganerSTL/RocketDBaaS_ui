import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { ServerPickerComponent } from './server-picker/server-picker.component';
import { ClusterCreateService } from './cluster-create.service';
import { DbmsType } from '../models/dbmsType.model';
import { Environment } from '../models/environment.model';
import { stringify } from 'querystring';
import { Cluster } from '../models/cluster.model';
import { Application } from '../models/application.model';
import { ApplicationAddComponent } from './application-create/application-add.component';

@Component({
  selector: 'app-cluster-create',
  templateUrl: './cluster-create.component.html',
  styleUrls: ['./cluster-create.component.css']
})
export class ClusterCreateComponent implements OnInit {
  serverFormGroup: FormGroup;
  // appNameFormGroup = FormGroup;
  servers: FormArray;
  dbmsTypeChoices: DbmsType[];
  environmentChoices: Environment[];
  applicationChoices: Application[];
  application: Application;

  // envChoices: string[] = [ 'Sbx', 'Dev', 'QA', 'UAT', 'Prod' ];

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
      pending_restart_sw: [false],
      active_sw: [true]
    });
    this.serverFA.push(server);
    console.log(this.serverFormGroup);
    console.log(this.serverFA);
  }

  // addApplication(application) {
  //   const application_name = this.fb.control({
  //     cluster: [],
  //     application_name: pickedServer.server_name,
  //     server_ip: pickedServer.server_ip,
  //     cpu: pickedServer.cpu,
  //     ram_gb: pickedServer.ram_gb,
  //     db_gb: pickedServer.db_gb,
  //     environment: pickedServer.environment,
  //     datacenter: pickedServer.datacenter,
  //     node_role: '',
  //     server_health: 'ServerConfig',
  //     os_version: '',
  //     db_version: '',
  //     pending_restart_sw: [false],
  //     active_sw: [true]
  //   });
  //   this.serverFA.push(server);
  //   console.log(this.serverFormGroup);
  //   console.log(this.serverFA);
  // }

  get f() {
    return this.serverFormGroup.controls;
  }

  get serverFA() {
    return this.serverFormGroup.get('servers') as FormArray;
  }

  ngOnInit() {
    this.serverFormGroup = this.fb.group({
      application_name: [ '', Validators.required ],
      cluster_name: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(30)]],
      dbms_type: [ '', [ Validators.required ] ],
      environment: [ '', [ Validators.required ] ],
      requested_cpu: ['2', [Validators.required, Validators.min(1), Validators.max(14), Validators.pattern('^[0-9]*$')]],
      requested_ram_gb: ['4', [Validators.required, Validators.min(2), Validators.max(36)]],
      requested_db_gb: ['10', [Validators.required, Validators.min(0), Validators.max(1024)]],
      // read_write_port: serverPort,
      // read_only_port: serverPort,
      tls_enabled_sw: [true, [Validators.required]],
      backup_retention_days: ['14', [Validators.required, Validators.min(1), Validators.max(35)]],
      cluster_health: ['ClusterConfig', [Validators.required]],
      active_sw: [true, [Validators.required]],
      eff_dttm: [],
      exp_dttm: [],
      created_dttm: [],
      updated_dttm: [],
      servers: this.fb.array([]),
      new_application_name: [ '' ],
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

  addClusterToDB(): void {
    const cluster: Cluster = this.serverFormGroup.value;
    this.clusterCreateService.addClusterToDB(cluster)
      .subscribe(result => console.log(result));
  }

  openServerDialog() {
    const env = this.serverFormGroup.controls.environment.value;
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

  openApplicationDialog(): void {
    const dialogRef = this.dialog.open(ApplicationAddComponent, {
      width: '250px'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Dialog result: ' + stringify(result));
        // console.log('\'this.fb.control({application})=' + this.fb.control({application}));
      }
    });
  }


  // deleteServer(i) {
  //   this.servers.removeAt(i);
  // }
}
