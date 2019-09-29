import { TestBed } from '@angular/core/testing';

import { InAppAlertService } from './in-app-alert.service';

describe('InAppAlertService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InAppAlertService = TestBed.get(InAppAlertService);
    expect(service).toBeTruthy();
  });
});
