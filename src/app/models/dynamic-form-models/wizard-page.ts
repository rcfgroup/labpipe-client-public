import {QuestionBase} from './question-base';
import {FormGroup} from '@angular/forms';

export class FormValidProcess {
    newField: string;
    processType: string;
    parameters: string[];
    result: any;
    allowCopy: boolean;
    auto: boolean;

    constructor(options: {
        newField?: string,
        processType?: string,
        parameters?: string[],
        result?: any;
        allowCopy?: boolean;
        auto?: boolean;
    } = {}) {
        this.newField = options.newField;
        this.processType = options.processType;
        this.parameters = options.parameters === undefined ? [] : options.parameters;
        this.result = options.result;
        this.allowCopy = options.allowCopy;
        this.auto = options.auto;
    }
}

export class WizardPage {
    key: string;
    title: string;
    navTitle: string;
    pageForm: FormGroup;
    requireValidForm: boolean;
    questions: QuestionBase<any>[];
    formValidProcess: FormValidProcess[];
    order: number;

    constructor(options: {
        key?: string,
        title?: string,
        navTitle?: string,
        requireValidForm?: boolean,
        questions?: QuestionBase<any>[],
        formValidProcess?: FormValidProcess[],
        order?: number
    } = {}) {
        this.key = options.key;
        this.navTitle = options.navTitle === undefined ? options.title : options.navTitle;
        this.requireValidForm = options.requireValidForm === undefined ? true : options.requireValidForm;
        this.questions = options.questions === undefined ? [] : options.questions;
        this.formValidProcess = options.formValidProcess === undefined ? [] : options.formValidProcess;
        this.order = options.order === undefined ? 1 : options.order;
        this.title = options.title || 'Step ' + this.order;
    }
}
