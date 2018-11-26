import {Component, Input, OnInit} from '@angular/core';
import {ServerMetricsService} from './server-metrics.service';
import {MetricsCpu} from '../../models/metricsCpu.model';


@Component({
  selector: 'app-server-metrics',
  templateUrl: './server-metrics.component.html',
  styleUrls: ['./server-metrics.component.css'],
  providers: [ServerMetricsService]
})
export class ServerMetricsComponent implements OnInit {
  @Input() serverId: number;
  metricsCpus: MetricsCpu[];

  constructor(private serverMetricsService: ServerMetricsService) {
  }

  ngOnInit() {
    this.showMetricsCpu();
  }

  showMetricsCpu(): void {
    console.log('Server: ' + this.serverId);
    this.serverMetricsService.getMetricsCpu(this.serverId)
      .subscribe(metricsCpus => this.metricsCpus = metricsCpus);
  }

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
