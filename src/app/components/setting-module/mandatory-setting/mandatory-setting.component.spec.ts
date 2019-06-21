import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {MandatorySettingComponent} from './mandatory-setting.component';
import {ClarityModule} from '@clr/angular';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ElectronService} from 'ngx-electron';

describe('MandatorySettingComponent', () => {
  let component: MandatorySettingComponent;
  let fixture: ComponentFixture<MandatorySettingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ClarityModule, FormsModule, ReactiveFormsModule],
      declarations: [ MandatorySettingComponent ],
      providers: [ElectronService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MandatorySettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
