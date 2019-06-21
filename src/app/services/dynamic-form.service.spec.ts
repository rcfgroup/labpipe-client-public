import {TestBed} from '@angular/core/testing';

import {DynamicFormService} from './dynamic-form.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

describe('DynamicFormService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [FormsModule, ReactiveFormsModule]
  }));

  it('should be created', () => {
    const service: DynamicFormService = TestBed.get(DynamicFormService);
    expect(service).toBeTruthy();
  });
});
