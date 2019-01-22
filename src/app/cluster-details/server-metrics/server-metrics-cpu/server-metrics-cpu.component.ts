import { Component, Input, OnInit } from '@angular/core';

import { ServerMetricsCpuService } from './server-metrics-cpu.service';


@Component({
  selector: 'app-server-metrics-cpu',
  templateUrl: './server-metrics-cpu.component.html',
  styleUrls: [],
  providers: [ ServerMetricsCpuService ]
})
export class ServerMetricsCpuComponent implements OnInit {
  @Input() serverId: number;

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
  colorScheme = { domain: [ '#0509a4', '#c700ab', '#e90005', '#7a9298', '#a4d79c' ] };
  colorSchemeType = 'ordinal';

  chartData = [];
  dataWithDates = [];


  constructor(private serverMetricsCpuService: ServerMetricsCpuService) {
  }

  ngOnInit() { this.showMetricsCpu(); }

  onSelect(event) {
    console.log(event);
  }

  showMetricsCpu(): void {
    console.log('Server: ' + this.serverId);
    this.serverMetricsCpuService.getMetricsCpu(this.serverId)
      .subscribe((data: any[]) => {
          this.chartData = this.convertChartStrDatesToDates(data);
          Object.assign(this, this.chartData);
        }
      );
  }

  convertChartStrDatesToDates(data: any[]) {
    this.dataWithDates = data.map(group => {
      group.series = group.series.map(dataItem => {
        dataItem.name = new Date(dataItem.name);
        return dataItem;
      });
      return group;
    });
    return this.dataWithDates;
  }
}

