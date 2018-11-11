import {Component, Input, OnInit} from '@angular/core';
import {ClusterNotesService} from './cluster-notes.service';
import {Note} from '../../models/note.model';


@Component({
  selector: 'app-cluster-notes',
  templateUrl: './cluster-notes.component.html',
  styleUrls: ['./cluster-notes.component.css'],
  providers: [ClusterNotesService]
})
export class ClusterNotesComponent implements OnInit {
  @Input() clusterId: number;
  notes: Note[];

  constructor(private clusterNotesService: ClusterNotesService) {
  }

  ngOnInit() {
    this.showNotes();
  }

  showNotes(): void {
    this.clusterNotesService.getNotes(this.clusterId)
      .subscribe(notes => this.notes = notes);
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

