import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-status-bar',
  templateUrl: './status-bar.component.html',
  styleUrls: ['./status-bar.component.css']
})
export class StatusBarComponent implements OnInit, OnChanges {
  time = new Date();
  @Input() location: any;
  @Input() instrument: any;
  @Input() study: any;

  constructor() {
  }

  ngOnInit() {
    this.updateTime();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.location = changes.location ? changes.location.currentValue : this.location;
    this.instrument = changes.instrument ? changes.instrument.currentValue : this.instrument;
    this.study = changes.study ? changes.study.currentValue : this.study;
  }

  updateTime() {
    setInterval(() => {
      this.time = new Date();
    }, 1000);
  }
}
