import { Injectable } from '@angular/core';

@Injectable()
export class GlobalVars {
  private gRefreshSw;
  private gRefreshRate = 30 * 1000;  // equals seconds
  private gRefreshMaxCnt = 100;

  constructor() {}

  setGRefreshSw(val) {
    this.gRefreshSw = val;
  }
  getGRefreshSw() {
    return this.gRefreshSw;
  }

  // ========================================
  setGRefreshRate(val) {
    this.gRefreshRate = val;
  }

  getGRefreshRate() {
    return this.gRefreshRate;
  }

  // ========================================
  setGRefreshMaxCnt(val) {
    this.gRefreshMaxCnt = val;
  }

  getGRefreshMaxCnt() {
    return this.gRefreshMaxCnt;
  }
}
