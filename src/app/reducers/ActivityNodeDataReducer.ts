import { __core_private__ } from '@angular/core';
import { Action } from 'redux';
import { createSelector } from 'reselect';
import * as _ from 'lodash';

import { ActivityNodeData, FlowData } from '../models/flow-data-def';
import { ActivityNodeDataActions } from '../actions';

import {mockFlowDataObj} from '../services/mock-data';

export interface ActivityNodeDatasState {
  activityNodeDatas: ActivityNodeData[];
  currentNodeGuid: string;
};

const initialState: ActivityNodeDatasState = {
  activityNodeDatas: (<FlowData>mockFlowDataObj()).activityNodes.nodes,
  currentNodeGuid: null
};

export const ActivityNodeDatasReducer =
function(state: ActivityNodeDatasState = initialState, 
        action: Action): ActivityNodeDatasState 
{
  switch (action.type) {
    case ActivityNodeDataActions.POPULATE_NODES_DATA:
      const _actPopulate = 
        (<ActivityNodeDataActions.PopulateNodesDataAction>action);
      return { activityNodeDatas: _actPopulate.nodesData, 
                currentNodeGuid: null};

    case ActivityNodeDataActions.CREATE_NODE_DATA:
      const _actCreate = <ActivityNodeDataActions.CreateNodeDataAction> action;
      return { activityNodeDatas: [...state.activityNodeDatas, 
                                    _actCreate.nodeData], 
                currentNodeGuid: _actCreate.nodeData.guid};

    case ActivityNodeDataActions.DELETE_NODE_DATA:
      const _actDelete = (<ActivityNodeDataActions.DeleteNodeDataAction>action);
      return { activityNodeDatas: _.filter(state.activityNodeDatas,
                                    (n)=>{return n.guid!=_actDelete.nodeGuid}), 
                currentNodeGuid: null};

    case ActivityNodeDataActions.UPDATE_NODE_DATA:
      const _actUpdate = (<ActivityNodeDataActions.UpdateNodeDataAction>action);
      const _index = _.findIndex(state.activityNodeDatas, 
                                {guid: _actUpdate.nodeData.guid});
      return { activityNodeDatas: [...state.activityNodeDatas.slice(0,_index),
                  Object.assign({}, state.activityNodeDatas[_index], 
                                _actUpdate.nodeData),
                  ...state.activityNodeDatas.slice(_index+1)
                ],currentNodeGuid: _actUpdate.nodeData.guid};

    case ActivityNodeDataActions.SET_CURRENT_NODE_DATA:
      const _actSetCurrent = 
        (<ActivityNodeDataActions.SetCurrentNodeDataAction>action);
      return { activityNodeDatas: state.activityNodeDatas, 
                currentNodeGuid: _actSetCurrent.currentNodeGuid};

    default:
      return state;
  }
};