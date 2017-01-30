import { Component, OnInit, Input, forwardRef } from '@angular/core';
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

// 实现参考 https://medium.com/@tarik.nzl/angular-2-custom-form-control-with-validation-json-input-2b4cf9bc2d73#.grea4w1io
@Component({
  selector: 'app-role-user-selector',
  template: `
  <p-orderList [value]="roleAndUsers" (onReorder)="onReorder()" 
  [listStyle]="{'height':'8em', 'width':'16em'}">
    <template let-roleAndUser pTemplate="item">
      <div class="ui-helper-clearfix">
        <div style="font-size:12px;float:left;margin:0px 5px 0 0">
        {{roleAndUser.PaticipantType}}</div>      
        <div style="font-size:12px;float:right;margin:0px 5px 0 0">
        {{roleAndUser.PaticipantObj.name}}</div>
      </div>
    </template>
  </p-orderList>
  <button type="text" pButton (click)="showDialog()"  
    icon="fa-external-link-square" label="选择...">
  </button>

  <app-role-user-dialog [initial]="roleAndUsers" *ngIf="displayDialog"
  (valueChanged) = "updateRoleAndUsers($event)" [showDialog]="displayDialog"
  (dialogClosed) = "dialogClosed()">
  </app-role-user-dialog>
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RoleUserSelectorComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => RoleUserSelectorComponent),
      multi: true,
    }
  ]
})
export class RoleUserSelectorComponent
  implements OnInit, ControlValueAccessor, Validator {
  @Input() required: boolean = false;

  roleAndUsers: Paticipant[];
  displayDialog: boolean = false;

  showDialog() {
    this.displayDialog = true;
  }

  dialogClosed(){
    this.displayDialog = false;
  }

  updateRoleAndUsers(event) {
    this.roleAndUsers = event;
    this.propagateChange(this.roleAndUsers);
    this.displayDialog = false;
  }

  constructor(private orgService: OrgDataService) { }

  ngOnInit() {
    this.roleAndUsers = [];
  }

  onReorder() {
    this.propagateChange(this.roleAndUsers);
  }

  // 以下为ControlValueAccessor的实现,具体阅读实现参考/|\
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

  // 以下为Validator的实现,具体阅读实现参考/|\
  public validate(c: FormControl) {
    return !this.required ? null : {
      RoleUserSelectorError: {
        valid: false,
      },
    };
  }
}
