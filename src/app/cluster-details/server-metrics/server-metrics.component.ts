import { Component, Input, OnInit } from '@angular/core';
import { ServerMetricsService } from './server-metrics.service';


@Component({
  selector: 'app-server-metrics',
  templateUrl: './server-metrics.component.html',
  styleUrls: [],
  providers: [ ServerMetricsService ]
})
export class ServerMetricsComponent implements OnInit {
  @Input() serverId: number;
  @Input() serverCpus: number;

  constructor() {}

  ngOnInit() { }

  getCssClass(a) {
    let cssClasses;
    switch (a.metric_status) {
      case 'Failed':
        cssClasses = 'bg-MetricCritical';
        break;
      case 'Warning':
        cssClasses = 'bg-MetricWarning';
        break;
      case 'Normal':
        cssClasses = 'bg-MetricNormal';
        break;
    }
    return cssClasses;
  }
}
