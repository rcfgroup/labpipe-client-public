import {FileDisplayPipe} from './file-display.pipe';
import {ElectronService} from 'ngx-electron';

describe('FileDisplayPipe', () => {
  it('create an instance', () => {
    const es = new ElectronService();
    const pipe = new FileDisplayPipe(es);
    expect(pipe).toBeTruthy();
  });
});
