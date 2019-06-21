import {Injectable} from '@angular/core';
import {ElectronService} from 'ngx-electron';
import {UserSettingsService} from './user-settings.service';

@Injectable({
  providedIn: 'root'
})

export class DatabaseService {

  DefaultDatabase = 'labpipe.db';

  nedb: any;
  datastore: any;
  path: any;
  fs: any;
  uuid4: any;

  dir: string;

  constructor(private es: ElectronService, private us: UserSettingsService) {
    this.nedb = this.es.remote.require('nedb');
    this.datastore = this.es.remote.require('nedb-promises');
    this.path = this.es.remote.require('path');
    this.fs = this.es.remote.require('fs-extra');
    this.uuid4 = this.es.remote.require('uuid/v4');
  }

  saveData(data: any) {
    const root = this.us.getDataDirectory();
    if (!root) {
      throw new Error('Invalid root directory.');
    }
    this.dir = this.path.join(root, 'nedb');
    this.fs.ensureDir(this.dir).then(() => {
      const doc = {
        _id: this.uuid4(),
        data: data
      };
      const db = new this.nedb({filename: this.path.join(this.dir, this.DefaultDatabase), autoload: true});
      db.insert(doc);
    })
      .catch(err => {
        console.log(err);
        throw new Error('Cannot ensure nedb directory.');
      });
  }
}
