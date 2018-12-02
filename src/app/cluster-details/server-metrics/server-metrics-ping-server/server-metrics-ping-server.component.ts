import { Component, Input, OnInit } from '@angular/core';

import { ServerMetricsPingServerService } from './server-metrics-ping-server.service';
import { DataPoint } from '../../../models/graphs.obj';
import * as moment from 'moment';
import { MetricsPingServer } from '../../../models/metricsPingServer.model';

@Component({
  selector: 'app-server-metrics-ping-server',
  templateUrl: './server-metrics-ping-server.component.html',
  styleUrls: [],
  providers: [ ServerMetricsPingServerService ]
})
export class ServerMetricsPingServerComponent implements OnInit {
  @Input() serverId: number;
  metricsPingServer: MetricsPingServer[];

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

  pingStatusDP: DataPoint[] = [];
  pingResponseMsDP: DataPoint[] = [];
  pingServerGraphData = [];

  constructor(private serverMetricsPingServerService: ServerMetricsPingServerService) {
  }

  ngOnInit() { this.showMetricsPingServer(); }

  onSelect(event) {
    console.log(event);
  }

  showMetricsPingServer(): void {
    console.log('Server: ' + this.serverId);
    this.serverMetricsPingServerService.getMetricsPingServer(this.serverId)
      .subscribe((data: MetricsPingServer[]) => {
          for (const d of data) {
            this.pingStatusDP.push({ name: moment(d.created_dttm).toDate(), value: ((d.ping_status === 'Critical') ? 1 : 0) });
            this.pingResponseMsDP.push({ name: new Date(d.created_dttm), value: d.ping_response_ms });
          }
          this.pingServerGraphData = [
            { name: 'Status', series: this.pingStatusDP },
            { name: 'Response (ms)', series: this.pingResponseMsDP },
          ];
          Object.assign(this, this.pingServerGraphData);
        }
      );
  }
}

