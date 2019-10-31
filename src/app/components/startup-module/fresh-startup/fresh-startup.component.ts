import {Component, OnInit} from '@angular/core';
import {UserSettingsService} from '../../../services/user-settings.service';
import {Router} from '@angular/router';
import {ElectronService} from 'ngx-electron';

@Component({
  selector: 'app-fresh-startup',
  templateUrl: './fresh-startup.component.html',
  styleUrls: ['./fresh-startup.component.css']
})
export class FreshStartupComponent implements OnInit {
  isRegularStartup: boolean;
  dialogRequireRestartOpened: boolean;
  dialogRestartOpened: boolean;

  constructor(private us: UserSettingsService,
              private es: ElectronService,
              private router: Router) {
  }

  ngOnInit() {
    this.isRegularStartup = this.us.getStartupMode();
    if (this.isRegularStartup && this.us.getDataDirectory() && this.us.getApiToken() && this.us.getApiKey()) {
      this.router.navigate(['prepare-launch']);
    } else {
      this.isRegularStartup = false;
      this.us.setStartupMode(this.isRegularStartup);
    }
  }

  onConfirmRestart(confirm) {
    if (confirm) {
      this.dialogRequireRestartOpened = false;
      this.dialogRestartOpened = true;
      this.isRegularStartup = true;
      this.us.setStartupMode(this.isRegularStartup);
      this.restart();
    } else {
      this.dialogRequireRestartOpened = false;
    }
  }

  restart() {
    const app = this.es.remote.app;
    app.relaunch();
    app.exit(0);
  }

  continueLaunch() {
    if (this.us.getDataDirectory() && this.us.getApiToken() && this.us.getApiKey()) {
      this.dialogRequireRestartOpened = true;
    }
  }

}
