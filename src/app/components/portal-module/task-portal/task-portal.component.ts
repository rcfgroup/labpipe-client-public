import {Component, NgZone, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {UserSettingsService} from '../../../services/user-settings.service';
import {ElectronService} from 'ngx-electron';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-task-portal',
  templateUrl: './task-portal.component.html',
  styleUrls: ['./task-portal.component.css']
})
export class TaskPortalComponent implements OnInit {
  location: any;
  instrument: any;
  operator: object;

  isNormalVisit: true;

  studyForm: FormGroup;

  dialogVisitTypeOpened = false;

  constructor(private formBuilder: FormBuilder,
              private es: ElectronService,
              private uss: UserSettingsService,
              private router: Router) {
    this.studyForm = this.formBuilder.group({
      study: ['', Validators.required]
    });
    this.operator = this.uss.getCurrentOperator();
    this.location = this.uss.getCurrentLocation();
    this.instrument = this.uss.getCurrentInstrument();
  }

  ngOnInit() {
  }

}
