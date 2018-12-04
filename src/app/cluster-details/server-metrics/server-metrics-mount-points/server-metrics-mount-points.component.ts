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

  view: any[] = [ , 200 ];

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  legendTitle = '';
  showXAxisLabel = false;
  xAxisLabel = '';
  showYAxisLabel = true;
  yAxisLabel = '% Used';
  yScaleMin = 0;
  yScaleMax = 100;
  roundDomains = true;
  timeline = false;
  autoScale = false;  // line, area
  colorScheme = { domain: [ '#0509a4', '#c700ab', '#e90005', '#7a9298', '#8cd77b' ] };
  colorSchemeType = 'ordinal';

  UsedPctDP: DataPoint[] = [];
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
            this.UsedPctDP.push({ name: moment(d.created_dttm).toDate(), value: d.used_pct });
            this.mountPointGraphData = [ { name: d.mount_point, series: this.UsedPctDP } ];
          }
          Object.assign(this, this.mountPointGraphData);
        }
      );
  }
}

