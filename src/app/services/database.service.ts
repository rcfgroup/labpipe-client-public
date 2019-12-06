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

  constructor(private es: ElectronService, private us: UserSettingsService) {
    this.nedb = this.es.remote.require('nedb');
    this.datastore = this.es.remote.require('nedb-promises');
    this.path = this.es.remote.require('path');
    this.fs = this.es.remote.require('fs-extra');
    this.uuid4 = this.es.remote.require('uuid/v4');
  }

  saveData(identifier: string, data: any) {
    const root = this.us.getDataDirectory();
    if (!root) {
      throw new Error('Invalid root directory.');
    }
    const dbDir = this.path.join(root, 'nedb');
    this.fs.ensureDir(dbDir).then(() => {
      const doc = {
        _id: identifier,
        data: data
      };
      const db = new this.nedb({filename: this.path.join(dbDir, this.DefaultDatabase), autoload: true});
      db.insert(doc);
    })
      .catch(err => {
        console.log(err);
        throw new Error('Cannot ensure nedb directory.');
      });
  }

  async readData() {
    return new Promise((resolve, reject) => {
      const root = this.us.getDataDirectory();
      if (root) {
        const dbDir = this.path.join(root, 'nedb');
        const db = new this.nedb({filename: this.path.join(dbDir, this.DefaultDatabase), autoload: true});
        return db.find({}, (err, docs) => {
          if (err) {
            console.log(err);
            reject(err);
          }
          resolve(docs);
        });
      }
      reject('Data directory does not exist.');
    });
  }

  async findRecord(query) {
    return new Promise((resolve, reject) => {
      const root = this.us.getDataDirectory();
      if (root) {
        const dbDir = this.path.join(root, 'nedb');
        const db = new this.nedb({filename: this.path.join(dbDir, this.DefaultDatabase), autoload: true});
        return db.find(query, (err, docs) => {
          if (err) {
            console.log(err);
            reject(err);
          }
          console.log(docs);
          resolve(docs);
        });
      }
      reject('Data directory does not exist.');
    });
  }
}
