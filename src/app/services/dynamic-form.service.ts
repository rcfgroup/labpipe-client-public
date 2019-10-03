import {Injectable} from '@angular/core';
import {FormBuilder, FormControl, Validators} from '@angular/forms';
import {QuestionBase} from '../models/dynamic-form-models/question-base';
import {FormValidProcess, WizardPage} from '../models/dynamic-form-models/wizard-page';
import {ElectronService} from 'ngx-electron';
import {UserSettingsService} from './user-settings.service';

@Injectable({
  providedIn: 'root'
})
export class DynamicFormService {
  path: any;
  fs: any;

  constructor(private formBuilder: FormBuilder, private es: ElectronService, private uss: UserSettingsService) {
    this.path = this.es.remote.require('path');
    this.fs = this.es.remote.require('fs-extra'); }

  toFormGroup(questions: QuestionBase<any>[]) {
    const group = this.formBuilder.group({});
    for (const question of questions) {
      group.controls[question.key] = new FormControl(question.value || '');
      if (question.required) {
        group.controls[question.key].setValidators(Validators.required);
      }
    }
    return group;
  }

  formValidProcessTriage(process: FormValidProcess, processIndex: number, parentPage: WizardPage, formData: any) {
    switch (process.processType) {
      case 'concat':
        this.concat(process, processIndex, parentPage, formData);
        break;
      case 'file-copy':
        this.fileCopy(process, processIndex, parentPage, formData);
        break;
    }
  }

  concat(process: FormValidProcess, processIndex: number, parentPage: WizardPage, formData: any) {
    const params = process.parameters;
    if (params.length > 0) {
      const separator = params.shift();
      const data = params.map(p => p.startsWith('::')
        ? formData[parentPage.key][p.replace('::', '')]
        : p);
      parentPage.formValidProcess[processIndex].result = data.join(separator);
      if (process.newField) {
        formData[parentPage.key][process.newField] = parentPage.formValidProcess[processIndex].result;
      }
    }
  }

  fileCopy(process: FormValidProcess, processIndex: number, parentPage: WizardPage, formData: any) {
    const fileDir = this.uss.getFileDirectory();
    console.log(`File directory: [${fileDir}]`);
    if (fileDir) {
      const params = process.parameters;
      const fileFields = params.map(p => p.replace('::', ''));
      fileFields.forEach(ff => {
        console.log(ff);
        if (formData[parentPage.key] && formData[parentPage.key][ff]) {
          const copiedFiles = [];
          formData[parentPage.key][ff].forEach(f => {
            try {
              const copiedFile = this.path.join(fileDir, this.path.basename(f));
              this.fs.copySync(f, copiedFile);
              copiedFiles.push(copiedFile);
            } catch (err) {
              console.error(err);
            }
          });
          process.result = copiedFiles;
          formData[parentPage.key][ff] = copiedFiles;
        }
      });
    }
  }
}
