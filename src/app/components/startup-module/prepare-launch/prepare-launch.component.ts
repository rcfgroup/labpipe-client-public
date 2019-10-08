import {Component, OnInit} from '@angular/core';
import {UserSettingsService} from '../../../services/user-settings.service';
import {Router} from '@angular/router';
import {DatabaseService} from '../../../services/database.service';
import {forkJoin} from 'rxjs';
import {LabPipeService} from '../../../services/lab-pipe.service';

@Component({
  selector: 'app-prepare-launch',
  templateUrl: './prepare-launch.component.html',
  styleUrls: ['./prepare-launch.component.css']
})
export class PrepareLaunchComponent implements OnInit {

  parameterList: string[] = [];

  constructor(private lps: LabPipeService, private us: UserSettingsService,
              private ds: DatabaseService,
              private router: Router) {
  }

  ngOnInit() {
    const component = this;
    if (this.us.getRunningMode() === 'server') {
      this.loadParameterList().subscribe(
        (data: any) => {
          console.log('init parameter list retrieved');
          console.log(data);
          this.parameterList = data.find(param => param.identifier === 'client_init').value;
        },
        error => {
          console.warn('error loading init parameter list');
        },
        () => {
          const observableList = this.parameterList.map(paramName => component.lps.getParameter(paramName));
          forkJoin(observableList).subscribe(
            (data: any[]) => {
              data.forEach((param, index) => {
                console.log(param);
                console.log('loading parameter ' + component.parameterList[index]);
                component.us.updateSetting(String(component.parameterList[index]), param);
              });
            },
            error => {
              console.log(error);
            },
            () => {
              this.router.navigate(['login']);
            }
          );
        });
    } else {
      this.router.navigate(['login']);
    }
  }

  loadParameterList() {
    return this.lps.getParameter('CLIENT_SETTINGS');
  }

}
