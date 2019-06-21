import {Pipe, PipeTransform} from '@angular/core';
import {ElectronService} from 'ngx-electron';

@Pipe({
  name: 'filename'
})
export class FileDisplayPipe implements PipeTransform {

  constructor(private es: ElectronService) {}

  transform(value: string, transformType: string): string {
    const path = this.es.remote.require('path');
    switch (transformType) {
      case 'base':
        return path.basename(value);
      default:
        return value;
    }
  }

}
