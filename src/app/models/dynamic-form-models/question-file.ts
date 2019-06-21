import {QuestionBase} from './question-base';
import FileFilter = Electron.FileFilter;

export class FileQuestion extends QuestionBase<string> {
    controlType = 'file';
    target: string;
    multiple: boolean;
    filter: FileFilter[];

    constructor(options: {} = {}) {
        super(options);
        this.target = options['target'] || 'file';
        this.multiple = options['multiple'] || false;
        this.filter = options['filter'] === undefined ? [] : options['filter'];
    }
}
