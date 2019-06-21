import {Injectable} from '@angular/core';
import {ElectronService} from 'ngx-electron';
import {CodeName} from '../models/code-name.model';
import {AdminOperator, SupportedProjects} from '../models/parameter.model';

@Injectable({
  providedIn: 'root'
})
export class UserSettingsService {

  setting: any;

  constructor(
    private es: ElectronService
  ) {
    this.setting = this.es.remote.require('electron-settings');
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
  }

  getDataDirectory(): string {
    return this.setting.get('config_data_directory');
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
    this.setting.set('operators', operators);
  }

  getOperators(): any[] {
    return this.setting.get('operators');
  }

  updateCollectors(collectors: any[]): void {
    this.setting.set('collectors', collectors);
  }

  getCollectors(): any[] {
    return this.setting.get('collectors');
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
    this.setting.set('instruments', collectors);
  }

  getInstruments(): any[] {
    return this.setting.get('instruments');
  }

  updateCurrentInstrument(instrument: any): void {
    this.setting.set('running_instrument', instrument);
  }

  getCurrentInstrument(): any {
    return this.setting.get('running_instrument');
  }

  updateStudies(studies: any[]): void {
    this.setting.set('studies', studies);
  }

  getStudies(): any[] {
    return this.setting.get('studies');
  }

  updateLocations(collectors: any[]): void {
    this.setting.set('locations', collectors);
  }

  getSupportedProjects(): SupportedProjects {
    return this.setting.get('studies');
  }

  getLocations(): any[] {
    return this.setting.get('locations');
  }

  updateCurrentLocation(location: any): void {
    this.setting.set('running_location', location);
  }

  getCurrentLocation(): any {
    return this.setting.get('running_location');
  }


  // ================================================

  updateAdminOperators(admins: AdminOperator): void {
    this.setting.set('config_admins', admins);
  }

  getAdminOperators(): AdminOperator {
    return this.setting.get('config_admins');
  }

  isCurrentReciva(): boolean {
    return this.getCurrentInstrument().code === 'R';
  }

  isCurrentPtr(): boolean {
    return this.getCurrentInstrument().code === 'PTR';
  }

  isCurrentCms(): boolean {
    return this.getCurrentInstrument().code === 'CMS';
  }

  isCurrentIms(): boolean {
    return this.getCurrentInstrument().code === 'IMS';
  }

  updateCurrentPrivilege(level: number): void {
    this.setting.set('running_privilege', level);
  }

  getCurrentPrivilege(): number {
    return this.setting.get('running_privilege');
  }

  updateCurrentStudy(project: CodeName): void {
    this.setting.set('running_project', project);
  }

  getCurrentProject(): CodeName {
    return this.setting.get('running_project');
  }

  isCurrentMologic(): boolean {
    return this.getCurrentProject().code === 'HEAD';
  }

  updateCurrentVisitType(isNormalVisit: boolean): void {
    this.setting.set('running_is_normal_visit', isNormalVisit);
  }

  getCurrentVisitType(): boolean {
    return this.setting.get('running_is_normal_visit');
  }

  setAdvionCmdQualityControlZScoreMax(max: number): void {
    this.setting.set('config_advion_cms_qc_zscore_max', max);
  }

  getAdvionCmdQualityControlZScoreMax(): number {
    return this.setting.get('config_advion_cms_qc_zscore_max');
  }

  setAdvionCmdQualityControlZScoreMin(min: number): void {
    this.setting.set('config_advion_cms_qc_zscore_min', min);
  }

  getAdvionCmdQualityControlZScoreMin(): number {
    return this.setting.get('config_advion_cms_qc_zscore_min');
  }

  setAdvionCmdQualityControlReferenceValidPeriod(days: number): void {
    this.setting.set('config_advion_cms_qc_ref_valid_period', days);
  }

  getAdvionCmdQualityControlReferenceValidPeriod(): number {
    return this.setting.get('config_advion_cms_qc_ref_valid_period');
  }

  getDefaultFilePath(): number {
    return this.setting.get('default_file_path');
  }

  updateDefaultFilePath(project: CodeName): void {
    this.setting.set('default_file_path', project);
  }

  // =====================================================

  clearForNewTask() {
    this.setting.delete('running_project');
    this.setting.delete('running_is_normal_visit');
  }

  clearForNewLogin() {
    this.setting.delete('running_location');
    this.setting.delete('running_is_normal_visit');
    this.setting.delete('running_operator');
    this.setting.delete('running_privilege');
  }
}
