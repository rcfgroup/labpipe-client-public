import {Injectable} from '@angular/core';
import {ElectronService} from 'ngx-electron';
import {CodeName} from '../models/code-name.model';
import {RequiredParameterName} from '../models/parameter.model';

@Injectable({
  providedIn: 'root'
})
export class UserSettingsService {

  setting: any;
  crypto: any;
  algorithm = 'aes-256-ctr';
  password = 'labpipe-piKachu-ThunDerBolt';
  key: any;
  cipher: any;
  decipher: any;
  iv: any;
  path: any;
  fs: any;

  constructor(
    private es: ElectronService
  ) {
    this.setting = this.es.remote.require('electron-settings');
    this.crypto = this.es.remote.require('crypto');
    this.iv = this.crypto.randomBytes(16);
    this.key = this.crypto.scryptSync(this.password, 'pikapika', 32);
    this.cipher = this.crypto.createCipheriv(this.algorithm, this.key, this.iv);
    this.decipher = this.crypto.createDecipheriv(this.algorithm, this.key, this.iv);
    this.path = this.es.remote.require('path');
    this.fs = this.es.remote.require('fs-extra');
  }

  updateSetting(paramName: string, paramValue: any): void {
    this.setting.set(paramName, paramValue);
  }

  getSetting(paramName: string): any {
    return this.setting.get(paramName);
  }

  updateRegularStartup(isRegularStartup: boolean): void {
    this.setting.set('regular-startup', isRegularStartup);
  }

  getRegularStartup(): boolean {
    return this.setting.get('regular-startup');
  }

  updateApiToken(token: string): void {
    this.setting.set('api_token', token);
  }

  getApiToken(): string {
    return this.setting.get('api_token');
  }

  updateApiKey(key: string): void {
    this.setting.set('api_key', key);
  }

  getApiKey(): string {
    return this.setting.get('api_key');
  }

  setDataDirectory(path: string): void {
    this.setting.set('config_data_directory', path);
    const fileDir = this.path.join(path, 'files');
    this.setFileDirectory(fileDir);
  }

  getDataDirectory(): string {
    return this.setting.get('config_data_directory');
  }

  setFileDirectory(path: string): void {
    this.fs.ensureDirSync(path).then(() => {
      this.setting.set('config_file_directory', path);
    })
      .catch(err => {
        console.log(err);
        throw new Error('Cannot ensure files directory.');
      });
  }

  getFileDirectory(): string {
    return this.setting.get('config_file_directory');
  }

  updateApiRoot(apiRoot: string): void {
    this.setting.set('api_root', apiRoot);
  }

  getApiRoot(): string {
    return this.setting.get('api_root');
  }

  updateServerMonitorInterval(interval: number) {
    this.setting.set('server_monitor_interval', interval);
  }

  getServerMonitorInterval() {
    return this.setting.get('server_monitor_interval', 30000);
  }

  updateServerMonitorRetryInterval(interval: number) {
    this.setting.set('server_monitor_retry_interval', interval);
  }

  getServerMonitorRetryInterval() {
    return this.setting.get('server_monitor_retry_interval', 1000);
  }

  updateRunningMode(mode: string) {
    this.setting.set('current_running_mode', mode);
  }

  getRunningMode() {
    return this.setting.get('current_running_mode', 'local');
  }

  updateOperators(operators: any[]): void {
    this.setting.set(RequiredParameterName.OPERATORS, operators);
  }

  getOperators(): any[] {
    return this.setting.get(RequiredParameterName.OPERATORS);
  }

  updateCollectors(collectors: any[]): void {
    this.setting.set(RequiredParameterName.COLLECTORS, collectors);
  }

  getCollectors(): any[] {
    return this.setting.get(RequiredParameterName.COLLECTORS);
  }

  updateCurrentOperator(operator: any): void {
    this.setting.set('running_operator', operator);
  }

  getCurrentOperator(): any {
    return this.setting.get('running_operator');
  }

  updateCurrentOperatorPassword(password: string): void {
    this.setting.set('running_operator_password', password);
  }

  getCurrentOperatorPassword(): string {
    return this.setting.get('running_operator_password');
  }

  updateInstruments(collectors: any[]): void {
    this.setting.set(RequiredParameterName.INSTRUMENTS, collectors);
  }

  getInstruments(): any[] {
    return this.setting.get(RequiredParameterName.INSTRUMENTS);
  }

  updateCurrentInstrument(instrument: any): void {
    this.setting.set('running_instrument', instrument);
  }

  getCurrentInstrument(): any {
    return this.setting.get('running_instrument');
  }

  updateStudies(studies: any[]): void {
    this.setting.set(RequiredParameterName.STUDIES, studies);
  }

  getStudies(): any[] {
    return this.setting.get(RequiredParameterName.STUDIES);
  }

  updateLocations(collectors: any[]): void {
    this.setting.set(RequiredParameterName.LOCATIONS, collectors);
  }

  getLocations(): any[] {
    return this.setting.get(RequiredParameterName.LOCATIONS);
  }

  updateCurrentLocation(location: any): void {
    this.setting.set('running_location', location);
  }

  getCurrentLocation(): any {
    return this.setting.get('running_location');
  }


  // ================================================

  updateCurrentStudy(project: CodeName): void {
    this.setting.set('running_project', project);
  }

  getCurrentStudy(): CodeName {
    return this.setting.get('running_project');
  }

  // =====================================================

  clearForNewTask() {
    this.setting.delete('running_project');
  }

  clearForNewLogin() {
    this.clearForNewTask();
    this.setting.delete('running_operator');
    this.setting.delete('running_privilege');
  }
}
