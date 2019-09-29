import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-in-app-alert',
  templateUrl: './in-app-alert.component.html',
  styleUrls: ['./in-app-alert.component.css']
})
export class InAppAlertComponent implements OnInit, OnChanges {
  @Input() messages: {type: string, message: string, closed: boolean}[] = [];

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.messages = changes.messages.currentValue;
    console.log(this.messages);
  }

}
