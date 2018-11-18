import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatDialog} from '@angular/material';
import {ServerPickerComponent} from './server-picker/server-picker.component';

@Component({
  selector: 'app-cluster-create',
  templateUrl: './cluster-create.component.html',
  styleUrls: ['./cluster-create.component.css']
})
export class ClusterCreateComponent implements OnInit {
  createForm: FormGroup;
  dbmsChoices: string[] = ['PostgreSQL', 'MongoDB'];
  envChoices: string[] = ['SBX', 'DEV', 'QA', 'UAT', 'PRD', 'PPD'];
  dcChoices: string[] = ['CH', 'PA'];

  constructor(private fb: FormBuilder,
              public dialog: MatDialog) {
  }

  ngOnInit() {
    // addServer() {
    //   const server = this.fb.group({
    //     cluster: [],
    //     server_name: [],
    //     server_ip: [],
    //     cpu: [],
    //     mem_gb: [],
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

    this.createForm = this.fb.group({
      cluster_name: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(30)]],
      dbms_type: ['', [Validators.required]],
      // application: applicationModel,
      environment: ['', [Validators.required]],
      requested_cpu: ['', [Validators.required, Validators.min(1), Validators.max(14), Validators.pattern('^[0-9]*$')]],
      requested_mem_gb: ['', [Validators.required, Validators.min(2), Validators.max(36)]],
      requested_db_gb: ['', [Validators.required, Validators.min(0), Validators.max(1024)]],
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
      servers: this.fb.group({
        data_center: [''],
        server_name: ['']
        // ServerConfig
      })
    });
    this.createForm.valueChanges.subscribe(console.log);
  }

  openDialog() {
    const dialogRef = this.dialog.open(ServerPickerComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  // addServer() {
  //   const server = this.fb.group({
  //     cluster: [],
  //     server_name: [],
  //     server_ip: [],
  //     cpu: [],
  //     mem_gb: [],
  //     db_gb: [],
  //     data_center: [],
  //     node_role: [],
  //     server_health: [],
  //     os_version: [],
  //     db_version: [],
  //     pending_restart_sw: [false],
  //     active_sw: [true]
  //   });
  //   this.servers.push(server);
  // }
  // deleteServer(i) {
  //   this.servers.removeAt(i);
  // }
  // get cluster() {
  //   return this.myForm.get('cluster');
  // }
  get f() {
    return this.createForm.controls;
  }
}
