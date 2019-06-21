import {WizardPage} from './wizard-page';

export class Wizard {
    title: string;
    pages: WizardPage[];

    constructor(options: {
        title?: string,
        pages?: WizardPage[]
    } = {}) {
        this.title = options.title || 'Wizard';
        this.pages = options.pages === undefined ? [] : options.pages;
    }
}
