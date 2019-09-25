import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {UserSettingsService} from '../../../services/user-settings.service';
import {ElectronService} from 'ngx-electron';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})

export class LoginPageComponent implements OnInit {
  locations$: any[];
  instruments$: any[];
  operators$: any[];

  currentOperator: any;
  loginForm: FormGroup;
  selectedLocation: any;
  selectedInstrument: any;
  appVersion: string;

  confirmLoginDialogOpened = false;
  incorrectLoginDialogOpened = false;


  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private us: UserSettingsService,
              private es: ElectronService) {
    this.loginForm = this.formBuilder.group({
      location: ['', Validators.required ],
      instrument: ['', Validators.required ],
      operator: ['', Validators.required ],
      password: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.appVersion = this.us.getSetting('version');
    this.locations$ = this.us.getLocations();
    this.instruments$ = this.us.getInstruments();
    this.operators$ = this.us.getOperators();

    this.selectedLocation = this.us.getCurrentLocation();
    this.selectedInstrument = this.us.getCurrentInstrument();
    this.loginForm.get('location').setValue(this.us.getCurrentLocation());
    this.loginForm.get('instrument').setValue(this.us.getCurrentInstrument());
    this.formChangeListener();
  }

  formChangeListener(): void {
    this.loginForm.valueChanges.subscribe(val => {
      this.selectedLocation = val.location;
      this.selectedInstrument = val.instrument;
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const u = this.loginForm.get('operator').value;
      const p = this.loginForm.get('password').value;
      const valid = this.tryLogin(u, p);
      if (valid) {
        console.log('valid login');
        this.confirmLoginDialogOpened = true;
      } else {
        console.log('invalid login');
        this.incorrectLoginDialogOpened = true;
      }

    } else {
      console.log('meow');
    }
  }

  tryLogin(username: string, password: string): boolean {
    username = username.toLowerCase();
    const user = this.operators$.filter(o => o.username.toLowerCase() === username);
    const bcrypt = this.es.remote.require('bcryptjs');
    const result = user.length === 1 && bcrypt.compareSync(password, user[0].passhash);
    if (result) {
      this.currentOperator = user[0];
      console.log('valid login');
    }
    console.log('invalid login');
    return result;
  }

  onConfirm(status: boolean) {
    this.confirmLoginDialogOpened = false;
    if (status) {
      this.us.updateCurrentLocation(this.loginForm.get('location').value);
      this.us.updateCurrentInstrument(this.loginForm.get('instrument').value);
      this.us.updateCurrentOperator(this.currentOperator);
      this.us.updateCurrentOperatorPassword(this.loginForm.get('password').value);
      this.router.navigate(['tasks']);
    }
  }

  onRetry() {
    this.incorrectLoginDialogOpened = false;
  }

}
