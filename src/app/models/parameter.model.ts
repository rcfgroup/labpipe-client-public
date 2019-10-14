export enum CollectionName {
  ACCESS_TOKENS = 'ACCESS_TOKENS',
  ROLES = 'ROLES',
  CLIENT_SETTINGS = 'CLIENT_SETTINGS',
  API_ACCESS_ROLES = 'API_ACCESS_ROLES',
  OPERATORS = 'OPERATORS',
  STUDIES = 'STUDIES',
  FORMS = 'FORMS',
  REPORT_TEMPLATES = 'REPORT_TEMPLATES',
  INSTRUMENTS = 'INSTRUMENTS',
  COLLECTORS = 'COLLECTORS',
  SAMPLE_TYPES = 'SAMPLE_TYPES',
  LOCATIONS = 'LOCATIONS',
  EMAIL_GROUPS = 'EMAIL_GROUPS',
  UPLOADED = 'UPLOADED'
}

export class Operator {
  email: string;
  username: string;
  name: string;
  projects: string[];
  roles: string[];
  notificationGroup: string[];
  passwordHash: string;
  active: boolean;
}

export class Role {
  identifier: string;
  name: string;
}

export class EmailGroup {
  identifier: string;
  name: string;
  studyIdentifier: string;
  formIdentifier: string;
  admin: string[];
  member: string[];
}

export class Instrument {
  identifier: string;
  name: string;
  realtime: boolean;
  fileType: string[];
}

export class Location {
  identifier: string;
  name: string;
  type: string[];
}

export class Study {
  identifier: string;
  name: string;
  config: any;
}
