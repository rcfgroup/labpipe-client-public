import {QuestionBase} from './question-base';
import {FormGroup} from '@angular/forms';

export class FormValidProcess {
    newField: string;
    processType: string;
    dataField: string;
    result: any;

    constructor(options: {
        newField?: string,
        processType?: string,
        dataField?: string,
        result?: any;
    } = {}) {
        this.newField = options.newField;
        this.processType = options.processType;
        this.dataField = options.dataField;
        this.result = options.result;
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
