import { Component, OnInit, Inject, ElementRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Store } from 'redux';

import { OrderListModule, DialogModule, TabViewModule, ButtonModule }
  from 'primeng/primeng';
import * as $ from 'jquery';
import * as _ from 'lodash';
import * as moment from 'moment';

import { genGuid } from '../utilites/gen-guid';
import { formatJson } from '../utilites/format-json';

import {
  FlowData,
  ActivityConnectionData,
  ActivityNodeData,
  ActivityNodeDataObj,
  FlowPropertyBase
} from '../models/flow-data-def';

import { FlowTemplateDTO } from '../models/master-data-def';

import { FlowTemplateMetaService } from
  '../services/flow-template-meta.service';
import { PropertyControlService } from
  '../services/property-control.service';
import { NewFlowTemplateSkeletonService } from
  '../services/new-flow-template-skeleton.service';
import { FlowTemplateBackendService } from
  '../services/flow-template-backend.service';
import { MyBase64 } from
  '../services/webtookit-base64.service';

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

enum CurrentOperation {
  import = 1,
  export,
}

@Component({
  selector: 'app-flow-template-menu',
  template: `
  <div class="ui mini inverted compact menu">
    <a class="item" (click)="create()">新建</a>
    <a class="item" (click)="import()">导入</a>
    <a class="item" (click)="export()">导出</a>
    <a class="item" (click)="open()">打开</a>
    <a class="item" (click)="createInBackend()">提交为新版本</a>
    <a class="item" (click)="updateInBackend()">提交修改</a>
    <a class="item">发布(n/a)</a>
    <a class="item">清空(n/a)</a>
    <!--
    <a class="item">撤销</a>
    <a class="item">重做</a>
    <a class="item">删除</a>
    <a class="item">自动布局</a> -->

    <p-dialog header="选择流程模板" [(visible)]="showChooseTemplatesDlg" 
    appendTo="body" width="700" modal="true">
      <p-dataTable [value]="flowTemplates" selectionMode="single" [(selection)]="selectedTemplate">
          <p-column field="displayName" header="流程显示名称"></p-column>
          <p-column field="code" header="流程代码"></p-column>
          <p-column field="version" header="版本"></p-column>
          <p-column field="isPublished" header="已发布?"></p-column>
      </p-dataTable><br/>
      <div class="pull-right">
        <button pButton type="button" (click)="confirmOpenTemplate()" label="确 定" 
        *ngIf="selectedTemplate"></button>
        <button pButton type="button" (click)="cancelOpenTemplate()" 
        label="关 闭" class="ui-button-secondary"></button>
      </div>  
    </p-dialog>
    
    <p-dialog header="流程模板 - 需要将文本中的#x-x#替换为\\n" 
    [(visible)]="showDlg" modal="true" appendTo="body">
      <textarea style="height: 360px; width: 480px;"
        [(ngModel)]="taValue" placeholder="此处填入流程定义JSON字符串"></textarea>    <br/>
      <div class="pull-right">
        <button pButton type="button" (click)="confirmed()" label="确 定" 
        *ngIf="currentOperation==1 && taValue"></button>
        <button pButton type="button" (click)="canceled()" 
        label="关 闭" class="ui-button-secondary"></button>
      </div>
    </p-dialog>
  </div>
  `
})
export class FlowTemplateMenuComponent implements OnInit {
  private currentOperation: CurrentOperation;
  private formattedFlowData: string;
  public taValue: string;
  public showDlg = false;
  public showChooseTemplatesDlg = false;
  public flowTemplates: FlowTemplateDTO[];
  public selectedTemplate: FlowTemplateDTO;

  constructor(
    @Inject(AppStore) private store: Store<AppState>,
    @Inject(NewFlowTemplateSkeletonService)
    private newFlowTemplateSkeletonService:
      NewFlowTemplateSkeletonService,
    private flowTemplateBackendService:
      FlowTemplateBackendService) {}

  ngOnInit() {
  }

  create() {
    let _flowData = <FlowData>this.newFlowTemplateSkeletonService.
      getNewFlowTemplateSkeletonObj();
    this.updateFlowDataToStore(_flowData);
  }

  export() {
    const _state = this.store.getState();
    let _flowData = this.cloneFlowData();
    this.taValue = formatJson(JSON.stringify(_flowData));
    this.showDlg = true;
    this.currentOperation = CurrentOperation.export;
  }

  import() {
    this.taValue = '';
    this.showDlg = true;
    this.currentOperation = CurrentOperation.import;
  }

  canceled() {
    this.showDlg = false;
  }

  confirmed() {
    if (this.currentOperation === CurrentOperation.import &&
      this.taValue) {
      // 确认导入流程模板数据
      let _flowData;
      try {
        _flowData = JSON.parse(this.taValue);
      } catch (e) {
        notie.alert(3, `导入流程模板数据失败:${e}`, 10);
        return;
      }

      this.updateFlowDataToStore(_flowData);

      this.showDlg = false;
    }
  }

  open() {
    this.flowTemplateBackendService.getFlowTemplates().toPromise()
      .then(value => {
        this.flowTemplates = value;
        this.showChooseTemplatesDlg = true;
      });
  }

  createInBackend() {
    let _flowData = this.cloneFlowData();
    _flowData.basicInfo.guid = genGuid();
    this.flowTemplateBackendService.newFlowTemplate({
      guid: _flowData.basicInfo.guid,
      name: _flowData.basicInfo.name,
      createTime: new Date(Date.now()),
      displayName: _flowData.basicInfo.displayName,
      version: _flowData.basicInfo.version,
      flowTemplateJson: JSON.stringify(_flowData),
      code: _flowData.basicInfo.code,
      indexNumber: '0',
    }).toPromise()
      .then(value => {
        // console.info(value);
        if (value.flowTemplateId) { // 成功创建

        } else {
          notie.alert(3, `保存流程模板数据失败:${value['_body']}`, 20);
        }
      });
  }

  updateInBackend() {
    let _flowData = this.cloneFlowData();
    this.flowTemplateBackendService.updateFlowTemplate({
      guid: _flowData.basicInfo.guid,
      name: _flowData.basicInfo.name,
      createTime: new Date(Date.now()),
      displayName: _flowData.basicInfo.displayName,
      version: _flowData.basicInfo.version,
      flowTemplateJson: JSON.stringify(_flowData),
      code: _flowData.basicInfo.code,
      indexNumber: '0',
    }).toPromise()
      .then(value => {
        // console.info(value);
      });
  }

  confirmOpenTemplate() {
    let _flowData;
    let _flowTemplateJson: string;
    try {
      _flowTemplateJson = this.selectedTemplate.flowTemplateJson;
      _flowData = JSON.parse(_flowTemplateJson);
      this.updateFlowDataToStore(_flowData);
      this.showChooseTemplatesDlg = false;
    } catch (e) {
      // console.info(_flowTemplateJson);
      notie.alert(3, `导入流程模板数据失败:${e}`, 10);
      return;
    }
    this.selectedTemplate = null;
  }

  cancelOpenTemplate() {
    this.selectedTemplate = null;
    this.showChooseTemplatesDlg = false;
  }

  private updateFlowDataToStore(flowData: FlowData) {
    this.store.dispatch(
      FlowDataActions.populateFlowData(flowData));

    this.store.dispatch(
      ActivityNodeDataActions.populateNodesData(
        flowData.activityNodes.nodes
      )
    );

    this.store.dispatch(
      ActivityConnectionDataActions.populateConnectionsData(
        flowData.activityConnections.connections
      )
    );
  }

  private cloneFlowData(): FlowData {
    const _state = this.store.getState();
    let _flowData = {};
    _flowData['basicInfo'] = _state.flowData.flowData.basicInfo;
    _flowData['advancedInfo'] = _state.flowData.flowData.advancedInfo;
    _flowData['customData'] = {};
    _flowData['activityNodes'] = {};
    _flowData['activityNodes']['nodes'] = _state.activityDataNodes.activityNodeDatas;
    _flowData['activityConnections'] = {};
    _flowData['activityConnections']['connections'] =
      _state.activityConnections.activityConnectionDatas;

    return <FlowData>_flowData;
  }
}
