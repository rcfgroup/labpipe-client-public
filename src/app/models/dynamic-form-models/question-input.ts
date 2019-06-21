import {QuestionBase} from './question-base';

export class InputQuestion extends QuestionBase<string> {
    controlType = 'input';
    type: string;
    pattern: string;

    constructor(options: {} = {}) {
        super(options);
        this.type = options['type'] || '';
        this.pattern = options['pattern'] || '';
    }
}
