import { Component, OnInit } from '@angular/core';
import { globals } from '../environments/environment';
import { GlobalVars } from './global-vars.service';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  dbaasUrl = `${globals.dbaasUrl}`;
  apiUrl = `${globals.apiUrl}`;

  model: any = {
    onColor: 'primary',
    offColor: 'secondary',
    onText: 'Refreshing',
    offText: 'No Worries',
    disabled: false,
    size: 'sm',
    value: true
  };

  constructor(private globalVars: GlobalVars,
              private authService: AuthService) {}

  ngOnInit() {
    this.setRefreshToggle(true);
  }

  setRefreshToggle(swValue) {
    console.log('In setRefreshToggle value=' + swValue);
    this.globalVars.setGRefreshSw(swValue);
  }

  getUser() {
    return (this.authService.loggedInUser.username);
  }
}
