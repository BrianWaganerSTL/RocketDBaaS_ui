import {Component, OnInit} from '@angular/core';
import {ServerActivity} from '../../models/serverActivity.model';
import {ClusterActivitiesService} from './cluster-activities.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-cluster-activities',
  templateUrl: './cluster-activities.component.html',
  styleUrls: ['./cluster-activities.component.css']
})
export class ClusterActivitiesComponent implements OnInit {
  id: number;
  error: any;
  serverActivities: ServerActivity[];

  constructor(private clusterActivitiesService: ClusterActivitiesService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.showActivities();
  }

  showActivities() {
    this.id = parseInt(this.route.snapshot.paramMap.get('clusterId'));
    this.clusterActivitiesService.getActivities(this.id)
      .subscribe(
        (data: ServerActivity[]) => this.serverActivities = {...data}, // success path
        error => this.error = error // error path
      );
  }
}
