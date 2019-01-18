import { Component, Input, OnInit } from '@angular/core';

import { ServerMetricsMountPointsService } from './server-metrics-mount-points.service';

@Component({
  selector: 'app-server-metrics-mount-points',
  templateUrl: './server-metrics-mount-points.component.html',
  styleUrls: [],
  providers: [ ServerMetricsMountPointsService ]
})
export class ServerMetricsMountPointsComponent implements OnInit {
  @Input() serverId: number;
  dataWithDates = [];
  data: any[];
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
  timeline = true;
  autoScale = false;  // line, area
  colorScheme = { domain: [ '#0509a4', '#c700ab', '#e90005', '#7a9298', '#8cd77b' ] };
  colorSchemeType = 'ordinal';
  showRefLines = true;
  showRefLabels = true;
  referenceLines = [ { name: 'Warning', value: 80 }, { name: 'Critical', value: 95 } ];

  mountPointData = [];


  constructor(private serverMetricsMountPointsService: ServerMetricsMountPointsService) {
  }

  ngOnInit() {
    this.showChartMountPoints();
  }

  onSelect(event) {
    console.log(event);
  }

  showChartMountPoints(): void {
    console.log('Server: ' + this.serverId);
    this.serverMetricsMountPointsService.getChartMountPoints(this.serverId)
      .subscribe((data: any[]) => {
        this.mountPointData = this.convertChartStrDatesToDates(data);
        Object.assign(this, this.mountPointData);
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

