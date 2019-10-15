import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-multiple-select',
  templateUrl: './multiple-select.component.html',
  styleUrls: ['./multiple-select.component.css']
})
export class MultipleSelectComponent implements OnInit, OnChanges {

  @Input() title = '';
  @Input() options: any[] = [];
  @Input() valueField: string = undefined;
  @Input() displayField: string = undefined;
  @Output() valueChanged = new EventEmitter();

  selected: Set<any> = new Set();
  select: any;

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
      this.title = changes.title.currentValue;
      this.options = changes.options.currentValue;
      this.valueField = changes.valueField.currentValue;
      this.displayField = changes.displayField.currentValue;
  }

  onSelect() {
    if (this.select) {
      this.selected.add(this.select);
      console.log(this.selected);
    }
    this.valueChanged.emit(this.selected);
    this.select = undefined;
  }

  unselect(element: any) {
    this.selected.delete(element);
    this.valueChanged.emit(this.selected);
  }

}
