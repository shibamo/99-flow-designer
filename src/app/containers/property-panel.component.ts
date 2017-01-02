import { Component, OnInit, Inject, ElementRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Store } from 'redux';

import * as $ from 'jquery';
import * as _ from 'lodash';
import * as moment from 'moment';

import { genGuid } from '../utilites/gen-guid';

import { 
  ActivityConnectionData, 
  ActivityNodeData, 
  ActivityNodeDataObj,
  FlowPropertyBase
} from '../models/flow-data-def';

import { FlowTemplateMetaService } from '../services/flow-template-meta.service';
import { PropertyControlService } from '../services/property-control.service';

import { AppStore } from '../app-store';

import {
  ActivityNodeDataActions,
  ActivityConnectionDataActions,
  FlowDataActions
} from '../actions';

import {
  AppState,
} from '../reducers';

enum WorkingMode {
    Workflow = 1, // 缺省模式
    Activity,
    Connection,
}

@Component({
  selector: 'app-property-panel',
  template: `
  <form  [formGroup]="formGroup" 
  [ngSwitch]="currentWorkingMode">
    <!--流程属性页集-->
    <app-tabset *ngSwitchCase="1">
      <app-tab title="基本属性">
        <app-dynamic-flow-property-control *ngFor="let property of basicControlInfo"
        [property]="property" [formGroup]="formGroup">
        </app-dynamic-flow-property-control>
      </app-tab>
      <app-tab title="高级属性">
        <app-dynamic-flow-property-control *ngFor="let property of advancedControlInfo"
        [property]="property" [formGroup]="formGroup">
        </app-dynamic-flow-property-control>
      </app-tab>  
      <app-tab title="自定义属性">
        <a class="ui red tag label">TODO: 暂未实现</a>
      </app-tab>      
    </app-tabset>
    <!--活动属性页集-->
    <app-tabset *ngSwitchCase="2">
      <app-tab title="基本属性">
        <app-dynamic-flow-property-control *ngFor="let property of basicControlInfo"
        [property]="property" [formGroup]="formGroup">
        </app-dynamic-flow-property-control>
      </app-tab>
      <app-tab title="高级属性">
        <app-dynamic-flow-property-control *ngFor="let property of advancedControlInfo"
        [property]="property" [formGroup]="formGroup">
        </app-dynamic-flow-property-control>
      </app-tab>  
      <app-tab title="自定义属性">
        <a class="ui red tag label">TODO: 暂未实现</a>
      </app-tab>  
    </app-tabset>
    <!--连接属性页集-->
    <app-tabset *ngSwitchCase="3">
      <app-tab title="基本属性">
        <app-dynamic-flow-property-control *ngFor="let property of basicControlInfo"
        [property]="property" [formGroup]="formGroup">
        </app-dynamic-flow-property-control>
      </app-tab>
      <app-tab title="高级属性">
        <app-dynamic-flow-property-control *ngFor="let property of advancedControlInfo"
        [property]="property" [formGroup]="formGroup">
        </app-dynamic-flow-property-control>
      </app-tab>  
      <app-tab title="自定义属性">
        <a class="ui red tag label">TODO: 暂未实现</a>
      </app-tab>   
    </app-tabset>
    <!--保存/取消按钮-->
    <div class="form-row">
      <button class="ui right floated positive button" (click)="onSubmit()" 
      [disabled]="!formGroup.valid || formGroup.pristine">保 存</button>
    </div>
  </form>
  `
})
export class PropertyPanelComponent implements OnInit 
{
  private currentWorkingMode: WorkingMode = WorkingMode.Workflow;
  private currentWorkflowTplGuid: string;
  private currentNodeGuid: string;
  private currentConnectionGuid: string;
  private nodes: ActivityNodeData[];
  private connections: ActivityConnectionData[];
  private formGroup: FormGroup;
  private basicControlInfo: FlowPropertyBase<any>[];
  private advancedControlInfo: FlowPropertyBase<any>[];

  constructor(
    @Inject(AppStore) private store: Store<AppState>,
    @Inject(FlowTemplateMetaService) 
      private flowTemplateMetaService: FlowTemplateMetaService,
    @Inject(PropertyControlService) 
      private propertyControlService: PropertyControlService) 
  {
    this.formGroup = this.propertyControlService.toFormGroup([]);
    store.subscribe(() => this.updateStoreState());
    this.updateStoreState();
  }

  updateStoreState(){
    const _state = this.store.getState();
    this.nodes = _state.activityDataNodes.activityNodeDatas;
    this.connections = _state.activityConnections.activityConnectionDatas;

    if(_state.activityConnections.currentConnectionGuid){// 当前有连接被选中 
      if(this.currentWorkingMode == WorkingMode.Connection && 
        this.currentConnectionGuid == 
          _state.activityConnections.currentConnectionGuid){
        // 继续编辑当前的连接属性,
        return;
      } else { // workingMode need be changed or different connection
        this.currentWorkingMode = WorkingMode.Connection;
        this.currentConnectionGuid = 
          _state.activityConnections.currentConnectionGuid
      }
    }else if(_state.activityDataNodes.currentNodeGuid){// 当前有活动被选中
      if(this.currentWorkingMode == WorkingMode.Activity && 
        this.currentNodeGuid == _state.activityDataNodes.currentNodeGuid){
        // 继续编辑当前的活动属性
        return;
      } else { // workingMode need be changed or different activity 
        this.currentWorkingMode = WorkingMode.Activity;
        this.currentNodeGuid = _state.activityDataNodes.currentNodeGuid;
      }

    }else{// 当前无选中的连接和活动,编辑当前的流程属性
      if(this.currentWorkingMode == WorkingMode.Workflow && 
        this.currentWorkflowTplGuid == _state.flowData.currentFlowGuid){
        // 继续编辑当前的流程属性
        return;
      } else { // workingMode need be changed or different flow template 
        this.currentWorkingMode = WorkingMode.Workflow;
        this.currentWorkflowTplGuid = _state.flowData.currentFlowGuid;
      }
    }

    this.render();
  }

  generateControlInfo(infoInstanceSection: any,PropertyDefinitionSection: string){
    let info = infoInstanceSection;
    let InfoDefs = 
      this.flowTemplateMetaService.getPropertyDefinitions(PropertyDefinitionSection);
    
    let _basicControlInfo = <FlowPropertyBase<any>[]>(_.map(InfoDefs,
      (def)=>{
      return Object.assign({},def,{value: info[def["name"]]});
    }));

    return _basicControlInfo;
  }

  render(){
    let _basicInfo, _basicInfoDefs, _basicControlInfo, 
        _advancedInfo, _advancedInfoDefs, _advancedControlInfo,
        _formGroup;
    const _state = this.store.getState();

    switch(this.currentWorkingMode){
      case WorkingMode.Workflow: // 显示与编辑流程属性
        this.basicControlInfo = this.generateControlInfo(
                                  _state.flowData.flowData.basicInfo,
                                  "Flow.basicInfo");
        this.advancedControlInfo = this.generateControlInfo(
                                  _state.flowData.flowData.advancedInfo,
                                  "Flow.advancedInfo");

        _formGroup = this.propertyControlService.toFormGroup(
          [...this.basicControlInfo, ...this.advancedControlInfo]);
        this.formGroup = _formGroup;
        break;

      case WorkingMode.Activity: // 显示与编辑活动属性
        this.basicControlInfo = this.generateControlInfo(
          _.find(_state.activityDataNodes.activityNodeDatas,
                {guid: this.currentNodeGuid}),
          "Activity.basicInfo");
        this.advancedControlInfo = this.generateControlInfo(
          _.find(_state.activityDataNodes.activityNodeDatas,
                {guid: this.currentNodeGuid}),
          "Activity.advancedInfo");

        _formGroup = this.propertyControlService.toFormGroup(
          [...this.basicControlInfo, ...this.advancedControlInfo]);
        this.formGroup = _formGroup;
        break;

      case WorkingMode.Connection: // 显示与编辑连接属性
        this.basicControlInfo = this.generateControlInfo(
          _.find(_state.activityConnections.activityConnectionDatas,
                {guid: this.currentConnectionGuid}),
          "Connection.basicInfo");
        this.advancedControlInfo = this.generateControlInfo(
          _.find(_state.activityConnections.activityConnectionDatas,
                {guid: this.currentConnectionGuid}),
          "Connection.advancedInfo");

        _formGroup = this.propertyControlService.toFormGroup(
          [...this.basicControlInfo, ...this.advancedControlInfo]);
        this.formGroup = _formGroup;
        break;

      default:

    }
  }

  fillSubmitSection(objToSubmitSection: any, PropertyDefinitionSection: string){
    let _basicInfoDefs;
    _basicInfoDefs = this.flowTemplateMetaService.
                          getPropertyDefinitions(PropertyDefinitionSection);
    _.each(_basicInfoDefs,(def)=>{
        objToSubmitSection[def["name"]]=this.formGroup.value[def["guid"]];
    });
  }

  onSubmit(){
    // console.log(this.formGroup.value);
    let objSubmitted={};
    const _state = this.store.getState();

    switch(this.currentWorkingMode){
      case WorkingMode.Workflow: // 当前正在显示与编辑流程模板属性,需要提交流程模板的更新
        objSubmitted["basicInfo"] = 
          Object.assign({},_state.flowData.flowData.basicInfo);
        this.fillSubmitSection(objSubmitted["basicInfo"],"Flow.basicInfo");

        objSubmitted["advancedInfo"]= 
          Object.assign({},_state.flowData.flowData.advancedInfo);
        this.fillSubmitSection(objSubmitted["advancedInfo"],"Flow.advancedInfo");

        this.store.dispatch(FlowDataActions.UpdateFlowData(objSubmitted));
        break;

      case WorkingMode.Activity: // 当前正在显示与编辑活动属性,需要提交流程活动的更新
        objSubmitted = 
          Object.assign({}, _.find(
            _state.activityDataNodes.activityNodeDatas,
            {guid: this.currentNodeGuid}));
        this.fillSubmitSection(objSubmitted,"Activity.basicInfo");
        this.fillSubmitSection(objSubmitted,"Activity.advancedInfo");
        this.store.dispatch(
          ActivityNodeDataActions.UpdateNodeData(objSubmitted));
        break;

      case WorkingMode.Connection: // 当前正在显示与编辑连接属性,需要提交流程连接的更新
        objSubmitted = 
          Object.assign({}, _.find(
            _state.activityConnections.activityConnectionDatas,
            {guid: this.currentConnectionGuid}));
        this.fillSubmitSection(objSubmitted,"Connection.basicInfo");
        this.fillSubmitSection(objSubmitted,"Connection.advancedInfo");
        this.store.dispatch(
          ActivityConnectionDataActions.UpdateConnectionData(objSubmitted));
        break;

      default:

    }
    return false;
  }

  ngOnInit() {

  }

}
