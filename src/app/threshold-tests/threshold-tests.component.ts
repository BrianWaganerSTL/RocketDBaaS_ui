import { Component, OnDestroy, OnInit } from '@angular/core';
import { GlobalVars } from '../global-vars.service';
import { interval, Subscription } from 'rxjs';
import { ThresholdTestsService } from './threshold-tests.service';
import { ThresholdTest } from '../models/ThresholdTest.model';

@Component({
  selector: 'app-threshold-tests',
  templateUrl: './threshold-tests.component.html',
  providers: [ ThresholdTestsService ]
})
export class ThresholdTestsComponent implements OnInit, OnDestroy {
  thresholdTests: ThresholdTest[];
  refreshTimer: Subscription;

  constructor(private thresholdTestsService: ThresholdTestsService,
              private globalVars: GlobalVars) {
  }

  ngOnInit() {
    this.showThresholdTests(); // Initial Load
    this.refreshTimer = interval((this.globalVars.getGRefreshRate()))
      .subscribe((value: number) => {
        if (this.globalVars.getGRefreshSw()) {
          console.log('Refresh ThresholdTests,  cnt:' + value);
          this.showThresholdTests();
          if (value === this.globalVars.getGRefreshMaxCnt()) {
            this.refreshTimer.unsubscribe();
            this.globalVars.setGRefreshSw(false);
          }
        }
      });
  }

  showThresholdTests(): void {
    this.thresholdTestsService.getThresholdTests()
      .subscribe(ThresholdTests => this.thresholdTests = ThresholdTests);
  }

  ngOnDestroy() {
    if (this.refreshTimer) {
      this.refreshTimer.unsubscribe();
    }
  }
}
