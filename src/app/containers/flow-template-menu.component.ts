import { Component, OnInit, Inject, ElementRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Store } from 'redux';

import * as $ from 'jquery';
import * as _ from 'lodash';
import * as moment from 'moment';

import { genGuid } from '../utilites/gen-guid';
import { formatJson } from '../utilites/format-json';

import { 
  ActivityConnectionData, 
  ActivityNodeData, 
  ActivityNodeDataObj,
  FlowPropertyBase
} from '../models/flow-data-def';

import { FlowTemplateMetaService } from '../services/flow-template-meta.service';
import { PropertyControlService } from '../services/property-control.service';

import { SimpleModalDialogComponent } from '../components/simple-modal-dialog.component'; 

import { AppStore } from '../app-store';

import {
  ActivityNodeDataActions,
  ActivityConnectionDataActions,
  FlowDataActions
} from '../actions';

import {
  AppState,
} from '../reducers';

enum CurrentOperation{
  import = 1,
  export,
}

@Component({
  selector: 'app-flow-template-menu',
  template: `
  <div class="ui mini inverted compact menu">
    <a class="item">新建</a>
    <a class="item" (click)="import(dialog)">导入</a>
    <a class="item" (click)="export(dialog)">导出</a>
    <a class="item" >保存</a>
    <a class="item">发布</a>
    <a class="item">清空</a>
    <a class="item">撤销</a>
    <a class="item">重做</a>
    <a class="item">删除</a>
    <a class="item">自动布局</a>
    <app-simple-modal-dialog #dialog [visible]="showDlg" (confirmed)="confirmed($event)">
      <textarea style="margin: 8px; height: 550px; width: 558px;"#ta
        (change)="setTaValue(ta)" >{{formattedFlowData}}
      </textarea>
    </app-simple-modal-dialog>
  </div>
  `
})
export class FlowTemplateMenuComponent implements OnInit {
  private currentOperation: CurrentOperation;
  private formattedFlowData: string;
  private taValue: string;
  private showDlg: boolean = false;
  constructor(
    @Inject(AppStore) private store: Store<AppState>) {

   }

  ngOnInit() {
  }

  export(dlg: any){
    const _state = this.store.getState();
    let _flowData = {};
    _flowData["basicInfo"] = _state.flowData.flowData.basicInfo;
    _flowData["advancedInfo"] = _state.flowData.flowData.advancedInfo;
    _flowData["customData"]={};
    _flowData["activityNodes"]={};
    _flowData["activityNodes"]["nodes"] = _state.activityDataNodes.activityNodeDatas;
    _flowData["activityConnections"]={};
    _flowData["activityConnections"]["connections"] = 
      _state.activityConnections.activityConnectionDatas;
    this.formattedFlowData = formatJson(JSON.stringify(_flowData));
    this.showDlg = true;
    // 似乎模板里的[visible]属性只在创建的时候生效,后续需要直接调用该属性
    dlg.visible = true; 
    this.currentOperation = CurrentOperation.export;
  }

  import(dlg: any){
    this.formattedFlowData="请在此处填入流程定义JSON字符串";
    this.showDlg = true;
    dlg.visible = true; 
    this.currentOperation = CurrentOperation.import;
  }

  setTaValue(ta: any){
    this.taValue = ta.value;
  }

  confirmed() {
    if (this.currentOperation == CurrentOperation.import) {
      // 确认导入流程模板数据
      let _flowData;
      try {
        _flowData = JSON.parse(this.taValue);
        // console.log(_flowData);

      } catch (e) {
        notie.alert(3, `导入流程模板数据失败:${e}`, 10);
        return;
      }
      console.log(_flowData);
      this.store.dispatch(
        FlowDataActions.populateFlowData(_flowData));
      this.store.dispatch(
        ActivityNodeDataActions.populateNodesData(
          _flowData.activityNodes.nodes
        )
      );
      this.store.dispatch(
        ActivityConnectionDataActions.populateConnectionsData(
         _flowData.activityConnections.connections
        )
      );
    }
  }
}
