import {
  Component, OnInit, Input, forwardRef,
  EventEmitter, Output, OnChanges, SimpleChange
}
  from '@angular/core';
import {
  FormGroup, FormControl,
  ControlValueAccessor, NG_VALUE_ACCESSOR,
  Validator, NG_VALIDATORS,
} from '@angular/forms';
import { OrderListModule, DialogModule, TabViewModule } from 'primeng/primeng';
import * as _ from 'lodash';

import { UserDTO, RoleDTO }
  from '../models/master-data-def';

import { Paticipant } from '../models/flow-data-def';

import { OrgDataService } from '../services/org-data.service';

@Component({
  selector: 'app-role-user-dialog',
  template: `
  <p-dialog header="选择角色/用户" [appendTo]="'body'" width=720 height=540
  [closable]="false" [dismissableMask]="true" [modal]="true"
  [(visible)]="displayDialog" (onAfterHide)="afterHideDialog()">
    <p-tabView>
      <p-tabPanel header="角色列表">
        <div class="table" style="overflow-y: scroll; max-height:360px;">
          <table class="table table-striped table-hover table-condensed">
            <thead>
              <tr><th>姓名</th><th>英文名</th> <th>代码</th><th>用户列表</th>
              <th><i class="glyphicon glyphicon-ok text-success"></i></th></tr>
            </thead>
            <tbody>
              <tr *ngFor="let role of allRoles" (click)="toggleRole(role)"
              [ngClass]="{'success': isUserSelected(role)}" >
                <td>{{role.name}}</td>
                <td>{{role.englishName}}</td>
                <td>{{role.code}}</td>
                <td>{{getRoleUsers(role)}}</td>
                <td><i class="glyphicon glyphicon-ok text-success"
                *ngIf="isRoleSelected(role)"></i></td>
              </tr>
            </tbody>
          </table>
        </div>
      </p-tabPanel>
      <p-tabPanel header="用户列表">
        <div class="table" style="overflow-y: scroll; max-height:360px;">
          <table class="table table-striped table-hover table-condensed">
            <thead>
              <tr><th>姓名</th><th>英文名</th> <th>工号</th><th>部门</th><th>角色列表</th>
              <th><i class="glyphicon glyphicon-ok text-success"></i></th></tr>
            </thead>
            <tbody>
              <tr *ngFor="let user of allUsers" (click)="toggle(user)"
              [ngClass]="{'success': isUserSelected(user)}" >
                <td>{{user.name}}</td>
                <td>{{user.englishName}}</td>
                <td>{{user.code}}</td>
                <td>{{user.departmentNames}}</td>
                <td>{{user.roleNames}}</td>
                <td><i class="glyphicon glyphicon-ok text-success"
                *ngIf="isUserSelected(user)"></i></td>
              </tr>
            </tbody>
          </table>
        </div>
      </p-tabPanel>
    </p-tabView>

    <div class="pull-right">
      <button pButton type="button" (click)="confirmed()" 
      label="确 定" ></button>
      <button pButton type="button" (click)="canceled()" 
      label="取 消" class="ui-button-secondary"></button>
    </div>
  </p-dialog>
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RoleUserDialogComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => RoleUserDialogComponent),
      multi: true,
    }
  ]
})
export class RoleUserDialogComponent
  implements OnInit, ControlValueAccessor, OnChanges {

  @Input() initial;
  @Input() showDialog = true;
  @Output() private valueChanged = new EventEmitter<any>();
  @Output() private dialogClosed = new EventEmitter<any>();

  roleAndUsers: Paticipant[];
  displayDialog = true;

  private allUsers: UserDTO[] = [];
  private selectedUsers: UserDTO[] = [];

  private allRoles: RoleDTO[] = [];
  private selectedRoles: RoleDTO[] = [];

  constructor(private orgService: OrgDataService) { }

  ngOnInit() {
    this.orgService.getRoles().toPromise()
      .then(value => {
        this.allRoles = value;
      });

    this.orgService.getAllValidUsers().toPromise()
      .then(value => {
        this.allUsers = value;
      });
  }

  ngOnChanges(changes: { [propName: string]: SimpleChange }): void {
    this.roleAndUsers = this.initial;
    this.selectedUsers = _.filter(this.roleAndUsers, p => {
      return p.PaticipantType === 'user';
    }).map(p => { return <UserDTO>p.PaticipantObj; });
    this.selectedRoles = _.filter(this.roleAndUsers, p => {
      return p.PaticipantType === 'role';
    }).map(p => { return <RoleDTO>p.PaticipantObj; });
    if (changes['showDialog'].currentValue) {
      this.displayDialog = true;
    }
    // console.log(changes);
  }

  toggle(user: UserDTO) {
    if (_.find(this.selectedUsers, { userId: user.userId })) {
      _.remove(this.selectedUsers, { userId: user.userId });
    } else {
      this.selectedUsers.push(user);
    }
  }

  isUserSelected(user: UserDTO) {
    return _.find(this.selectedUsers, { userId: user.userId });
  }

  toggleRole(role: RoleDTO) {
    if (_.find(this.selectedRoles, { roleId: role.roleId })) {
      _.remove(this.selectedRoles, { roleId: role.roleId });
    } else {
      this.selectedRoles.push(role);
    }
  }

  isRoleSelected(role: RoleDTO) {
    return _.find(this.selectedRoles, { roleId: role.roleId });
  }

  getRoleUsers(role: RoleDTO) {
    return _.map(role.users, 'name');
  }

  confirmed() {
    this.roleAndUsers = [
      ...(_.map(this.selectedRoles,
        role => {
          return <Paticipant>{
            PaticipantType: 'role',
            PaticipantObj: <RoleDTO>{
              name: role.name,
              guid: role.guid,
              roleId: role.roleId
            }
          };
        })),
      ...(_.map(this.selectedUsers,
        user => {
          return <Paticipant>{
            PaticipantType: 'user',
            PaticipantObj: <UserDTO>{
              name: user.name,
              guid: user.guid,
              userId: user.userId
            }
          };
        })),
    ];
    this.propagateChange(this.roleAndUsers);
    this.valueChanged.emit(this.roleAndUsers);
    this.dialogClosed.emit();
  }

  canceled() {
    this.dialogClosed.emit();
  }

  afterHideDialog() {
    this.dialogClosed.emit();
  }

  // 以下为ControlValueAccessor的实现
  private propagateChange = (_: any) => { };
  public writeValue(obj: any) {
    if (obj) {
      this.roleAndUsers = obj;
    }
  }
  get value(): any {
    return this.roleAndUsers;
  };
  set value(v: any) {
    if (v !== this.roleAndUsers) {
      this.roleAndUsers = v;
      this.propagateChange(v);
    }
  }
  public registerOnChange(fn: any) {
    this.propagateChange = fn;
  }
  public registerOnTouched() { }

}
