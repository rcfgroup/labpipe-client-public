import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {UserSettingsService} from './user-settings.service';

@Injectable({providedIn: 'root'})
export class ParameterService {

  private apiConnected: boolean;
  private apiUrl: string;
  private requestOptions: any = {};

  constructor(
    private http: HttpClient,
    private us: UserSettingsService
  ) {
    if (this.us.getApiRoot()) {
      this.apiConnected = true;
      this.apiUrl = this.us.getApiRoot() + '/api/parameter/name/';
    }
    if (this.us.getCurrentOperator() && this.us.getCurrentOperatorPassword()) {
      this.requestOptions = {
        headers: new HttpHeaders({
          Authorization: btoa(this.us.getCurrentOperator().username + ':' + this.us.getCurrentOperatorPassword())
        })
      };
    } else if (this.us.getApiToken() && this.us.getApiKey()) {
      this.requestOptions = {
        headers: new HttpHeaders({
          Authorization: btoa(this.us.getApiToken() + ':' + this.us.getApiKey())
        })
      };
    }
  }

  getParameter(paramName: string): Observable<any> {
    const url = this.apiUrl + paramName;
    return this.http.get(url, this.requestOptions);
  }

}
