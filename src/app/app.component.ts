import { Component, OnInit } from '@angular/core';
import { globals } from '../environments/environment';
import { GlobalVarsService } from './global-vars.service';

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

  constructor(private globalVarsService: GlobalVarsService) {}

  ngOnInit() {
    this.setRefreshToggle(true);
  }

  setRefreshToggle(swValue) {
    console.log('In setRefreshToggle value=' + swValue);
    this.globalVarsService.setGRefreshSw(swValue);
  }

  // getRefreshToggle() {
  //   this.model.value = this.globalVarsService.getGRefreshSw();
  //   console.log('in getRefreshToggle value=' + this.model.value + this.globalVarsService.getGRefreshSw());
  // }
}
