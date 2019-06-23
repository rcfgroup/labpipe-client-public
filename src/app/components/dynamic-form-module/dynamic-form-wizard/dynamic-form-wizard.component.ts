import {Component, NgZone, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
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

@Component({
    selector: 'app-dynamic-form-wizard',
    templateUrl: './dynamic-form-wizard.component.html',
    styleUrls: ['./dynamic-form-wizard.component.css']
})

export class DynamicFormWizardComponent implements OnInit, OnDestroy {

    formCode: string;
    wizardTemplate: Wizard;
    form: FormGroup;
    remoteUrl: string;
    isFormReady: boolean;
    isFormVisible: boolean;
    result: any;
    formData: any;
    @ViewChild('formDataPreview', {static: false}) formDataPreview: DynamicFormResultPreviewComponent;

    showNotSavedWarning: boolean;

    constructor(private us: UserSettingsService,
                private dfs: DynamicFormService,
                private ds: DatabaseService,
                private es: ElectronService,
                private zone: NgZone,
                private http: HttpClient,
                private router: Router) {
    }

    ngOnInit() {
      // TODO get formCode from current study
        this.getFormTemplate();
    }

    ngOnDestroy() {
        this.us.clearForNewTask();
    }

    getFormTemplate() {
        const apiRoot = this.us.getApiRoot();
        const url = apiRoot + '/api/form/template/' + this.formCode;
        this.http.get(url).subscribe((data: any) => {
            this.formData = {form_code: data.code};
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
                this.wizardTemplate.pages.push(p);
            });
            this.wizardTemplate.pages = this.wizardTemplate.pages.sort((a, b) => a.order - b.order);
            if (this.wizardTemplate) {
                for (let i = 0; i < this.wizardTemplate.pages.length; i++) {
                    this.wizardTemplate.pages[i].pageForm = this.dfs.toFormGroup(this.wizardTemplate.pages[i].questions);
                }
                this.isFormReady = true;
            }
        });
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
            console.log(parentPage.key);
            for (let i = 0; i < parentPage.formValidProcess.length; i++) {
                console.log(parentPage.formValidProcess[i].processType);
                switch (parentPage.formValidProcess[i].processType) {
                    case 'concat':
                        let df = parentPage.formValidProcess[i].dataField.split('::');
                        const separator = df.shift();
                        let data = df.map(fieldName => parentPage.pageForm.get(fieldName).value);
                        parentPage.formValidProcess[i].result = data.join(separator);
                        break;
                }
            }
            this.formData[parentPage.key] = parentPage.pageForm.value;
            parentPage.formValidProcess.forEach(page => {
                if (page.newField) {
                    this.formData[parentPage.key][page.newField] = page.result;
                }
            });
        }
    }

    onWizardFinish() {
        this.result = this.formData;
        this.formDataPreview.updateResult();
        this.showNotSavedWarning = true;
    }

    saveResult() {
        this.ds.saveData(this.result);
        if (this.us.getRunningMode() === 'server' && this.us.getApiRoot() && this.remoteUrl) {
            const requestOptions = {
                headers: new HttpHeaders({
                    Authorization: btoa(this.us.getCurrentOperator().username + ':' + this.us.getCurrentOperatorPassword())
                })};
            this.http.post(this.us.getApiRoot() + this.remoteUrl, this.result, requestOptions)
                .subscribe(() => console.log('result sent to server'), error => console.warn(error));
        }
        this.router.navigate(['tasks']);
    }

    clipboardCopy(value: any) {
        this.es.clipboard.writeText(value);
    }

}
