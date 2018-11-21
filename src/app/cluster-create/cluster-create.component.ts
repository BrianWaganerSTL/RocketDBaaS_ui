import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatDialog} from '@angular/material';
import {ServerPickerComponent} from './server-picker/server-picker.component';

@Component({
  selector: 'app-cluster-create',
  templateUrl: './cluster-create.component.html',
  styleUrls: ['./cluster-create.component.css']
})
export class ClusterCreateComponent implements OnInit {
  createForm: FormGroup;
  servers: FormArray;
  dbmsChoices: string[] = ['PostgreSQL', 'MongoDB'];
  envChoices: string[] = ['SBX', 'DEV', 'QA', 'UAT', 'PRD', 'PPD'];

  constructor(private fb: FormBuilder,
              public dialog: MatDialog) {
  }

  addServer(poolServer) {
    const server = this.fb.control({
      cluster: [],
      server_name: poolServer.server_name,
      server_ip: poolServer.server_ip,
      cpu: poolServer.cpu,
      ram_gb: poolServer.ram_gb,
      db_gb: poolServer.db_gb,
      data_center: poolServer.data_center,
      node_role: '',
      server_health: 'ServerConfig',
      os_version: '',
      db_version: '',
      pending_restart_sw: [false],
      active_sw: [true]
    });
    this.serverFA.push(server);
    console.log(this.createForm);
    console.log(this.serverFA);
  }

  get f() {
    return this.createForm.controls;
  }

  get serverFA() {
    return this.createForm.get('servers') as FormArray;
  }

  ngOnInit() {
    this.createForm = this.fb.group({
      cluster_name: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(30)]],
      dbms_type: ['PostgreSQL', [Validators.required]],
      // application: applicationModel,
      environment: ['SBX', [Validators.required]],
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
      servers: this.fb.array([])
    });
    this.createForm.valueChanges.subscribe(console.log);
  }

  openDialog() {
    const env = this.createForm.controls.environment.value;
    const dbmsType = this.createForm.controls.dbms_type.value;
    const reqCpu = this.createForm.controls.requested_cpu.value;
    const reqRamGb = this.createForm.controls.requested_ram_gb.value;
    const reqDbGb = this.createForm.controls.requested_db_gb.value;

    console.log('env=' + env);
    const dialogRef = this.dialog.open(ServerPickerComponent, {
      data: {
        env: env,
        dbmsType: dbmsType,
        reqCpu: reqCpu,
        reqRamGb: reqRamGb,
        reqDbGb: reqDbGb
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      this.addServer(result);
    });
  }
  // deleteServer(i) {
  //   this.servers.removeAt(i);
  // }
}
