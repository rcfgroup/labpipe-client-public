import {Component, NgZone, OnInit} from '@angular/core';
import {ParameterService} from '../../../services/parameter.service';
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
  currentOperator: object;
  currentDataDirectory: string;
  zscoremax: number;
  zscoremin: number;
  cmsQcRefValidPeriod: number;
  isNormalVisit: true;

  studyForm: FormGroup;

  dialogVisitTypeOpened = false;

  constructor(private formBuilder: FormBuilder,
              private ps: ParameterService,
              private es: ElectronService,
              private ss: UserSettingsService,
              private router: Router ) {
                this.studyForm = this.formBuilder.group({
                  study: ['', Validators.required]
                });
              }

  ngOnInit() {
    this.currentOperator = this.ss.getCurrentOperator();
  }

  hideVisitTypeDialog() {
    this.dialogVisitTypeOpened = false;
  }

  goToSampleCollection() {
    this.dialogVisitTypeOpened = false;
    if (this.studyForm.valid) {
      this.ss.updateCurrentStudy(this.studyForm.get('study').value);
      this.ss.updateCurrentVisitType(this.isNormalVisit);
      this.router.navigate(['sample-collection-portal']);
    }
  }

}
