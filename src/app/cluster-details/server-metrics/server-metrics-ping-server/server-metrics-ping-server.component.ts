import { Component, Input, OnInit } from '@angular/core';

import { ServerMetricsPingServerService } from './server-metrics-ping-server.service';
import { DataPoint } from '../../../models/graphs.obj';
import { MetricsPingServer } from '../../../models/metricsPingServer.model';
import * as moment from 'moment';

@Component({
  selector: 'app-server-metrics-ping-server',
  templateUrl: './server-metrics-ping-server.component.html',
  styleUrls: [],
  providers: [ ServerMetricsPingServerService ]
})
export class ServerMetricsPingServerComponent implements OnInit {
  @Input() serverId: number;

  view: any[] = [ , 200 ];
  showXAxis = true;
  showYAxis = true;
  gradient = true;
  showLegend = false;
  legendTitle = '';
  showXAxisLabel = false;
  xAxisLabel = '';
  showYAxisLabel = false;
  yAxisLabel = '';
  timeline = false;
  autoScale = true;  // line, area
  colorScheme = { domain: [ '#0509a4', '#c700ab', '#e90005', '#7a9298', '#8cd77b' ] };
  colorSchemeType = 'ordinal';

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
            this.pingResponseMsDP.push({ name: moment(d.created_dttm).toDate(), value: d.ping_response_ms });
          }
          this.pingServerGraphData = [
            { name: 'Server (ms)', series: this.pingResponseMsDP },
          ];
          Object.assign(this, this.pingServerGraphData);
        }
      );
  }
}

