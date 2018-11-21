import {Component, Input, OnInit} from '@angular/core';
import {ClusterMetricsService} from './cluster-metrics.service';
import {MetricsCpu} from '../../models/metricsCpu.model';

@Component({
  selector: 'app-cluster-metrics',
  templateUrl: './cluster-metrics.component.html',
  styleUrls: ['./cluster-metrics.component.css'],
  providers: [ClusterMetricsService]
})
export class ClusterMetricsComponent implements OnInit {
  @Input() clusterId: number;
  metricsCpus: MetricsCpu[];

  constructor(private clusterMetricsService: ClusterMetricsService) {
  }

  ngOnInit() {
    this.showMetricsCpu();
  }

  showMetricsCpu(): void {
    this.clusterMetricsService.getMetricsCpu(this.clusterId)
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
