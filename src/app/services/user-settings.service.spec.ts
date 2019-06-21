import {TestBed} from '@angular/core/testing';

import {UserSettingsService} from './user-settings.service';
import {ElectronService} from 'ngx-electron';

describe('UserSettingsService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [ElectronService]
  }));

  it('should be created', () => {
    const service: UserSettingsService = TestBed.get(UserSettingsService);
    expect(service).toBeTruthy();
  });
});
