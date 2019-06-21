import {QuestionBase} from './question-base';

export class TrueFalseQuestion extends QuestionBase<string> {
    controlType = 'truefalse';

    constructor(options: {} = {}) {
        super(options);
    }
}
