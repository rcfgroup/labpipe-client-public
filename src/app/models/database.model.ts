import {CodeName} from './code-name.model';
import {Tube} from './sample.model';

export class SampleFile {
  originPath: string;
  currentPath: string;

  constructor(origin?, current?) {
    if (origin !== undefined) {
      this.originPath = origin;
    }
    if (current !== undefined) {
      this.currentPath = current;
    }
  }
}

export class SampleRecord {
  location: CodeName;
  instrument: CodeName;
  operator: CodeName;
  project: CodeName;
  sampleId: string;
  studyId: string;
  visitId: string;
  sampleType: CodeName;
  collector: CodeName;
  sampleNumber: number;
  tubes?: Tube[];
  files?: SampleFile[];
}

export class CmsQualityControlRecord {
  location: CodeName;
  instrument: CodeName;
  operator: CodeName;
  time: Date;
  pirraniPressure: number;
  turboSpeed: number;
  capillaryTemperature: number;
  sourceGasTemperature: number;
  transferLineTemperature: number;
  capillaryVoltage: number;
  sourceVoltage: number;
  extractionElectrode: number;
  apciCurrent: number;
  hexapoleBias: number;
  detector: number;
  dynode: number;
  flow: number;
  comment: string;
  isPassed: boolean;
  linkedRef: string;
  isActive: boolean;
}

export class CmsQualityControlReference {
  location: CodeName;
  instrument: CodeName;
  operator: CodeName;
  time: Date;
  pirraniPressureAverage: number;
  turboSpeedAverage: number;
  capillaryTemperatureAverage: number;
  sourceGasTemperatureAverage: number;
  capillaryVoltageAverage: number;
  sourceVoltageAverage: number;
  extractionElectrodeAverage: number;
  apciCurrentAverage: number;
  hexapoleBiasAverage: number;
  detectorAverage: number;
  dynodeAverage: number;
  pirraniPressureStdev: number;
  turboSpeedStdev: number;
  capillaryTemperatureStdev: number;
  sourceGasTemperatureStdev: number;
  capillaryVoltageStdev: number;
  sourceVoltageStdev: number;
  extractionElectrodeStdev: number;
  apciCurrentStdev: number;
  hexapoleBiasStdev: number;
  detectorStdev: number;
  dynodeStdev: number;
  transferLineTemperatureAverage: number;
  transferLineTemperatureMax: number;
  transferLineTemperatureMin: number;
  flowMin: number;
  comment: string;
  isActive: boolean;
}
