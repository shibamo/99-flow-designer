/**只提供流程模板级别的数据维护, 不包括对Activity和Connection的操作 */

import { Action, ActionCreator } from 'redux';

import { 
  FlowData
 } from '../models/flow-data-def';

// Open FlowDatas
export const POPULATE_FLOW_DATA = '[FlowData] Populate';
export interface PopulateFlowDataAction extends Action{
  flowData: FlowData;
  currentFlowGuid: string;
}
export const populateFlowData: ActionCreator<PopulateFlowDataAction> =
  (flowData, currentFlowGuid) => 
  ({type: POPULATE_FLOW_DATA, flowData: flowData, 
    currentFlowGuid: currentFlowGuid});

// Create FlowData
export const CREATE_FLOW_DATA = '[FlowData] Create';
export interface CreateFlowDataAction extends Action{
  flowData: FlowData;
}
export const CreateFlowData: ActionCreator<CreateFlowDataAction> =
  (flowData) => ({type: CREATE_FLOW_DATA, flowData: flowData});

// Update FlowData
export const UPDATE_FLOW_DATA = '[FlowData] Update';
export interface UpdateFlowDataAction extends Action{
  flowData: FlowData;
}
export const UpdateFlowData: ActionCreator< UpdateFlowDataAction> =
  (flowData) => ({type: UPDATE_FLOW_DATA, flowData: flowData});

/** 目前似乎无实现Delete FlowData的需要
export const DELETE_FLOW_DATA = '[FlowData] Delete';
export interface DeleteFlowDataAction extends Action{
  flowGuid: string;
}
export const DeleteFlowData: ActionCreator< DeleteFlowDataAction> =
  (flowGuid) => ({type: DELETE_FLOW_DATA, flowGuid: flowGuid});
*/

/**  目前似乎无实现Set Current FlowData的需要
export const SET_CURRENT_FLOW_DATA = '[FlowData] SetCurrent';
export interface SetCurrentFlowDataAction extends Action{
  currentFlowGuid: string;
}
export const SetCurrentFlowData: ActionCreator< SetCurrentFlowDataAction> =
  (currentFlowGuid) => ({type: SET_CURRENT_FLOW_DATA, currentFlowGuid: currentFlowGuid});
*/