import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {UserSettingsService} from 'src/app/services/user-settings.service';
import {CodeName} from 'src/app/models/code-name.model';

@Component({
  selector: 'app-top-navigation',
  templateUrl: './top-navigation.component.html',
  styleUrls: ['./top-navigation.component.css']
})
export class TopNavigationComponent implements OnInit {

  currentUser: CodeName;

  constructor(private router: Router, private us: UserSettingsService) {
    this.router.events.subscribe(() => {this.currentUser = this.us.getCurrentOperator(); });
  }

  ngOnInit() {
    this.currentUser = this.us.getCurrentOperator();
  }

  reload() {
    this.us.clearForNewLogin();
    this.router.navigate(['']);
  }

  logout() {
    this.us.clearForNewLogin();
    this.router.navigate(['login']);
  }

  toTasks() {
    this.us.clearForNewTask();
    this.router.navigate(['tasks']);
  }

  toSettings() {
    this.router.navigate(['settings']);
  }

}
