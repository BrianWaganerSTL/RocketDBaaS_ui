import {Component, Input, OnInit} from '@angular/core';
import {ClusterRestoresService} from './cluster-restores.service';
import {Restore} from '../../models/restore.model';

@Component({
  selector: 'app-cluster-restores',
  templateUrl: './cluster-restores.component.html',
  styleUrls: ['./cluster-restores.component.css'],
  providers: [ClusterRestoresService]
})
export class ClusterRestoresComponent implements OnInit {
  @Input() clusterId: number;
  restores: Restore[];
  // id: number;
  // error: any;

  constructor(private clusterRestoresService: ClusterRestoresService) {
  }

  ngOnInit() {
    this.showRestores();
  }

  showRestores(): void {
    this.clusterRestoresService.getRestores(this.clusterId)
      .subscribe(restores => this.restores = restores);
  }

  getCssClass(r) {
    let cssClasses;
    switch (r.restore_status) {
      case 'Failed':
        cssClasses = 'bg-RestoreFailed';
        break;
      case 'Running':
        cssClasses = 'bg-RestoreRunning';
        break;
      case 'Successful':
        cssClasses = 'bg-RestoreSuccessful';
        break;
    }
    return cssClasses;
  }
}
