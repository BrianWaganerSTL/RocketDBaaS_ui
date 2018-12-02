import { Component, Input, OnInit } from '@angular/core';

import { ServerMetricsCpuService } from './server-metrics-cpu.service';
import { MetricsCpu } from '../../../models/metricsCpu.model';
import { DataPoint, GraphSeries } from '../../../models/graphs.obj';
import * as moment from 'moment';

@Component({
  selector: 'app-server-metrics-cpu',
  templateUrl: './server-metrics-cpu.component.html',
  styleUrls: [ './server-metrics-cpu.component.css' ],
  providers: [ ServerMetricsCpuService ]
})
export class ServerMetricsCpuComponent implements OnInit {
  @Input() serverId: number;
  metricsCpus: MetricsCpu[];
  single: any[];
  multi: any[];

  view: any[] = [ 580, 250 ];

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = false;
  xAxisLabel = 'Time';
  showYAxisLabel = false;
  yAxisLabel = 'CPU %';
  timeline = true;
  autoScale = true;  // line, area
  // colorScheme = {
  //   domain: [ '#0509a4', '#c700ab', '#e90005', '#7a9298', '#8cd77b' ]
  // };
  colorScheme = 'flame';
  colorSchemeType = 'ordinal';


  cpuIdlePctDP: DataPoint[] = [];
  cpuUserPctDP: DataPoint[] = [];
  cpuSystemPctDP: DataPoint[] = [];
  cpuIoWaitPctDP: DataPoint[] = [];
  cpuStealPctDP: DataPoint[] = [];
  cpuIdlePctSeries: GraphSeries[] = [];
  cpuUserPctSeries: GraphSeries[] = [];
  area = [];


  constructor(private serverMetricsCpuService: ServerMetricsCpuService) {
  }

  ngOnInit() { this.showMetricsCpu(); }

  onSelect(event) {
    console.log(event);
  }

  showMetricsCpu(): void {
    console.log('Server: ' + this.serverId);
    this.serverMetricsCpuService.getMetricsCpu(this.serverId)
      .subscribe((data: MetricsCpu[]) => {
          this.metricsCpus = data;

          // console.log('metricsCpus: ' + this.metricsCpus);

          for (const d of data) {
            this.cpuIdlePctDP.push({ name: moment(d.created_dttm).toDate(), value: (d.cpu_idle_pct) / 100 });
            this.cpuUserPctDP.push({ name: new Date(d.created_dttm), value: (d.cpu_user_pct) / 100 });
            this.cpuSystemPctDP.push({ name: new Date(d.created_dttm), value: (d.cpu_system_pct) / 100 });
            this.cpuIoWaitPctDP.push({ name: new Date(d.created_dttm), value: (d.cpu_iowait_pct) / 100 });
            this.cpuStealPctDP.push({ name: new Date(d.created_dttm), value: (d.cpu_steal_pct) / 100 });
            // this.cpuIdlePctDP.map(d => console.log(d));
            // this.cpuUserPctDP.map(d => console.log(d));
            // this.cpuSystemPctDP.map(d => console.log(d));
            // this.cpuIoWaitPctDP.map(d => console.log(d));
            // this.cpuStealPctDP.map(d => console.log(d));
          }
          // this.cpuIdlePctSeries.push({ name: 'Idle', series: this.cpuIdlePctDP });
          // this.cpuUserPctSeries.push({ name: 'User', series: this.cpuUserPctDP });
          // this.cpuIdlePctDP.map( d => console.log(d.name + ',' + d.value));
          // console.error('cpuIdlePctSeries: ' + stringify(this.cpuIdlePctSeries));
          this.area = [
            { name: 'User', series: this.cpuUserPctDP },
            { name: 'System', series: this.cpuSystemPctDP },
            { name: 'Wait', series: this.cpuIoWaitPctDP },
            { name: 'Steal', series: this.cpuStealPctDP },
            { name: 'Idle', series: this.cpuIdlePctDP },
          ];
          Object.assign(this, this.area);
          // console.error('results: ' + stringify(this.results));
          // this.areaChart.push({ name: 'Idle', series: this.cpuIdlePctDP });

          // this.areaChart.push({ name: '%Idle', series: this.cpuIdlePctDP });
          // console.log('=========================================================================');
          // console.log(stringify(this.areaChart));
          // console.log(this.areaChart.toString());
          // console.log('=========================================================================');
        }
      );
  }
}

