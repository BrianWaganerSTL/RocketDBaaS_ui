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
  showRefLines = true;
  showRefLabels = true;
  referenceLines = [ { name: 'Warning', value: 80 }, { name: 'Critical', value: 95 } ];

  UsedPctDP: DataPoint[] = [];
  mountPointGraphData = [];
  mntSlashDP = [];
  mntDataDP = [];
  mntLogsDP = [];
  mntBkupsDP = [];
  mntHomeDP = [];
  mntTmpDP = [];


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
          for (const d of data) {
            if (d.mount_point === '/') {
              this.mntSlashDP.push({ name: moment(d.created_dttm).toDate(), value: (d.used_pct) });
            } else if (d.mount_point === '/opt/pgsql/data') {
              this.mntSlashDP.push({ name: moment(d.created_dttm).toDate(), value: (d.used_pct) });
            } else if (d.mount_point === '/opt/pgsql/logs') {
              this.mntSlashDP.push({ name: moment(d.created_dttm).toDate(), value: (d.used_pct) });
            } else if (d.mount_point === '/opt/pgsql/logs') {
              this.mntSlashDP.push({ name: moment(d.created_dttm).toDate(), value: (d.used_pct) });
            } else if (d.mount_point === '/home') {
              this.mntSlashDP.push({ name: moment(d.created_dttm).toDate(), value: (d.used_pct) });
            } else if (d.mount_point === '/tmp') {
              this.mntSlashDP.push({ name: moment(d.created_dttm).toDate(), value: (d.used_pct) });
          }
          }
          this.mountPointGraphData = [
            { name: '/', series: this.mntSlashDP },
            { name: 'data', series: this.mntDataDP },
            { name: 'logs', series: this.mntLogsDP },
            { name: 'backups', series: this.mntBkupsDP },
            { name: 'home', series: this.mntHomeDP },
            { name: 'tmp', series: this.mntTmpDP },
          ];

          Object.assign(this, this.mountPointGraphData);
          console.log('this.metricsMountPoints:' + this.metricsMountPoints);
        }
      );
  }
}

