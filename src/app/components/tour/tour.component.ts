import {Component, Input, OnInit} from '@angular/core';
import * as introJs from 'intro.js/intro.js';
import {Router} from '@angular/router';

@Component({
  selector: 'app-tour',
  templateUrl: './tour.component.html',
  styleUrls: ['./tour.component.css']
})
export class TourComponent implements OnInit {
  introJS = introJs();

  @Input() tour: string;

  constructor(private router: Router) { }

  ngOnInit() {
    console.log(this.router.url);
  }

  getIntroOptions() {
    switch (this.tour) {
      case 'login':
        return {
          steps: [
            {
              intro: 'You are now at the login page.'
            },
            {
              element: '#tour-select-location',
              intro: 'Please select an option matching your current operating site.'
            },
            {
              element: '#tour-select-instrument',
              intro: 'Please select an option matching your current operating instrument.'
            },
            {
              element: '#tour-user-id',
              intro: 'Please enter your allocated username for login.'
            },
            {
              element: '#tour-user-password',
              intro: 'Please enter your password.'
            },
            {
              element: '#tour-confirm-login',
              intro: 'Once you have completed all fields above, the login button will be enabled for you to continue.'
            }
          ]
        };
      case 'settings':
        return {
          steps: [
            {
              intro: 'You are now at the general settings page.'
            },
            {
              element: '#tour-data-directory',
              intro: 'Please select the directory where your record data and files can be locally saved to.'
            },
            {
              element: '#tour-api-root',
              intro: 'Please enter corresponding LabPipe server host address, then click validate to check the connection.'
            },
            {
              element: '#tour-api-token',
              intro: 'Please enter your allocated access token and key, then click validate to check the connection.'
            },
            {
              element: '#tour-monitor-interval',
              intro: 'This is how frequent the tool checks connection to the server. Please note this is in milliseconds.'
            },
            {
              element: '#tour-retry-interval',
              intro: 'This is how frequent the tool retries connection to the server when there is difficulty. ' +
                'Please note this is in milliseconds.'
            }
          ]
        };
      case 'tasks':
        return {
          steps: [
            {
              intro: 'You are now at the tasks portal.'
            },
            {
              element: '#tour-select-study',
              intro: 'Please select a study, then click start to continue.'
            }
          ]
        };
    }
  }

  startTour() {
    const option = this.getIntroOptions();
    this.introJS.setOptions(option);
    this.introJS.start();
  }

}
