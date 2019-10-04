import {Component, NgZone, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {DynamicFormResultPreviewComponent} from '../dynamic-form-result-preview/dynamic-form-result-preview.component';
import {Wizard} from '../../../models/dynamic-form-models/wizard';
import {FormGroup} from '@angular/forms';
import {UserSettingsService} from '../../../services/user-settings.service';
import {DynamicFormService} from '../../../services/dynamic-form.service';
import {DatabaseService} from '../../../services/database.service';
import {ElectronService} from 'ngx-electron';
import {FormValidProcess, WizardPage} from '../../../models/dynamic-form-models/wizard-page';
import {QuestionBase} from '../../../models/dynamic-form-models/question-base';
import {InputQuestion} from '../../../models/dynamic-form-models/question-input';
import {SelectQuestion} from '../../../models/dynamic-form-models/question-select';
import {TrueFalseQuestion} from '../../../models/dynamic-form-models/question-truefalse';
import {FileQuestion} from '../../../models/dynamic-form-models/question-file';
import {LabPipeService} from '../../../services/lab-pipe.service';
import {InAppAlertService, InAppMessage} from '../../../services/in-app-alert.service';

@Component({
  selector: 'app-dynamic-form-wizard',
  templateUrl: './dynamic-form-wizard.component.html',
  styleUrls: ['./dynamic-form-wizard.component.css']
})

export class DynamicFormWizardComponent implements OnInit, OnDestroy {
  location: any;
  instrument: any;
  study: any;

  messages: InAppMessage[] = [];
  formMessages: InAppMessage[] = [];

  formCode: string;
  formTemplates: any;
  wizardTemplate: Wizard;
  form: FormGroup;
  remoteUrl: string;
  isFormReady: boolean;
  isFormVisible: boolean;
  result: any;
  formData: any;
  @ViewChild('formDataPreview', {static: false}) formDataPreview: DynamicFormResultPreviewComponent;

  showNotSavedWarning: boolean;
  showMultipleFormCodeDialog: boolean;
  showNoFormDialog: boolean;
  showSavedDialog: boolean;

  sentToServer: boolean;

  actionIdentifier: string;

  constructor(private us: UserSettingsService,
              private dfs: DynamicFormService,
              private ds: DatabaseService,
              private es: ElectronService,
              private lps: LabPipeService,
              private iaas: InAppAlertService,
              private zone: NgZone,
              private http: HttpClient,
              private router: Router) {
    this.formTemplates = [];
    this.location = this.us.getCurrentLocation();
    this.instrument = this.us.getCurrentInstrument();
    this.study = this.us.getCurrentStudy();
  }

  ngOnInit() {
    // TODO get formCode from current study
    this.getFormTemplate();
  }

  ngOnDestroy() {
    this.us.clearForNewTask();
  }

  getFormTemplate() {
    this.lps.getForm(this.study.code, this.instrument.code).subscribe((data: any) => {
        this.formTemplates = data;
        switch (this.formTemplates.length) {
          case 0:
            this.showNoFormDialog = true;
            break;
          case 1:
            this.prepareForm(this.formTemplates[0]);
            break;
          default:
            this.showMultipleFormCodeDialog = true;
            break;
        }
      },
      (error: any) => this.iaas.error(error.error.message, this.messages)
    );
  }

  getFormTemplateWithCode() {
    if (this.formCode) {
      this.showMultipleFormCodeDialog = false;
      this.lps.getFormWithCode(this.formCode).subscribe((data: any) => {
        this.iaas.success('Form loaded. Preparation in progress.', this.messages);
        this.prepareForm(data);
        },
        error => this.iaas.error(error.error.message, this.messages)
      );
    }
  }

  prepareForm(data: any) {
    this.actionIdentifier = this.lps.getUid();
    this.formData = {actionIdentifier: this.actionIdentifier, form_code: data.code, study_code: data.study_code, instrument_code: data.instrument_code, record: {}};
    this.remoteUrl = data.url;
    this.wizardTemplate = new Wizard({title: data.template.title, pages: []});
    data.template.pages.forEach(page => {
      const p = new WizardPage({
        key: page.key,
        title: page.title,
        navTitle: page.navTitle,
        requireValidForm: page.requireValidForm,
        order: page.order
      });
      page.questions.forEach((q: QuestionBase<any>) => {
        switch (q.controlType) {
          case 'input':
            p.questions.push(new InputQuestion(q));
            break;
          case 'select':
            p.questions.push(new SelectQuestion(q));
            break;
          case 'truefalse':
            p.questions.push(new TrueFalseQuestion(q));
            break;
          case 'file':
            p.questions.push(new FileQuestion(q));
            break;
        }
      });
      page.formValidProcess.forEach(fvp => {
        p.formValidProcess.push(new FormValidProcess(fvp));
      });
      p.formValidProcess = p.formValidProcess.sort((a, b) => a.order - b.order);
      this.wizardTemplate.pages.push(p);
    });
    this.wizardTemplate.pages = this.wizardTemplate.pages.sort((a, b) => a.order - b.order);
    if (this.wizardTemplate) {
      this.wizardTemplate.pages.forEach((page, index) =>
        this.wizardTemplate.pages[index].pageForm = this.dfs.toFormGroup(page.questions));
      this.isFormReady = true;
      this.iaas.success('Form preparation completed.', this.messages);
    }
  }

  showForm() {
    this.isFormVisible = true;
  }

  onQuestionValue(parentPage: WizardPage, controlKey: string, questionValue: any) {
    const updatedValue = {};
    updatedValue[controlKey] = questionValue;
    parentPage.pageForm.patchValue(updatedValue, {emitEvent: false});
    this.onFormValid(parentPage);
  }

  onFormValid(parentPage: WizardPage) {
    if (parentPage.pageForm.valid) {
      this.formData.record[parentPage.key] = parentPage.pageForm.value;
      parentPage.formValidProcess.forEach((process, index) => {
        if (process.auto) {
          this.dfs.formValidProcessTriage(this.actionIdentifier, process, index, parentPage, this.formData.record);
        }
      });
      console.log(parentPage.formValidProcess);
    }
  }

  activateProcess(parentPage: WizardPage, process: FormValidProcess, processIndex: number) {
    this.dfs.formValidProcessTriage(this.actionIdentifier, process, processIndex, parentPage, this.formData.record, this.formMessages);
  }

  onWizardFinish() {
    this.result = this.formData;
    this.formDataPreview.updateResult();
    this.showNotSavedWarning = true;
  }

  saveResult() {
    this.ds.saveData(this.actionIdentifier, {
      created: new Date(),
      saved_by: this.us.getCurrentOperator().username,
      ...this.result
    });
    if (this.us.getRunningMode() === 'server') {
      this.sentToServer = true;
      this.lps.postRecord(this.remoteUrl, this.result)
        .subscribe((data: any) => {
            this.iaas.success(data.message, this.messages);
          },
          (error: any) => {
            this.iaas.error(error.error.message, this.messages);
          });
    } else {
      this.sentToServer = false;
    }
    this.showSavedDialog = true;
  }

  clipboardCopy(value: any) {
    this.es.clipboard.writeText(value);
  }

  toPortal() {
    this.showNoFormDialog = false;
    this.showSavedDialog = false;
    this.us.clearForNewTask();
    this.router.navigate(['tasks']);
  }

}
