import { Component, Input, OnInit } from '@angular/core';

import { ServerMetricsMountPointsService } from './server-metrics-mount-points.service';
import { DataPoint } from '../../../models/graphs.obj';
import * as moment from 'moment';
import { MetricsMountPoints } from '../../../models/metricsMountPoints.model';

@Component({
  selector: 'app-server-metrics-mount-points',
  templateUrl: './server-metrics-mount-points.component.html',
  styleUrls: [],
  providers: [ ServerMetricsMountPointsService ]
})
export class ServerMetricsMountPointsComponent implements OnInit {
  @Input() serverId: number;
  metricsMountPoints: MetricsMountPoints[];

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

  cpuAllocatedGbDP: DataPoint[] = [];
  cpuUsedGbDP: DataPoint[] = [];
  cpuUsedPctDP: DataPoint[] = [];
  mountPointGraphData = [];


  constructor(private serverMetricsMountPointsService: ServerMetricsMountPointsService) {
  }

  ngOnInit() { this.showMetricsMountPoints(); }

  onSelect(event) {
    console.log(event);
  }

  showMetricsMountPoints(): void {
    console.log('Server: ' + this.serverId);
    this.serverMetricsMountPointsService.getMetricsMountPoints(this.serverId)
      .subscribe((data: MetricsMountPoints[]) => {
          this.metricsMountPoints = data;

          for (const d of data) {
            this.cpuAllocatedGbDP.push({ name: moment(d.created_dttm).toDate(), value: d.allocated_gb });
            this.cpuUsedGbDP.push({ name: new Date(d.created_dttm), value: d.used_gb });
            this.cpuUsedPctDP.push({ name: new Date(d.created_dttm), value: (d.used_pct) / 100 });
          }
          this.mountPointGraphData = [
            { name: 'Allocated (GB)', series: this.cpuAllocatedGbDP },
            { name: 'Used (GB)', series: this.cpuUsedGbDP },
            { name: 'Used %', series: this.cpuUsedPctDP },
          ];
          Object.assign(this, this.mountPointGraphData);
        }
      );
  }
}

