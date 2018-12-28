import { Injectable } from '@angular/core';

@Injectable()
export class GlobalVarsService {
  private gRefreshSw;

  constructor() {}

  setGRefreshSw(val) {
    this.gRefreshSw = val;
  }

  getGRefreshSw() {
    return this.gRefreshSw;
  }
}
