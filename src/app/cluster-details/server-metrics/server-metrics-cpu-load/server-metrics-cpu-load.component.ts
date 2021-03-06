import { Component, Input, OnInit } from '@angular/core';

import { ServerMetricsCpuLoadService } from './server-metrics-cpu-load.service';
import { DataPoint } from '../../../models/graphs.obj';
import { MetricsLoad } from '../../../models/metricsLoad.model';
import * as moment from 'moment';

@Component({
  selector: 'app-server-metrics-load',
  templateUrl: './server-metrics-cpu-load.component.html',
  styleUrls: [],
  providers: [ ServerMetricsCpuLoadService ]
})
export class ServerMetricsCpuLoadComponent implements OnInit {
  @Input() serverId: number;
  @Input() serverCpus: number;
  metricsLoad: MetricsLoad[];

  view: any[] = [ , 200 ];

  // options
  showXAxis = true;
  showYAxis = true;
  autoscale = false; // line, area
  yScaleMin = 0;
  yScaleMax = (this.serverCpus * 20);
  gradient = true;
  showLegend = true;
  legendTitle = 'Server Load';
  showXAxisLabel = false;
  xAxisLabel = 'Time';
  showYAxisLabel = false;
  yAxisLabel = 'Load';
  timeline = false;
  colorScheme = { domain: [ '#0509a4', '#c700ab', '#e90005', '#7a9298', '#8cd77b' ] };
  // colorScheme = 'vivid';
  colorSchemeType = 'ordinal';
  showRefLines = true;
  showRefLabels = true;
  referenceLines = [];

  load1MinDP: DataPoint[] = [];
  load5MinDP: DataPoint[] = [];
  load15MinDP: DataPoint[] = [];
  loadGraphData = [];


  constructor(private serverMetricsLoadService: ServerMetricsCpuLoadService) {
  }

  ngOnInit() { this.showMetricsLoad(); }

  onSelect(event) {
    console.log(event);
  }

  showMetricsLoad(): void {
    console.log('Server: ' + this.serverId);
    this.serverMetricsLoadService.getMetricsLoad(this.serverId)
      .subscribe((data: MetricsLoad[]) => {
        if (data) {
          for (const d of data) {
            this.load1MinDP.push({ name: moment(d.created_dttm).toDate(), value: (d.load_1min) });
            this.load5MinDP.push({ name: moment(d.created_dttm).toDate(), value: (d.load_5min) });
            this.load15MinDP.push({ name: moment(d.created_dttm).toDate(), value: (d.load_15min) });
          }
          this.loadGraphData = [
            { name: '1 Min', series: this.load1MinDP },
            { name: '5 Min', series: this.load5MinDP },
            { name: '15 Min', series: this.load15MinDP },
          ];
          Object.assign(this, this.loadGraphData);
          this.yScaleMax = (this.serverCpus * 20);
          this.referenceLines = [ { name: 'Warning', value: (this.serverCpus * 5) }, { name: 'Critical', value: (this.serverCpus * 10) } ];
          console.log('this.serverCpus=' + this.serverCpus);
        }
      });
  }
}

