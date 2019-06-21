import {CodeName} from './code-name.model';

export class Tube {
  number: string;
  date: string;
  time: string;
  type: CodeName;

  constructor(number, date, time, type) {
    this.number = number;
    this.date = date;
    this.time = time;
    this.type = type;
  }
}

export class SampleHeader {
  studyIdPrefix: string;
  studyIdNumber: string;
  visitId: string;
  sampleType: CodeName;
  collector: CodeName;
  sampleNumber: number;
}
