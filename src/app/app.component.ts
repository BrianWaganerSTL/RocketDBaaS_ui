import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  showClusters = true;
  showHeroes = true;
  showConfig = true;
  showDownloader = true;
  showUploader = true;
  showSearch = true;

  refreshRateChoices = [
    { 'seconds': 15, 'displayRate': '15 secs' },
    { 'seconds': 30, 'displayRate': '30 secs' },
    { 'seconds': 60, 'displayRate': '1 min' },
    { 'seconds': 120, 'displayRate': '2 min' },
  ];

  toggleClusters() {
    this.showClusters = !this.showClusters;
  }

  toggleHeroes() {
    this.showHeroes = !this.showHeroes;
  }

  toggleConfig() {
    this.showConfig = !this.showConfig;
  }

  toggleDownloader() {
    this.showDownloader = !this.showDownloader;
  }

  toggleUploader() {
    this.showUploader = !this.showUploader;
  }

  toggleSearch() {
    this.showSearch = !this.showSearch;
  }
}
