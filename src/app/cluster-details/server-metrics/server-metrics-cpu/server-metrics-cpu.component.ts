import { Component, Input, OnInit } from '@angular/core';

import { ServerMetricsCpuService } from './server-metrics-cpu.service';
import { MetricsCpu } from '../../../models/metricsCpu.model';
import { DataPoint } from '../../../models/graphs.obj';
import * as moment from 'moment';

@Component({
  selector: 'app-server-metrics-cpu',
  templateUrl: './server-metrics-cpu.component.html',
  styleUrls: [],
  providers: [ ServerMetricsCpuService ]
})
export class ServerMetricsCpuComponent implements OnInit {
  @Input() serverId: number;
  metricsCpus: MetricsCpu[];

  view: any[] = [ , 200 ];
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  legendTitle = 'CPU';
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
  cpuGraphData = [];


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
        // this.metricsCpus = data;

          for (const d of data) {
            this.cpuIdlePctDP.push({ name: moment(d.created_dttm).toDate(), value: (d.cpu_idle_pct) / 100 });
            this.cpuUserPctDP.push({ name: new Date(d.created_dttm), value: (d.cpu_user_pct) / 100 });
            this.cpuSystemPctDP.push({ name: new Date(d.created_dttm), value: (d.cpu_system_pct) / 100 });
            this.cpuIoWaitPctDP.push({ name: new Date(d.created_dttm), value: (d.cpu_iowait_pct) / 100 });
            this.cpuStealPctDP.push({ name: new Date(d.created_dttm), value: (d.cpu_steal_pct) / 100 });
          }
        this.cpuGraphData = [
            { name: 'User', series: this.cpuUserPctDP },
            { name: 'System', series: this.cpuSystemPctDP },
            { name: 'Wait', series: this.cpuIoWaitPctDP },
            { name: 'Steal', series: this.cpuStealPctDP },
            { name: 'Idle', series: this.cpuIdlePctDP },
          ];
        Object.assign(this, this.cpuGraphData);
        }
      );
  }
}

