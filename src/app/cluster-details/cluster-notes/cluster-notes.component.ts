import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ClusterNotesService } from './cluster-notes.service';
import { Note } from '../../models/note.model';
import { interval } from 'rxjs';
import { GlobalVars } from '../../global-vars.service';


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
              private globalVars: GlobalVars) {
  }

  ngOnInit() {
    this.showData(); // Initial Load
    // Refresh from database
    this.refreshTimer = interval((this.globalVars.getGRefreshRate()))
      .subscribe((value: number) => {
        console.log('refreshToggleModel=' + this.globalVars.getGRefreshSw());
        if (this.globalVars.getGRefreshSw()) {
          console.log('Refresh ClusterNotes,  cnt:' + value);
          this.showData();
          if (value === this.globalVars.getGRefreshMaxCnt()) {
            this.refreshTimer.unsubscribe();
            this.globalVars.setGRefreshSw(false);
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

