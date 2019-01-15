import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ApplicationContactsService } from './application-contacts.service';
import { ApplicationContact } from '../../models/applicationContact.model';
import { GlobalVars } from '../../global-vars.service';
import { interval, Subscription } from 'rxjs';


@Component({
  selector: 'app-application-contacts',
  templateUrl: './application-contacts.component.html',
  styleUrls: ['./application-contacts.component.css'],
  providers: [ApplicationContactsService]
})
export class ApplicationContactsComponent implements OnInit, OnDestroy {
  @Input() applicationId: number;
  applicationContacts: ApplicationContact[];
  refreshTimer: Subscription;

  constructor(private applicationContactsService: ApplicationContactsService,
              private globalVars: GlobalVars) {
  }

  ngOnInit() {
    this.showApplicationContacts(); // Initial Load
    // Refresh from database
    this.refreshTimer = interval((this.globalVars.getGRefreshRate()))
      .subscribe((value: number) => {
        console.log('refreshToggleModel=' + this.globalVars.getGRefreshSw());
        if (this.globalVars.getGRefreshSw()) {
          console.log('Refresh ApplicationContacts,  cnt:' + value);
          this.showApplicationContacts();
          if (value === this.globalVars.getGRefreshMaxCnt()) {
            this.refreshTimer.unsubscribe();
            this.globalVars.setGRefreshSw(false);
          }
        }
      });
  }

  ngOnDestroy() {
    if (this.refreshTimer) {
      this.refreshTimer.unsubscribe();
    }
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
