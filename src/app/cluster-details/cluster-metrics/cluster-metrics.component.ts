import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-cluster-metrics',
  templateUrl: './cluster-metrics.component.html',
  styleUrls: ['./cluster-metrics.component.css']
})
export class ClusterMetricsComponent implements OnInit {
  @Input() clusterId: number;

  constructor() {
  }

  ngOnInit() {
  }

}
