import {Component, OnInit} from '@angular/core';
import {ElectronService} from 'ngx-electron';
import {UserSettingsService} from '../../../services/user-settings.service';

@Component({
    selector: 'app-setting-portal',
    templateUrl: './setting-portal.component.html',
    styleUrls: ['./setting-portal.component.css']
})
export class SettingPortalComponent implements OnInit {


    appCachePath: string;

    dialogClearCacheOpened: boolean;
    dialogRelaunchOpened: boolean;

    constructor(private us: UserSettingsService,
                private es: ElectronService) {
    }

    ngOnInit() {
        const app = this.es.remote.app;
        const path = this.es.remote.require('path');
        this.appCachePath = path.join(app.getPath('appData'), app.getName());
        console.log(app.getAppPath());
    }

    showDevTools() {
        this.es.remote.getCurrentWebContents().openDevTools();
    }

    clearAppDataDirectory() {
        this.dialogClearCacheOpened = true;
    }

    onConfirmClearCache(confirm: boolean) {
        if (confirm) {
            const fs = this.es.remote.require('fs-extra');
            fs.remove(this.appCachePath, () => {
                // callback
                this.dialogRelaunchOpened = true;
            });
        }
    }

    restart() {
        const app = this.es.remote.app;
        app.relaunch();
        app.exit(0);
    }

}
