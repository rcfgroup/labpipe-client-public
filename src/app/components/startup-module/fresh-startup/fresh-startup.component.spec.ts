import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {FreshStartupComponent} from './fresh-startup.component';
import {ClarityModule} from '@clr/angular';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MandatorySettingComponent} from '../../setting-module/mandatory-setting/mandatory-setting.component';
import {ElectronService} from 'ngx-electron';

describe('FreshStartupComponent', () => {
  let component: FreshStartupComponent;
  let fixture: ComponentFixture<FreshStartupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ClarityModule, FormsModule, ReactiveFormsModule],
      declarations: [ FreshStartupComponent, MandatorySettingComponent ],
      providers: [ElectronService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FreshStartupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
