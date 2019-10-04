import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {UserSettingsService} from '../../../services/user-settings.service';

@Component({
    selector: 'app-dynamic-sample-collection-wizard',
    templateUrl: './dynamic-sample-collection-wizard.component.html',
    styleUrls: ['./dynamic-sample-collection-wizard.component.css']
})
export class DynamicSampleCollectionWizardComponent implements OnInit {
    studyForm: FormGroup;
    projects$: any[];
    currentLocation: any;
    currentInstrument: any;

    constructor(private us: UserSettingsService,
                private formBuilder: FormBuilder, private router: Router) {
        this.studyForm = this.formBuilder.group({
            study: ['', Validators.required]
        });
    }

    ngOnInit() {
        this.currentLocation = this.us.getCurrentLocation();
        this.currentInstrument = this.us.getCurrentInstrument();
        this.projects$ = this.us.getStudies()
        .filter(p => p.config.location
            .includes(this.currentLocation.identifier) && p.config.instrument.includes(this.currentInstrument.identifier));
    }

    showDataCollectionForm() {
        if (this.studyForm.valid) {
            this.us.updateCurrentStudy(this.studyForm.get('study').value);
            this.router.navigate(['dynamic-form-wizard']);
        }
    }

}
