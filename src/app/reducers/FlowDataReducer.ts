import { __core_private__ } from '@angular/core';
import { Action } from 'redux';
import { createSelector } from 'reselect';
import * as _ from 'lodash';

import { FlowData } from '../models/flow-data-def';
import { FlowDataActions } from '../actions';

import {mockFlowDataObj} from '../services/mock-data';

export interface FlowDataState {
  flowData: FlowData;
  currentFlowGuid: string;
};

const initialState: FlowDataState = {
  flowData: <FlowData>mockFlowDataObj(),
  currentFlowGuid: (<FlowData>mockFlowDataObj()).basicInfo.guid,
};

export const FlowDataReducer =
function(state: FlowDataState = initialState, 
        action: Action): FlowDataState 
{
  switch (action.type) {
    case FlowDataActions.POPULATE_FLOW_DATA:
      const _actPopulate = 
        (<FlowDataActions.PopulateFlowDataAction>action);
      console.log(_actPopulate.flowData);
      return { 
        flowData: _actPopulate.flowData, 
        currentFlowGuid: _actPopulate.flowData.basicInfo.guid
      };

    case FlowDataActions.CREATE_FLOW_DATA:
      const _actCreate = <FlowDataActions.CreateFlowDataAction> action;
      return { 
        flowData: _actCreate.flowData, 
        currentFlowGuid: _actCreate.flowData.basicInfo.guid
      };

    /** 为保持reducer的结构简单, 只实现对basicInfo,advancedInfo和customData的更新, 
     * activityNodes和activityConnections的更新由特定的reducer来执行*/
    case FlowDataActions.UPDATE_FLOW_DATA:
      const _actUpdate = (<FlowDataActions.UpdateFlowDataAction>action);
      return { 
        flowData: Object.assign({}, state.flowData, _actUpdate.flowData),
        currentFlowGuid: state.currentFlowGuid
      };

    /** 目前似乎无实现Delete的需要 
    case FlowDataActions.DELETE_FLOW_DATA:
      const _actDelete = (<FlowDataActions.DeleteFlowDataAction>action);
      return { 
        flowData: null, 
        currentFlowGuid: null
      };
    */
    
    /** 目前似乎无实现SetCurrentFlowData的需要 
    case FlowDataActions.SET_CURRENT_FLOW_DATA:
      const _actSetCurrent = 
        (<FlowDataActions.SetCurrentFlowDataAction>action);
      return { flowData: state.flowData, 
                currentFlowGuid: _actSetCurrent.currentFlowGuid};
    */              
    default:
      return state;
  }
};