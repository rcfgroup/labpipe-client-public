import {Component, NgZone, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {ElectronService} from 'ngx-electron';
import {UserSettingsService} from '../../../services/user-settings.service';
import {LabPipeService} from '../../../services/lab-pipe.service';
import {InAppAlertService, InAppMessage} from '../../../services/in-app-alert.service';

@Component({
    selector: 'app-mandatory-setting',
    templateUrl: './mandatory-setting.component.html',
    styleUrls: ['./mandatory-setting.component.css']
})
export class MandatorySettingComponent implements OnInit {
    settingForm: FormGroup;
    isApiRootValid: boolean;
    isApiTokenKeyValid: boolean;

    messages: InAppMessage[] = [];

    constructor(private us: UserSettingsService,
                private es: ElectronService,
                private zone: NgZone,
                private http: HttpClient,
                private lps: LabPipeService,
                private iaas: InAppAlertService,
                private formBuilder: FormBuilder) {
        this.settingForm = this.formBuilder.group({
            dirData: ['', Validators.required],
            apiRoot: ['', Validators.required],
            apiToken: ['', Validators.required],
            apiKey: ['', Validators.required],
            serverMonitorInterval: ['', Validators.required],
            serverMonitorRetryInterval: ['', Validators.required]
        });
    }

    ngOnInit() {
        if (this.us.getDataDirectory()) {
            this.settingForm.get('dirData').setValue(this.us.getDataDirectory());
        }
        if (this.us.getApiRoot()) {
            this.settingForm.get('apiRoot').setValue(this.us.getApiRoot());
        }
        this.validateApiRoot();
        if (this.us.getApiToken()) {
            this.settingForm.get('apiToken').setValue(this.us.getApiToken());
        }
        if (this.us.getApiKey()) {
            this.settingForm.get('apiKey').setValue(this.us.getApiKey());
        }
        if (this.us.getServerMonitorInterval()) {
            this.settingForm.get('serverMonitorInterval').setValue(this.us.getServerMonitorInterval());
        }
        if (this.us.getServerMonitorRetryInterval()) {
            this.settingForm.get('serverMonitorRetryInterval').setValue(this.us.getServerMonitorRetryInterval());
        }
        this.validateApiTokenKey();
        this.updateServerMonitorConfig();
    }

    setDataDirectory() {
        this.es.remote.dialog.showOpenDialog(
            {
                properties: [
                    'openDirectory'
                ]
            }, folderPaths => {
                if (folderPaths !== undefined && folderPaths.length > 0) {
                    this.us.setDataDirectory(folderPaths[0]);
                    this.zone.run(() => {
                        this.settingForm.get('dirData').setValue(this.us.getDataDirectory());
                    });
                }
            });
    }

    validateApiRoot() {
        const url = this.settingForm.get('apiRoot').value;
        if (url) {
          this.lps.publicAccess(url).subscribe(() => {
            this.isApiRootValid = true;
            this.iaas.success('LabPipe server connected.', this.messages);
            this.us.setApiRoot(url);
            this.lps.loadApiRoot();
          }, (err) => {
            console.log(err);
            this.iaas.error('Incorrect API root.', this.messages);
            this.isApiRootValid = false;
          });
        }
    }

    validateApiTokenKey() {
        const url = this.settingForm.get('apiRoot').value;
        const token = this.settingForm.get('apiToken').value;
        const key = this.settingForm.get('apiKey').value;
        if (url && token && key) {
            this.lps.tokenAccess(token, key).subscribe(() => {
                    this.isApiTokenKeyValid = true;
                    this.iaas.success('Access token is valid.', this.messages);
                    this.us.setApiToken(token);
                    this.us.setApiKey(key);
                },
                (err) => {
                    console.log(err);
                    this.iaas.error('Access token is not valid.', this.messages);
                    this.isApiTokenKeyValid = false;
                });
        }
    }

    updateServerMonitorConfig() {
        this.settingForm.controls.serverMonitorInterval.valueChanges
          .subscribe(value => {
            this.us.setServerMonitorInterval(value);

          });
        this.settingForm.controls.serverMonitorRetryInterval.valueChanges
          .subscribe(value => this.us.updateServerMonitorRetryInterval(value));
    }

}
