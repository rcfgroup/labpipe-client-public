import { TestBed } from '@angular/core/testing';

import { TemporaryDataService } from './temporary-data.service';

describe('TemporaryDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TemporaryDataService = TestBed.get(TemporaryDataService);
    expect(service).toBeTruthy();
  });
});
