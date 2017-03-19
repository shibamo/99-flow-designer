import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs';

import { AppConfigService } from './app-config.service';
import {
  OrgDTO, OrgSchemaDTO,
  BizEntityDTO, BizEntitySchemaDTO,
  DepartmentDTO, RoleDTO, UserDTO, RoleTypeDTO,
  DepartmentUserRelation, UserPositionToDepartment,
  FlowDynamicUserDTO
}
  from '../models/master-data-def';

@Injectable()
export class OrgDataService {
  private headers = new Headers({ 'Content-Type': 'application/json' });

  constructor(private http: Http,
    private appConfig: AppConfigService) { }

  getOrgs(): Observable<OrgDTO[]> {
    return this.http
      .get(this.appConfig.serverAddress + 'api/OM_Org',
      { headers: this.headers })
      .map((r: Response) => {
        this.outputMonitorLog(r.json());
        return r.json() as OrgDTO[];
      })
      .catch(error => {
        console.error(error);
        return Observable.of<OrgDTO[]>([]);
      });
  }

  getOrgSchmas(orgId: number): Observable<OrgSchemaDTO[]> {
    return this.http
      .get(this.appConfig.serverAddress + 'api/OM_Org/GetOrgSchemas/' + orgId,
      { headers: this.headers })
      .map((r: Response) => {
        this.outputMonitorLog(r.json());
        return r.json() as OrgSchemaDTO[];
      })
      .catch(error => {
        console.error(error);
        return Observable.of<OrgSchemaDTO[]>([]);
      });
  }

  getBizEntity(bizEntityId: number): Observable<BizEntityDTO> {
    return this.http
      .get(this.appConfig.serverAddress +
      'api/OM_BizEntity/' + bizEntityId,
      { headers: this.headers })
      .map((r: Response) => {
        this.outputMonitorLog(r.json());
        return r.json() as BizEntityDTO;
      })
      .catch(error => {
        console.error(error);
        return Observable.of<BizEntityDTO>(null);
      });
  }

  getBizEntityShema(bizEntitySchemaId: number):
    Observable<BizEntitySchemaDTO> {
    return this.http
      .get(this.appConfig.serverAddress +
      'api/OM_BizEntitySchema/' + bizEntitySchemaId,
      { headers: this.headers })
      .map((r: Response) => {
        this.outputMonitorLog(r.json());
        return r.json() as BizEntitySchemaDTO;
      })
      .catch(error => {
        console.error(error);
        return Observable.of<BizEntitySchemaDTO>(null);
      });
  }

  getDepartment(departmentId: number): Observable<DepartmentDTO> {
    return this.http
      .get(this.appConfig.serverAddress +
      'api/OM_Department/' + departmentId,
      { headers: this.headers })
      .map((r: Response) => {
        this.outputMonitorLog(r.json());
        return r.json() as DepartmentDTO;
      })
      .catch(error => {
        console.error(error);
        return Observable.of<DepartmentDTO>(null);
      });
  }

  getUser(userId: number): Observable<UserDTO> {
    return this.http
      .get(this.appConfig.serverAddress +
      'api/OM_User/' + userId,
      { headers: this.headers })
      .map((r: Response) => {
        this.outputMonitorLog(r.json());
        return r.json() as UserDTO;
      })
      .catch(error => {
        console.error(error);
        return Observable.of<UserDTO>(null);
      });
  }

  getAllValidUsers(): Observable<UserDTO[]> {
    return this.http
      .get(this.appConfig.serverAddress + 'api/OM_User/',
      { headers: this.headers })
      .map((r: Response) => {
        this.outputMonitorLog(r.json());
        return r.json() as UserDTO[];
      })
      .catch(error => {
        console.error(error);
        return Observable.of<UserDTO[]>(null);
      });
  }

  getUser_DepartmentUserRelations(userId: number):
    Observable<DepartmentUserRelation[]> {
    return this.http
      .get(this.appConfig.serverAddress +
      'api/OM_User/GetDepartmentUserRelations/' + userId,
      { headers: this.headers })
      .map((r: Response) => {
        this.outputMonitorLog(r.json());
        return r.json() as DepartmentUserRelation[];
      })
      .catch(error => {
        console.error(error);
        return Observable.of<DepartmentUserRelation[]>(null);
      });
  }

  getRoles(): Observable<RoleDTO[]> {
    return this.http
      .get(this.appConfig.serverAddress + 'api/OM_Role',
      { headers: this.headers })
      .map((r: Response) => {
        this.outputMonitorLog(r.json());
        return r.json() as RoleDTO[];
      })
      .catch(error => {
        console.error(error);
        return Observable.of<RoleDTO[]>([]);
      });
  }

  getRole(roleId: number): Observable<RoleDTO> {
    return this.http
      .get(this.appConfig.serverAddress +
      'api/OM_Role/' + roleId,
      { headers: this.headers })
      .map((r: Response) => {
        this.outputMonitorLog(r.json());
        return r.json() as RoleDTO;
      })
      .catch(error => {
        console.error(error);
        return Observable.of<RoleDTO>(null);
      });
  }

  getFlowDynamicUsers(): Observable<FlowDynamicUserDTO[]> {
    return this.http
      .get(this.appConfig.serverAddress + 'api/FlowDynamicUser',
      { headers: this.headers })
      .map((r: Response) => {
        this.outputMonitorLog(r.json());
        return r.json() as FlowDynamicUserDTO[];
      })
      .catch(error => {
        console.error(error);
        return Observable.of<FlowDynamicUserDTO[]>([]);
      });
  }

  outputMonitorLog(data) {
    if (this.appConfig.logCommunication) {
      console.log(data);
    }
  }
}
