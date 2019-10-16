import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {UserSettingsService} from 'src/app/services/user-settings.service';
import {TemporaryDataService} from '../../../services/temporary-data.service';

@Component({
  selector: 'app-top-navigation',
  templateUrl: './top-navigation.component.html',
  styleUrls: ['./top-navigation.component.css']
})
export class TopNavigationComponent implements OnInit {

  currentUser: any;

  constructor(private router: Router, private us: UserSettingsService, private tds: TemporaryDataService) {
    this.router.events.subscribe(() => {this.currentUser = this.tds.operator; });
  }

  ngOnInit() {
    this.currentUser = this.tds.operator;
  }

  reload() {
    this.tds.resetLogin();
    this.router.navigate(['']);
  }

  logout() {
    this.tds.resetLogin();
    this.router.navigate(['login']);
  }

  toTasks() {
    this.tds.resetTask();
    this.router.navigate(['tasks']);
  }

  toBrowse() {
    this.tds.resetTask();
    this.router.navigate(['browse']);
  }

  toManage() {
    this.tds.resetTask();
    this.router.navigate(['manage']);
  }

  toSettings() {
    this.tds.resetTask();
    this.router.navigate(['settings']);
  }

  toLogin() {
    this.tds.resetLogin();
    this.router.navigate(['login']);
  }

  toFreshStartUp() {
    this.tds.resetLogin();
    this.router.navigate(['fresh-startup']);
  }

  onBrandClick() {
    if (this.currentUser) {
      this.toTasks();
    } else {
      if (this.us.getStartupMode()) {
        this.toLogin();
      } else {
        this.toFreshStartUp();
      }
    }
  }

}
