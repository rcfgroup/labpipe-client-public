import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {DynamicFormResultPreviewComponent} from './dynamic-form-result-preview.component';
import {ClarityModule} from '@clr/angular';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

describe('DynamicFormResultPreviewComponent', () => {
  let component: DynamicFormResultPreviewComponent;
  let fixture: ComponentFixture<DynamicFormResultPreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ClarityModule, FormsModule, ReactiveFormsModule],
      declarations: [ DynamicFormResultPreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicFormResultPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
