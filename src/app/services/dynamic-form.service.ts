import {Injectable} from '@angular/core';
import {FormBuilder, FormControl, Validators} from '@angular/forms';
import {QuestionBase} from '../models/dynamic-form-models/question-base';

@Injectable({
  providedIn: 'root'
})
export class DynamicFormService {

  constructor(private formBuilder: FormBuilder) { }

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
}
