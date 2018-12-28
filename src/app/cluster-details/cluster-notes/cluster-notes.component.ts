import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ClusterNotesService } from './cluster-notes.service';
import { Note } from '../../models/note.model';
import { interval } from 'rxjs';
import { AppComponent } from '../../app.component';
import { GlobalVarsService } from '../../global-vars.service';


@Component({
  selector: 'app-cluster-notes',
  templateUrl: './cluster-notes.component.html',
  styleUrls: ['./cluster-notes.component.css'],
  providers: [ClusterNotesService]
})
export class ClusterNotesComponent implements OnInit, OnDestroy {
  @Input() clusterId: number;
  notes: Note[];
  alive = true;
  refreshTimer;

  constructor(private clusterNotesService: ClusterNotesService,
              private appComponent: AppComponent,
              private globalVarsService: GlobalVarsService) {
  }

  ngOnInit() {
    this.showData(); // Initial Load
    console.log('Initial ClusterNotes');
    this.refreshTimer = interval((15 * 1000)) // 15 seconds
      .subscribe((value: number) => {
        if (this.globalVarsService.getGRefreshSw()) {
          console.log('Refresh ClusterNotes,  cnt:' + value);
          this.showData();
          if (value === 60) {
            this.refreshTimer.unsubscribe();
          }
        }
      });
  }

  ngOnDestroy() {
    if (this.refreshTimer) {
      this.refreshTimer.unsubscribe();
    }
  }

  showData(): void {
    this.clusterNotesService.getNotes(this.clusterId)
      .subscribe(data => this.notes = data);
  }

  getCssClass(a) {
    let cssClasses;
    switch (a.note_color) {
      case 'Primary':
        cssClasses = 'border-primary';
        break;
      case 'Secondary':
        cssClasses = 'border-secondary';
        break;
      case 'Success':
        cssClasses = 'border-success';
        break;
      case 'Danger':
        cssClasses = 'border-danger';
        break;
      case 'Warning':
        cssClasses = 'border-warning';
        break;
      case 'Info':
        cssClasses = 'border-info';
        break;
      case 'Light':
        cssClasses = 'border-light';
        break;
      case 'Dark':
        cssClasses = 'border-dark';
        break;
    }
    return cssClasses;
  }
}

