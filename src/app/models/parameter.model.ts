import {CodeName} from './code-name.model';

export class Facility {
  _id?: string;
  param_name: string;
  locations: CodeName[];
  carts: CodeName[];
  operators: CodeName[];
  collectors: CodeName[];
}

export class SupportedProjects {
  _id?: string;
  param_name: string;
  projects: CodeName[];
}

export class FileType {
  type: string;
  ext: string;
}

export class Instrument extends CodeName {
  online_file_type?: FileType[];
  offline_file_type?: FileType[];
  use_collector: CodeName[];
}

export class SupportedInstruments {
  _id?: string;
  param_name: string;
  instruments: Instrument[];
}

export class InstrumentCollectorSampleTypeSet {
  instrument: string;
  collector: string;
  sample_type: string[];
}

export class ProjectConfig {
  _id?: string;
  param_name: string;
  study_id_prefix: string[];
  study_id_number_length: number;
  visits: string[];
  exa_visit_regex: string;
  use_episode_normal: boolean;
  use_episode_exa: boolean;
  types: CodeName[];
  use_sample_number: InstrumentCollectorSampleTypeSet[];
}

export class AdminOperator {
  _id?: string;
  param_name: string;
  members: string[];
}

export enum RequiredParameterName {
  ACCESS_TOKENS = 'ACCESS_TOKENS',
  ROLES = 'ROLES',
  CLIENT_SETTINGS = 'CLIENT_SETTINGS',
  API_ACCESS_ROLES = 'API_ACCESS_ROLES',
  OPERATORS = 'OPERATORS',
  STUDIES = 'STUDIES',
  FORM_TEMPLATES = 'FORM_TEMPLATES',
  REPORT_TEMPLATES = 'REPORT_TEMPLATES',
  INSTRUMENTS = 'INSTRUMENTS',
  COLLECTORS = 'COLLECTORS',
  SAMPLE_TYPES = 'SAMPLE_TYPES',
  LOCATIONS = 'LOCATIONS',
  EMAIL_GROUPS = 'EMAIL_GROUPS'
}
