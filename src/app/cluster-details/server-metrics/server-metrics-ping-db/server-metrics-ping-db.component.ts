import { Component, Input, OnInit } from '@angular/core';

import { ServerMetricsPingDbService } from './server-metrics-ping-db.service';
import { DataPoint } from '../../../models/graphs.obj';
import { MetricsPingDb } from '../../../models/metricsPingDb.model';
import * as moment from 'moment';

@Component({
  selector: 'app-server-metrics-ping-db',
  templateUrl: './server-metrics-ping-db.component.html',
  styleUrls: [],
  providers: [ ServerMetricsPingDbService ]
})
export class ServerMetricsPingDbComponent implements OnInit {
  @Input() serverId: number;
  metricsPingDbs: MetricsPingDb[];

  view: any[] = [ , 200 ];
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = false;
  legendTitle = '';
  showXAxisLabel = false;
  xAxisLabel = '';
  showYAxisLabel = false;
  yAxisLabel = '';
  timeline = false;
  autoScale = false;  // line, area
  colorScheme = { domain: [ '#0509a4', '#c700ab', '#e90005', '#7a9298', '#8cd77b' ] };
  colorSchemeType = 'ordinal';

  pingDbResponseMsDP: DataPoint[] = [];
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
          for (const d of data) {
            this.pingDbResponseMsDP.push({ name: moment(d.created_dttm).toDate(), value: d.ping_db_response_ms });
          }
          this.pingDbGraphData = [
            { name: 'DB (ms)', series: this.pingDbResponseMsDP },
          ];
          Object.assign(this, this.pingDbGraphData);
        }
      );
  }
}

