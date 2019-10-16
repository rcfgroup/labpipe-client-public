import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TemporaryDataService {
  operator: any;
  password: string;
  location: any;
  instrument: any;
  study: any;

  connected: boolean;

  constructor() { }

  resetLogin() {
    this.operator = undefined;
    this.password = undefined;
    this.location = undefined;
    this.instrument = undefined;
    this.study = undefined;
  }

  resetTask() {
    this.study = undefined;
  }
}
