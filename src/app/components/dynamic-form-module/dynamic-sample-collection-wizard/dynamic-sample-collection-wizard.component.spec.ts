import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {DynamicSampleCollectionWizardComponent} from './dynamic-sample-collection-wizard.component';
import {ClarityModule} from '@clr/angular';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ElectronService} from 'ngx-electron';

describe('DynamicSampleCollectionWizardComponent', () => {
  let component: DynamicSampleCollectionWizardComponent;
  let fixture: ComponentFixture<DynamicSampleCollectionWizardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ClarityModule, FormsModule, ReactiveFormsModule],
      declarations: [ DynamicSampleCollectionWizardComponent ],
      providers: [ElectronService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicSampleCollectionWizardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
