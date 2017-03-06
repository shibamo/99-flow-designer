import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs';

import { AppConfigService } from './app-config.service';
import { LogonRequestInfo, UserInfo } from
  '../models/authentication-data-def';

@Injectable()
export class LogonBackendService {
  private headers = new Headers({ 'Content-Type': 'application/json' });

  constructor(private http: Http,
    private appConfig: AppConfigService) { }

  logon(value: LogonRequestInfo):
    Observable<UserInfo> {
    return this.http.post(
      this.appConfig.serverAddress + 'api/Home/Logon',
      value,
      { headers: this.headers })
      .map((r: Response) => {
        this.outputMonitorLog(r.json());
        return r.json() as UserInfo;
      })
      .catch(error => {
        console.error(error);
        return Observable.of<{}>(error);
      });
  }

  outputMonitorLog(data) {
    if (this.appConfig.logCommunication) {
      console.log(data);
    }
  }
}