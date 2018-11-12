import {Component, Input, OnInit} from '@angular/core';
import {ApplicationContactsService} from './application-contacts.service';
import {ApplicationContact} from '../../models/applicationContact.model';


@Component({
  selector: 'app-application-contacts',
  templateUrl: './application-contacts.component.html',
  styleUrls: ['./application-contacts.component.css'],
  providers: [ApplicationContactsService]
})
export class ApplicationContactsComponent implements OnInit {
  @Input() applicationId: number;
  applicationContacts: ApplicationContact[];

  constructor(private applicationContactsService: ApplicationContactsService) {
  }

  ngOnInit() {
    this.showApplicationContacts();
  }

  showApplicationContacts(): void {
    this.applicationContactsService.getApplicationContacts(this.applicationId)
      .subscribe(applicationContacts => this.applicationContacts = applicationContacts);
  }

  getCssClass(b) {
    let cssClasses;
    switch (b.backup_status) {
      case 'Failed':
        cssClasses = 'bg-BkupFailed';
        break;
      case 'Running':
        cssClasses = 'bg-BkupRunning';
        break;
      case 'Successful':
        cssClasses = 'bg-BkupSuccessful';
        break;
    }
    return cssClasses;
  }
}
