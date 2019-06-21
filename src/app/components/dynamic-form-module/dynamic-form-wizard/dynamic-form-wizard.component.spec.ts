import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {DynamicFormWizardComponent} from './dynamic-form-wizard.component';
import {ClarityModule} from '@clr/angular';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DynamicFormQuestionComponent} from '../dynamic-form-question/dynamic-form-question.component';
import {DynamicFormResultPreviewComponent} from '../dynamic-form-result-preview/dynamic-form-result-preview.component';
import {FileDisplayPipe} from '../../../pipes/file-display.pipe';
import {ElectronService} from 'ngx-electron';

describe('DynamicFormWizardComponent', () => {
  let component: DynamicFormWizardComponent;
  let fixture: ComponentFixture<DynamicFormWizardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ClarityModule, FormsModule, ReactiveFormsModule],
      declarations: [ DynamicFormWizardComponent, DynamicFormQuestionComponent, DynamicFormResultPreviewComponent, FileDisplayPipe],
      providers: [ElectronService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicFormWizardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
