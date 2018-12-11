import { Component } from '@angular/core';
import { globals } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  dbaasUrl = `${globals.dbaasUrl}`;
  apiUrl = `${globals.apiUrl}`;
  refreshRate = 30;
  refreshRateChoices = [
    { 'seconds': 15, 'displayRate': '15 secs' },
    { 'seconds': 30, 'displayRate': '30 secs' },
    { 'seconds': 60, 'displayRate': '1 min' },
    { 'seconds': 120, 'displayRate': '2 min' },
  ];

  setRefreshRate(secs) {
    this.refreshRate = secs;
  }
}
