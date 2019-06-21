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
                this.parameterList = data.find(param => param.param_name === 'client_init').param_value;
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
        return this.ps.getParameter('CLIENT_SETTING');
    }

    // startParameterChain() {
    //   this.prepareFacility();
    // }
    //
    // prepareFacility() {
    //
    //   this.ps.getFacility().subscribe(
    //     data => {
    //       console.log('facility parameter up-to-date');
    //       this.ss.updateFacility(data);
    //     },
    //     () => {
    //       console.log('error getting up-to-date facility');
    //       this.prepareInstruments();
    //     },
    //     () => this.prepareInstruments()
    //   );
    // }
    //
    // prepareInstruments() {
    //   this.ps.getInstruments().subscribe(
    //     data => {
    //       console.log('supported_instrument up-to-date');
    //       this.ss.updateSupportedInstruments(data);
    //     },
    //     () => {
    //       console.log('error getting up-to-date supported_instruments');
    //       this.prepareAdminOpreators();
    //     },
    //     () => {
    //       this.prepareAdminOpreators();
    //     }
    //   );
    // }
    //
    // prepareAdminOpreators() {
    //   this.ps.getAdminOperator().subscribe(
    //     data => {
    //       console.log('admin_operators parameter up-to-date');
    //       this.ss.updateAdminOperators(data);
    //     },
    //     () => {
    //       console.log('error getting up-to-date admin_operators');
    //       this.prepareProjects();
    //     },
    //     () => this.prepareProjects()
    //
    //   );
    // }
    //
    // prepareProjects() {
    //   this.ps.getStudies().subscribe(
    //     data => {
    //       console.log('projects parameter up-to-date');
    //       this.ss.updateSupportedProjects(data);
    //       data.projects.forEach(project => {
    //         if (project.tag !== undefined) {
    //           this.prepareProjectConfig(project.tag);
    //         }
    //       });
    //     },
    //     () => {
    //       console.log('error getting up-to-date projects');
    //       this.router.navigate(['login']);
    //     },
    //     () => {
    //       console.log('Preparation complete.');
    //       this.router.navigate(['login']);
    //     }
    //   );
    // }
    //
    // prepareProjectConfig(projectTag: string) {
    //   this.ps.getProjectConfigs(projectTag).subscribe(
    //     data => {
    //       console.log(projectTag, ' parameter up-to-date');
    //       this.ss.updateSetting(projectTag, data);
    //     }
    //   );
    // }

}
