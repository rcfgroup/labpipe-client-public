import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-multiple-input',
  templateUrl: './multiple-input.component.html',
  styleUrls: ['./multiple-input.component.css']
})
export class MultipleInputComponent implements OnInit {

  @Input() title;
  @Output() valueChanged = new EventEmitter();

  results: Set<any> = new Set();
  entered: any;

  constructor() { }

  ngOnInit() {
  }

  add() {
    this.results.add(this.entered);
    this.update();
    this.entered = undefined;
  }

  remove(element) {
    this.results.delete(element);
    this.update();
  }

  update() {
    this.valueChanged.emit(Array.from(this.results));
  }

}
