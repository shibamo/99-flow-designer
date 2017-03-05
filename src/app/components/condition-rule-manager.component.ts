import { Component, OnInit, Input, Inject, forwardRef } from '@angular/core';
import {
  FormGroup, FormControl,
  ControlValueAccessor, NG_VALUE_ACCESSOR,
  Validator, NG_VALIDATORS,
} from '@angular/forms';
import {
  OrderListModule, DialogModule, TabViewModule, DataTableModule,
  ContextMenuModule, MenuItem
} from 'primeng/primeng';
import * as _ from 'lodash';
import { Store } from 'redux';

import { UserDTO, RoleDTO }
  from '../models/master-data-def';

import { Paticipant, ConditionRule, ActivityConnectionData } from '../models/flow-data-def';

import { OrgDataService } from '../services/org-data.service';
import { FlowTemplateBackendService }
  from '../services/flow-template-backend.service';

import { AppStore } from '../app-store';

import {
  AppState,
} from '../reducers';

@Component({
  selector: 'app-condition-rule-manager',
  template: `
  <p-orderList [value]="rulesToChange" (onReorder)="onReorder()" 
  [listStyle]="{'height':'10em', 'width':'17em'}">
    <template let-rule pTemplate="item">
      <div class="ui-helper-clearfix">
        <div style="font-size:12px;float:left;margin-left:2px;">
        {{rule.name | slice:0:7}}...</div>      
        <div style="font-size:12px;float:right;margin-right:2px;">
        {{getConnectionNameFromGuid(rule.connectionGuid) | slice:0:7}}...</div>     
       </div>      
    </template>
  </p-orderList>
  <button type="text" pButton (click)="showDialog()" 
    icon="fa-edit" label="管理..." 
    style="margin-top: 2px; margin-bottom: 5px;">
  </button>

  <p-dialog header="管理自动规则集" [appendTo]="'body'" width=720 
  [closable]="false" [dismissableMask]="true" [modal]="true"
  [(visible)]="displayRulesDialog" >

    <p-dataTable [value]="rules" selectionMode="single" 
    [(selection)]="selectedRule"
    [paginator]="false" [responsive]="true" [contextMenu]="cm">
      <p-column field="name" header="规则名" ></p-column>
      <p-column field="connection" header="连接名" >
        <template let-col let-rule="rowData" pTemplate="body">
          {{getConnectionNameFromGuid(rule.connectionGuid)}}
        </template>      
      </p-column>
      <p-column field="roles" header="角色/用户" >
        <template let-col let-rule="rowData" pTemplate="body">
          {{getPaticipantsInfo(rule.paticipants)}}
        </template>           
      </p-column>
      <p-column field="roles" header="默认退出?" >
        <template let-col let-rule="rowData" pTemplate="body">
          {{rule.isDefault ? "是" : "否"}}
        </template>           
      </p-column>      

      <p-footer>
        <div class="ui-helper-clearfix" style="width:100%">
          <button type="button" pButton icon="fa-plus" style="float:left" 
          (click)="showDialogToAdd()" label="增 加"></button>
          <button type="button" pButton icon="fa-flag-checkered" 
          style="float:left" class="ui-button-warning"
          (click)="checkCodes()" label="C#脚本语法检查"></button>
          <button type="button" pButton icon="fa-close" style="float:right" 
          (click)="cancel()" class="ui-button-secondary" label="取 消"></button>            
          <button type="button" pButton icon="fa-check" style="float:right" 
          (click)="confirm()"  label="确 定"></button>
   
        </div>
      </p-footer>
      
    </p-dataTable>
    <p-contextMenu #cm [model]="menuItems" [appendTo]="'body'"></p-contextMenu>
    
  </p-dialog>
  
  <app-condition-rule-editor *ngIf="displaySingleRuleDialog" 
    [initialRule] = "ruleToEdit"
    (valueChanged) = "newOrUpdateRule($event)" 
    (editorClosed) = "editorClosed()">
  </app-condition-rule-editor>
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ConditionRuleManagerComponent),
      multi: true,
    },
  ]
})
export class ConditionRuleManagerComponent
  implements OnInit, ControlValueAccessor {

  @Input() required: boolean = false;
  // @Input() 

  // 缓存数组用于获取
  allActivityConnections: ActivityConnectionData[];
  rules: ConditionRule[] = [];
  rulesToChange: ConditionRule[] = [];
  displayRulesDialog: boolean = false;
  displaySingleRuleDialog: boolean = false;
  menuItems: MenuItem[];
  selectedRule: ConditionRule;
  ruleToEdit: ConditionRule;

  showDialog() {
    this.displayRulesDialog = true;
  }

  showChildDialog() {
    this.displaySingleRuleDialog = true;
  }

  onReorder() {
    this.propagateChange(this.rules);
  }

  showDialogToAdd() {
    this.ruleToEdit = null;
    this.displaySingleRuleDialog = true;
  }

  confirm() {
    this.rulesToChange = this.rules;
    this.displayRulesDialog = false;
  }

  cancel() {
    this.displayRulesDialog = false;
  }

  newOrUpdateRule(rule: ConditionRule) {
    let oldRuleIndex = _.findIndex(this.rules, _rule => {
      return _rule.guid == rule.guid;
    });
    if (oldRuleIndex >= 0) { // Replace
      this.rules.splice(oldRuleIndex, 1, rule);
    } else { // Push to the tail
      this.rules.push(rule);
    }
    this.propagateChange(this.rules);
  }

  editorClosed() {
    this.displaySingleRuleDialog = false;
  }

  checkCodes() {
    notie.alert(3, "尚未实现!", 3);
  }

  constructor( @Inject(AppStore) private store: Store<AppState>, ) { }

  ngOnInit() {
    this.menuItems = [
      {
        label: '编辑', icon: 'fa-edit', command: (event) => {
          this.ruleToEdit = this.selectedRule;
          this.displaySingleRuleDialog = true;
        }
      },
      {
        label: '删除', icon: 'fa-close', command: (event) => {
          this.rules.splice(this.rules.findIndex(rule => {
            return rule.guid == this.selectedRule.guid;
          }), 1);
          this.propagateChange(this.rules);
        }
      },
      {
        label: '上移', icon: 'fa-level-up', command: (event) => {
          let idx = this.rules.findIndex(rule => {
            return rule.guid == this.selectedRule.guid;
          });
          if (idx != 0) {
            let rule = this.rules.splice(idx, 1)[0];
            this.rules.splice(idx - 1, 0, rule);
            this.propagateChange(this.rules);
          }
        }
      },
      {
        label: '下移', icon: 'fa-level-down', command: (event) => {
          let idx = this.rules.findIndex(rule => {
            return rule.guid == this.selectedRule.guid;
          });
          if (idx != this.rules.length - 1) {
            let rule = this.rules.splice(idx, 1)[0];
            this.rules.splice(idx + 1, 0, rule);
            this.propagateChange(this.rules);
          }
        }
      }
    ];

    const _state = this.store.getState();
    this.allActivityConnections = _state.activityConnections.
      activityConnectionDatas;
  }

  // 以下为ControlValueAccessor的实现,具体阅读实现参考/|\
  private propagateChange = (_: any) => { };
  public writeValue(obj: any) {
    if (obj) {
      this.rulesToChange = obj;
      this.rules = _.cloneDeep(this.rulesToChange);
    }
  }
  get value(): any {
    return this.rulesToChange;
  };
  set value(v: any) {
    if (v !== this.rulesToChange) {
      this.rulesToChange = v;
      this.rules = _.cloneDeep(this.rulesToChange);
      this.propagateChange(v);
    }
  }
  public registerOnChange(fn: any) {
    this.propagateChange = fn;
  }
  public registerOnTouched() { }

  // 以下为辅助函数
  private getConnectionNameFromGuid(guid: string): string {
    let _conn = _.find(this.allActivityConnections, conn => {
      return conn.guid === guid;
    });
    return (_conn && _conn.name) || '';
  }

  private getPaticipantsInfo(paticipants: Paticipant[]): string {
    return paticipants.map(p => p.PaticipantObj.name).reduce(
      (prev, current) => { return prev + current + "; " }, ""
    );
  }
}
