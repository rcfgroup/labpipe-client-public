import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InAppAlertComponent } from './in-app-alert.component';

describe('InAppAlertComponent', () => {
  let component: InAppAlertComponent;
  let fixture: ComponentFixture<InAppAlertComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InAppAlertComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InAppAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
