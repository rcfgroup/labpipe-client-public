import {Injectable} from '@angular/core';
import {UserSettingsService} from './user-settings.service';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {ElectronService} from 'ngx-electron';

@Injectable({
  providedIn: 'root'
})
export class LabPipeService {
  apiRoot: string;
  uuid4: any;
  path: any;
  fs: any;

  constructor(private uss: UserSettingsService, private es: ElectronService, private http: HttpClient) {
    this.path = this.es.remote.require('path');
    this.fs = this.es.remote.require('fs-extra');
    this.loadApiRoot();
    this.uuid4 = this.es.remote.require('uuid/v4');
  }

  loadApiRoot() {
    this.apiRoot = this.uss.getApiRoot();
  }

  userAuthRequestOptions() {
    return this.uss.getCurrentOperator() && this.uss.getCurrentOperatorPassword() ? {
      headers: new HttpHeaders({
        Authorization: `Basic ${btoa(`${this.uss.getCurrentOperator().username}:${this.uss.getCurrentOperatorPassword()}`)}`
      })
    } : {};
  }

  tokenAuthRequestOptions(token?: string, key?: string) {
    return token && key ? {
      headers: new HttpHeaders({
        Authorization: `Basic ${btoa(`${token}:${key}`)}`
      })
    } : this.uss.getApiToken() && this.uss.getApiKey() ? {
      headers: new HttpHeaders({
        Authorization: `Basic ${btoa(`${this.uss.getApiToken()}:${this.uss.getApiKey()}`)}`
      })
    } : {};
  }

  heartbeat() {
    return this.http.head(`${this.apiRoot}/api/general/connect/public`);
  }

  checkPublicAccess(apiRoot: string) {
    return this.http.get(`${apiRoot}/api/general/connect/public`);
  }

  checkTokenAccess(token?: string, key?: string) {
    const options = {
      ...this.tokenAuthRequestOptions(token, key)
    };
    return this.http.get(`${this.apiRoot}/api/general/connect/token`, options);
  }

  getParameter(paramName: string) {
    const url = `${this.apiRoot}/api/parameter/name/${paramName}`;
    return this.http.get(url, this.tokenAuthRequestOptions());
  }

  getForm(studyCode: string, instrumentCode: string) {
    const url = `${this.apiRoot}/api/form/template/study/${studyCode}/instrument/${instrumentCode}`;
    return this.http.get(url, this.tokenAuthRequestOptions());
  }

  getFormWithCode(formCode: string) {
    const url = `${this.apiRoot}/api/form/template/code/${formCode}`;
    return this.http.get(url, this.tokenAuthRequestOptions());
  }

  postRecord(remoteUrl: string, record: any) {
    const url = `${this.apiRoot}${remoteUrl}`;
    return this.http.post(url, record, this.userAuthRequestOptions());
  }

  uploadFormFiles(identifier: string, paths: string[]) {
    const url = `${this.apiRoot}/api/upload/file/form`;
    const options = {
      params: new HttpParams().set('identifier', identifier),
      ...this.userAuthRequestOptions()
    };
    const formData = new FormData();
    paths.forEach(p => formData.append('files', new File(this.fs.readFileSync(p), this.path.basename(p))));
    return this.http.post(url, formData, options );
  }

  getAllRecord(studyCode?: string) {
    const url = studyCode ? `${this.apiRoot}/api/query/record/all/${studyCode}` : `${this.apiRoot}/api/query/record/all`;
    return this.http.get(url, this.userAuthRequestOptions());
  }

  getAllStudies() {
    const url = `${this.apiRoot}/api/query/study/all`;
    return this.http.get(url, this.userAuthRequestOptions());
  }

  getStudy(code: string) {
    const url = `${this.apiRoot}/api/query/study/one`;
    const options = {
      params: new HttpParams().set('code', code),
      ...this.userAuthRequestOptions()
    };
    return this.http.get(url, options);
  }

  getAllInstruments() {
    const url = `${this.apiRoot}/api/query/instrument/all`;
    return this.http.get(url, this.userAuthRequestOptions());
  }

  getInstrument(code: string) {
    const url = `${this.apiRoot}/api/query/instrument/one`;
    const options = {
      params: new HttpParams().set('code', code),
      ...this.userAuthRequestOptions()
    };
    return this.http.get(url, options);
  }

  addOperator(name: string, email: string) {
    const url = `${this.apiRoot}/api/manage/create/operator`;
    const options = {
      params: new HttpParams().set('name', name).set('email', email),
      ...this.userAuthRequestOptions()
    };
    return this.http.get(url, options);
  }

  addToken() {
    const url = `${this.apiRoot}/api/manage/create/token`;
    return this.http.get(url, this.userAuthRequestOptions());
  }

  getUid() {
    return this.uuid4();
  }
}
