import {Injectable} from '@angular/core';
import {UserSettingsService} from './user-settings.service';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LabPipeService {
  apiRoot: string;

  constructor(private userSettingsService: UserSettingsService, private http: HttpClient) {
    this.apiRoot = this.userSettingsService.getApiRoot();
  }

  userAuthRequestOptions() {
    return this.userSettingsService.getCurrentOperator() && this.userSettingsService.getCurrentOperatorPassword() ? {
      headers: new HttpHeaders({
        Authorization: `Basic ${btoa(`${this.userSettingsService.getCurrentOperator().username}:${this.userSettingsService.getCurrentOperatorPassword()}`)}`
      })
    } : {};
  }

  tokenAuthRequestOptions(token?: string, key?: string) {
    return token && key ? {
      headers: new HttpHeaders({
        Authorization: `Basic ${btoa(`${token}:${key}`)}`
      })
    } : this.userSettingsService.getApiToken() && this.userSettingsService.getApiKey() ? {
      headers: new HttpHeaders({
        Authorization: `Basic ${btoa(`${this.userSettingsService.getApiToken()}:${this.userSettingsService.getApiKey()}`)}`
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
}
