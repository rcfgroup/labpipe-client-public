import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SettingPortalComponent} from './setting-portal.component';
import {ClarityModule} from '@clr/angular';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MandatorySettingComponent} from '../mandatory-setting/mandatory-setting.component';
import {ElectronService} from 'ngx-electron';

describe('SettingPortalComponent', () => {
  let component: SettingPortalComponent;
  let fixture: ComponentFixture<SettingPortalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ClarityModule, FormsModule, ReactiveFormsModule],
      declarations: [ SettingPortalComponent, MandatorySettingComponent ],
      providers: [ElectronService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingPortalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
