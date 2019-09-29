import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-dynamic-form-result-preview',
  templateUrl: './dynamic-form-result-preview.component.html',
  styleUrls: ['./dynamic-form-result-preview.component.css']
})
export class DynamicFormResultPreviewComponent implements OnInit {

  private _data: any;

  result: {form: string, field: string, value: any, iterable: boolean}[] = [];

  constructor() { }

  ngOnInit() {
  }

  @Input('data')
  set data(data: any) {
    this._data = data;
    this.updateResult();
  }

  get data() {
    return this._data;
  }

  public updateResult() {
    const keys = Object.keys(this._data);
    this.result = [];
    keys.forEach(k => {
      if (k !== 'form_code' && k !== 'study_code' && k !== 'instrument_code') {
        const childKeys = Object.keys(this._data[k]);
        childKeys.forEach(ck => {
          this.result.push({form: k, field: ck, value: this._data[k][ck], iterable: Array.isArray(this._data[k][ck])});
        });
      }
    });
  }

}
