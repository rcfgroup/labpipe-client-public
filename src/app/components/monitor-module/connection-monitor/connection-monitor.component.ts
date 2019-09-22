import {Component, OnDestroy, OnInit} from '@angular/core';
import {fromEvent, Observable, Subscription, timer} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {delay, retryWhen, switchMap, tap} from 'rxjs/operators';
import {UserSettingsService} from '../../../services/user-settings.service';

@Component({
  selector: 'app-connection-monitor',
  templateUrl: './connection-monitor.component.html',
  styleUrls: ['./connection-monitor.component.css']
})
export class ConnectionMonitorComponent implements OnInit, OnDestroy {
  onlineEvent: Observable<Event>;
  offlineEvent: Observable<Event>;
  networkConnectedStateSubscription: Subscription;
  networkDisconnectedStateSubscription: Subscription;
  serverStateSubscription: Subscription;

  networkConnected: boolean;
  serverConnected: boolean;
  url: string;

  constructor(private us: UserSettingsService, private http: HttpClient) {
    this.networkConnected = window.navigator.onLine;
    this.onlineEvent = fromEvent(window, 'online');
    this.offlineEvent = fromEvent(window, 'offline');
    this.monitorNetworkState();
    this.monitorServerState();
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    if (this.networkConnectedStateSubscription) {
      this.networkConnectedStateSubscription.unsubscribe();
    }
    if (this.networkDisconnectedStateSubscription) {
      this.networkDisconnectedStateSubscription.unsubscribe();
    }
    if (this.serverStateSubscription) {
      this.serverStateSubscription.unsubscribe();
    }
  }

  monitorNetworkState() {
    this.networkConnectedStateSubscription = this.onlineEvent.subscribe(() => {
      this.networkConnected = true;
      console.log('Connected to internet');
      this.monitorServerState();
    });

    this.networkDisconnectedStateSubscription = this.offlineEvent.subscribe(() => {
      this.networkConnected = false;
      console.log('No internet connection');
      this.us.updateRunningMode('local');
      this.monitorServerState();
    });
  }

  monitorServerState() {
    const apiRoot = this.us.getApiRoot();
    if (apiRoot) {
      this.url = apiRoot + '/api/general/connect/public';
    }
    if (this.url) {
    this.serverStateSubscription = timer(0, this.us.getServerMonitorInterval())
        .pipe(
            switchMap(() => this.http.head(this.url)),
            retryWhen(errors =>
                errors.pipe(
                    tap(() => {
                      this.serverConnected = false;
                      this.us.updateRunningMode('local');
                      console.log('No server connection');
                    }),
                    delay(this.us.getServerMonitorRetryInterval())
                )
            )
        )
        .subscribe(() => {
          this.serverConnected = true;
          console.log('Connected to server');
          this.us.updateRunningMode('server');
        });
    }
  }
}
