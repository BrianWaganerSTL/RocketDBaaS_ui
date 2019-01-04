import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material';
import { ApplicationAddService } from './application-add.service';
import { Application } from '../../models/application.model';

@Component({
  selector: 'app-application-add',
  templateUrl: './application-add.component.html',
  styleUrls: [ './application-add.component.css' ]
})
export class ApplicationAddComponent implements OnInit {
  application: Application;

  constructor(@Inject(MAT_DIALOG_DATA)
              public data: any,
              private fb: FormBuilder,
              private applicationAddService: ApplicationAddService) {
  }

  ngOnInit() {}

  // addApplication(appl_name): void {
  //   this.application = new Application(application_name = appl_name);
  //   this.application.application_name = appl_name;
  //
  //   this.applicationAddService.addApplication()
  // }
  // addApplication(): void {
  //   const application: Application = this.createForm.value;
  //   this.applicationAddService.addApplication(application)
  //     .subscribe( result => console.log(result));
  // }
}
