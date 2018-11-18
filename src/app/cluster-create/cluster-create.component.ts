import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-cluster-create',
  templateUrl: './cluster-create.component.html',
  styleUrls: ['./cluster-create.component.css']
})
export class ClusterCreateComponent implements OnInit {
  createForm: FormGroup;
  dbmsTypes: string[] = ['PostgreSQL', 'MongoDB'];

  constructor(private fb: FormBuilder) {
  }

  ngOnInit() {
    this.createForm = this.fb.group({
      cluster_name: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(30)]],
      dbms_type: ['', [Validators.required]],
      environment: ['', [Validators.required]],
      servers: this.fb.group({
        server_name: ['']
      })
    });
    this.createForm.valueChanges.subscribe(console.log);
  }

  get f() {
    return this.createForm.controls;
  }

}
