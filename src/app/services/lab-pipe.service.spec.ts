import { TestBed } from '@angular/core/testing';

import { LabPipeService } from './lab-pipe.service';

describe('LabPipeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LabPipeService = TestBed.get(LabPipeService);
    expect(service).toBeTruthy();
  });
});
