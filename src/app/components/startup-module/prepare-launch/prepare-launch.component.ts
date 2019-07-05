import {Component, OnInit} from '@angular/core';
import {ParameterService} from '../../../services/parameter.service';
import {UserSettingsService} from '../../../services/user-settings.service';
import {Router} from '@angular/router';
import {DatabaseService} from '../../../services/database.service';
import {forkJoin} from 'rxjs';

@Component({
    selector: 'app-prepare-launch',
    templateUrl: './prepare-launch.component.html',
    styleUrls: ['./prepare-launch.component.css']
})
export class PrepareLaunchComponent implements OnInit {

    parameterList: string[] = [];

    constructor(private ps: ParameterService, private us: UserSettingsService,
                private ds: DatabaseService,
                private router: Router) {
    }

    ngOnInit() {
        const component = this;
        this.loadParameterList().subscribe(
            data => {
                console.log('init parameter list retrieved');
                console.log(data);
                this.parameterList = data.find(param => param.code === 'client_init').value;
            },
            error => {
                console.warn('error loading init parameter list');
            },
            () => {
                const observableList = this.parameterList.map(paramName => component.ps.getParameter(paramName));
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
    }

    loadParameterList() {
        return this.ps.getParameter('CLIENT_SETTINGS');
    }

}
