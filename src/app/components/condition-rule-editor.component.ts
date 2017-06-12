import {
  Component, OnInit, Inject, Input, forwardRef,
  EventEmitter, Output, OnChanges, SimpleChange
}
  from '@angular/core';

import {
  FormGroup, FormControl, FormsModule,
  ControlValueAccessor, NG_VALUE_ACCESSOR,
  Validator, NG_VALIDATORS,
} from '@angular/forms';

import { Store } from 'redux';

import {
  DialogModule, DataTableModule, DataListModule, DropdownModule,
  SharedModule, CheckboxModule, SelectItem, Dropdown
}
  from 'primeng/primeng';
import * as _ from 'lodash';

import { genGuid } from './../utilites/gen-guid';
import { UserDTO, RoleDTO }
  from '../models/master-data-def';
import { Paticipant, ConditionRule, ActivityNodeData }
  from '../models/flow-data-def';

import { FlowTemplateBackendService }
  from '../services/flow-template-backend.service';
import { MyBase64 }
  from '../services/webtookit-base64.service';

import { AppStore } from '../app-store';

import {
  AppState,
} from '../reducers';

@Component({
  selector: 'app-condition-rule-editor',
  template: `
  <p-dialog header="定义自动规则" [appendTo]="'body'" width=600 
  [closable]="false" [dismissableMask]="true" [modal]="true"
  [(visible)]="displayDialog">
    <!--规则名-->
    <input type="text"  [(ngModel)]="ruleName" 
    placeholder="请输入规则名" style="width: 240px; margin-right: 20px;"> 
    <p-checkbox [(ngModel)]="isDefault" binary="true"
    label="是否为最终逃出规则?(只能有一个)"></p-checkbox><p></p>

    <!--规则匹配时对应生效的连接-->
    <p-dropdown [options]="connections" [style]="{'width':'400px'}"
    [(ngModel)]="selectedConnection">
    </p-dropdown> <p></p>
    
    <!--将由流程引擎动态执行的C#脚本代码-->
    <textarea style="height: 100px; width: 556px;"
      [(ngModel)]="codeDecoded" ></textarea> <br/>

    <!--目标角色与用户列表-->
    <p-dataList [value]="roleAndUsers" [paginator]="true" [rows]="5">
      <p-header>目标角色与用户列表</p-header>
      <template let-roleAndUser pTemplate="item">
        <div class="ui-helper-clearfix">
          <div style="font-size:12px;float:left;margin-left:10px;">
          {{roleAndUser.PaticipantObj.name}}</div>      
          <div style="font-size:12px;float:right;margin-right:10px;">
          {{roleAndUser.PaticipantType}}</div>
        </div>
      </template>
      <p-footer>
        <button type="text" pButton (click)="showRoleUserDialog()"  
          icon="fa-user-circle-o" label="选择角色/用户...">
        </button>
      </p-footer>
    </p-dataList>

    <app-role-user-dialog [initial]="roleAndUsers" *ngIf="displayRoleUserDialog"
    (valueChanged) = "updateRoleAndUsers($event)" [showDialog]="displayRoleUserDialog"
    (dialogClosed) = "roleuserDialogClosed()">
    </app-role-user-dialog> <br/>

    <!--返回按钮-->
    <div class="pull-right">
      <button pButton type="button" (click)="confirmed()" 
      label="确 定" [disabled]="!validate()"></button>
      <button pButton type="button" (click)="canceled()" 
      label="取 消" class="ui-button-secondary"></button>
    </div>
   </p-dialog>
  `
})
export class ConditionRuleEditorComponent implements OnInit {

  @Input() initialRule: ConditionRule;
  @Output() private valueChanged = new EventEmitter<any>();
  @Output() private editorClosed = new EventEmitter<any>();

  rule: ConditionRule;
  ruleName: string;
  isDefault = false;
  code: string;         // base64 encoded
  codeDecoded: string;  // base64 decoded
  displayRoleUserDialog = false;
  roleAndUsers: Paticipant[];
  displayDialog = true;
  connections: SelectItem[];
  selectedConnection: any;
  allActivitys: ActivityNodeData[];

  constructor( @Inject(AppStore) private store: Store<AppState>,
    private base64Service: MyBase64) {
    const _state = this.store.getState();
    this.allActivitys = _state.activityDataNodes.activityNodeDatas;
  }

  ngOnInit() {
    // 建立可选的当前活动节点出口连接列表
    this.initConnectionsDropDown();

    if (this.initialRule) {
      this.selectedConnection = this.initialRule.connectionGuid;
      this.ruleName = this.initialRule.name;
      this.code = this.initialRule.code;
      this.codeDecoded = this.base64Service.decode(this.code);
      this.roleAndUsers = this.initialRule.paticipants;
      this.isDefault = this.initialRule.isDefault;
    } else {
      this.ruleName = '未命名规则' + Date.now().toString();
      this.isDefault = false;
      this.codeDecoded = `//规则判断与执行脚本代码, 'return true;' 代表该规则将适用.
        var i = 0`;
      this.code = this.base64Service.encode(this.codeDecoded);
    }

  }

  confirmed() {
    if (this.initialRule) {
      this.rule = this.initialRule;
    } else {
      this.rule = <ConditionRule>{ guid: genGuid() };
    }
    const rule = this.rule;
    rule.name = this.ruleName;
    rule.isDefault = this.isDefault;
    rule.code = this.base64Service.encode(this.codeDecoded);
    rule.connectionGuid = this.selectedConnection;
    rule.paticipants = this.roleAndUsers;
    // console.info(rule);
    this.valueChanged.emit(rule);
    this.editorClosed.emit();
  }

  canceled() {
    this.editorClosed.emit();
  }

  // 以下为角色用户列表处理
  showRoleUserDialog() {
    this.displayRoleUserDialog = true;

  }
  updateRoleAndUsers(event) {
    this.roleAndUsers = event;
    this.displayRoleUserDialog = false;
  }
  roleuserDialogClosed() {
    this.displayRoleUserDialog = false;
  }

  // 以下为辅助函数
  validate(): boolean {
    return this.ruleName && this.codeDecoded && this.selectedConnection
      && this.roleAndUsers && this.roleAndUsers.length > 0;
  }
  private initConnectionsDropDown() {
    const _state = this.store.getState();
    const currentNodeGuid =
      _state.activityDataNodes.currentNodeGuid;
    const _allConns =
      _state.activityConnections.activityConnectionDatas;
    const _potentialConnections = _.filter(_allConns,
      (_conn) => { return _conn.fromGuid === currentNodeGuid; });
    this.connections = [];
    this.connections.push({ label: '选择连接', value: null });
    this.connections.push(..._.map(_potentialConnections, (_conn) => {
      return {
        label: _conn.name + ' -> ' +
        this.getActivityNodeNameFromGuid(_conn.toGuid),
        value: _conn.guid
      };
    }));
  }
  private getActivityNodeNameFromGuid(guid: string): string {
    return _.find(this.allActivitys, node => {
      return node.guid === guid;
    }).name;
  }
}
