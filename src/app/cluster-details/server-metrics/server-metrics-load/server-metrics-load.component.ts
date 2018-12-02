import { Component, Input, OnInit } from '@angular/core';

import { ServerMetricsLoadService } from './server-metrics-load.service';
import { DataPoint } from '../../../models/graphs.obj';
import { MetricsLoad } from '../../../models/metricsLoad.model';

@Component({
  selector: 'app-server-metrics-load',
  templateUrl: './server-metrics-load.component.html',
  styleUrls: [],
  providers: [ ServerMetricsLoadService ]
})
export class ServerMetricsLoadComponent implements OnInit {
  @Input() serverId: number;
  metricsLoad: MetricsLoad[];

  view: any[] = [ 580, 250 ];

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = false;
  xAxisLabel = 'Time';
  showYAxisLabel = false;
  yAxisLabel = 'Load';
  timeline = true;
  autoScale = true;  // line, area
  // colorScheme = {
  //   domain: [ '#0509a4', '#c700ab', '#e90005', '#7a9298', '#8cd77b' ]
  // };
  colorScheme = 'flame';
  colorSchemeType = 'ordinal';

  load1MinDP: DataPoint[] = [];
  load5MinDP: DataPoint[] = [];
  load15MinDP: DataPoint[] = [];
  loadGraphData = [];


  constructor(private serverMetricsLoadService: ServerMetricsLoadService) {
  }

  ngOnInit() { this.showMetricsLoad(); }

  onSelect(event) {
    console.log(event);
  }

  showMetricsLoad(): void {
    console.log('Server: ' + this.serverId);
    this.serverMetricsLoadService.getMetricsLoad(this.serverId)
      .subscribe((data: MetricsLoad[]) => {
          for (const d of data) {
            this.load1MinDP.push({ name: new Date(d.created_dttm), value: (d.load_1min) });
            this.load5MinDP.push({ name: new Date(d.created_dttm), value: (d.load_5min) });
            this.load15MinDP.push({ name: new Date(d.created_dttm), value: (d.load_15min) });
          }
          this.loadGraphData = [
            { name: '1 Min', series: this.load1MinDP },
            { name: '5 Min', series: this.load5MinDP },
            { name: '15 Min', series: this.load15MinDP },
          ];
          Object.assign(this, this.loadGraphData);
        }
      );
  }
}
