import {Component, OnInit} from '@angular/core';
import {UserSettingsService} from '../../../services/user-settings.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-fresh-startup',
  templateUrl: './fresh-startup.component.html',
  styleUrls: ['./fresh-startup.component.css']
})
export class FreshStartupComponent implements OnInit {
  isRegularStartup: boolean;

  constructor(private us: UserSettingsService,
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

  continueLaunch() {
    if (this.us.getDataDirectory() && this.us.getApiToken() && this.us.getApiKey()) {
      this.isRegularStartup = true;
      this.us.setStartupMode(this.isRegularStartup);
      this.router.navigate(['prepare-launch']);
    }
  }

}
