import { Component, Input, OnInit } from '@angular/core';

import { ServerMetricsPingDbService } from './server-metrics-ping-db.service';
import { DataPoint } from '../../../models/graphs.obj';
import * as moment from 'moment';
import { MetricsPingDb } from '../../../models/metricsPingDb.model';

@Component({
  selector: 'app-server-metrics-ping-db',
  templateUrl: './server-metrics-ping-db.component.html',
  styleUrls: [],
  providers: [ ServerMetricsPingDbService ]
})
export class ServerMetricsPingDbComponent implements OnInit {
  @Input() serverId: number;
  metricsPingDbs: MetricsPingDb[];
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
  yAxisLabel = 'DB Response (ms)';
  timeline = true;
  autoScale = true;  // line, area
  // colorScheme = {
  //   domain: [ '#0509a4', '#c700ab', '#e90005', '#7a9298', '#8cd77b' ]
  // };
  colorScheme = 'flame';
  colorSchemeType = 'ordinal';


  dbPingStatusDP: DataPoint[] = [];
  dbPingResponseMsDP: DataPoint[] = [];
  pingDbGraphData = [];


  constructor(private serverMetricsPingDbService: ServerMetricsPingDbService) {
  }

  ngOnInit() { this.showMetricsPingDb(); }

  onSelect(event) {
    console.log(event);
  }

  showMetricsPingDb(): void {
    console.log('Server: ' + this.serverId);
    this.serverMetricsPingDbService.getMetricsPingDb(this.serverId)
      .subscribe((data: MetricsPingDb[]) => {
          this.metricsPingDbs = data;

          // console.log('metricsCpus: ' + this.metricsCpus);

          for (const d of data) {
            this.dbPingStatusDP.push({ name: moment(d.created_dttm).toDate(), value: ((d.ping_status === 'Critical') ? 1 : 0) });
            this.dbPingResponseMsDP.push({ name: new Date(d.created_dttm), value: d.ping_response_ms });
          }
          this.pingDbGraphData = [
            { name: 'User', series: this.dbPingStatusDP },
            { name: 'System', series: this.dbPingResponseMsDP },
          ];
          Object.assign(this, this.pingDbGraphData);
        }
      );
  }
}
