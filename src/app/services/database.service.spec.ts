import {TestBed} from '@angular/core/testing';

import {DatabaseService} from './database.service';
import {ElectronService} from 'ngx-electron';

describe('DatabaseService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [ElectronService]
  }));

  it('should be created', () => {
    const service: DatabaseService = TestBed.get(DatabaseService);
    expect(service).toBeTruthy();
  });
});
