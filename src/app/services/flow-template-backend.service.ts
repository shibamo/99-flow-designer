import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs';

import { AppConfigService } from './app-config.service';
import { FlowTemplateDTO } from '../models/master-data-def';

@Injectable()
export class FlowTemplateBackendService {
  private headers = new Headers({ 'Content-Type': 'application/json' });

  constructor(private http: Http,
    private appConfig: AppConfigService) { }

  getFlowTemplates(): Observable<FlowTemplateDTO[]> {
    return this.http.get(
      this.appConfig.serverAddress + 'api/FlowTemplate',
      { headers: this.headers })
      .map((r: Response) => {
        this.outputMonitorLog(r.json());
        return r.json() as FlowTemplateDTO[];
      })
      .catch(error => {
        console.error(error);
        return Observable.of<FlowTemplateDTO[]>([]);
      });
  }

  newFlowTemplate(value: FlowTemplateDTO):
    Observable<FlowTemplateDTO> {
    return this.http.post(
      this.appConfig.serverAddress + 'api/FlowTemplate',
      value,
      { headers: this.headers })
      .map((r: Response) => {
        this.outputMonitorLog(r.json());
        return r.json() as FlowTemplateDTO;
      })
      .catch(error => {
        console.error(error);
        return Observable.of<{}>(error);
      });
  }

  updateFlowTemplate(value: FlowTemplateDTO):
    Observable<FlowTemplateDTO> {
    return this.http.put(
      this.appConfig.serverAddress + 'api/FlowTemplate/' + value.guid,
      value,
      { headers: this.headers })
      .map((r: Response) => {
        this.outputMonitorLog(r.json());
        return r.json() as FlowTemplateDTO;
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
