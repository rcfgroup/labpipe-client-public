import {TestBed} from '@angular/core/testing';

import {ParameterService} from './parameter.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {ElectronService} from 'ngx-electron';

describe('ParameterService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule],
    providers: [ElectronService]
  }));

  it('should be created', () => {
    const service: ParameterService = TestBed.get(ParameterService);
    expect(service).toBeTruthy();
  });
});
