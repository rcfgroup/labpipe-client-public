import {Injectable} from '@angular/core';
import {FormBuilder, FormControl, Validators} from '@angular/forms';
import {QuestionBase} from '../models/dynamic-form-models/question-base';
import {FormValidProcess, WizardPage} from '../models/dynamic-form-models/wizard-page';
import {ElectronService} from 'ngx-electron';

@Injectable({
  providedIn: 'root'
})
export class DynamicFormService {
  path: any;
  fs: any;

  constructor(private formBuilder: FormBuilder, private es: ElectronService) {
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

  concat(process: FormValidProcess, processIndex: number, parentPage: WizardPage, formData: any) {
    let params = process.parameters;
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
    let params = process.parameters;
    if (params.length > 0) {
      
    }
    let files = formData[parentPage.key][p.replace('::', '')]
    try {
      this.fs.copySync('/tmp/myfile', '/tmp/mynewfile')
      console.log('success!')
    } catch (err) {
      console.error(err)
    }
  }
}
