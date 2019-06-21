import {QuestionBase} from './question-base';

export class SelectQuestion extends QuestionBase<string> {
    controlType = 'select';
    options = '';

    constructor(options: {} = {}) {
        super(options);
        this.options = options['options'] || '';
    }
}
