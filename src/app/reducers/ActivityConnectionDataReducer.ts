import { __core_private__ } from '@angular/core';
import { Action } from 'redux';
import { createSelector } from 'reselect';
import * as _ from 'lodash';

import { ActivityConnectionData, FlowData } from '../models/flow-data-def';
import { ActivityConnectionDataActions } from '../actions';

import { mockFlowDataObj } from '../services/mock-data';

export interface ActivityConnectionDatasState {
  activityConnectionDatas: ActivityConnectionData[];
  currentConnectionGuid: string;
};

const initialState: ActivityConnectionDatasState = {
  activityConnectionDatas: (<FlowData>mockFlowDataObj()).activityConnections.connections,
  currentConnectionGuid: null
};

export const ActivityConnectionDatasReducer =
  function (state: ActivityConnectionDatasState = initialState,
    action: Action): ActivityConnectionDatasState {
    switch (action.type) {
      case ActivityConnectionDataActions.POPULATE_CONNECTIONS_DATA:
        const _actPopulate =
          (<ActivityConnectionDataActions.PopulateConnectionsDataAction>action);
        return {
          activityConnectionDatas: _actPopulate.connectionsData,
          currentConnectionGuid: null
        };

      case ActivityConnectionDataActions.CREATE_CONNECTION_DATA:
        const _actCreate = (<ActivityConnectionDataActions.CreateConnectionDataAction>action);
        return {
          activityConnectionDatas: [...state.activityConnectionDatas,
          _actCreate.connectionData],
          currentConnectionGuid: _actCreate.connectionData.guid
        };

      case ActivityConnectionDataActions.DELETE_CONNECTION_DATA:
        const _actDelete = (<ActivityConnectionDataActions.DeleteConnectionDataAction>action);
        return {
          activityConnectionDatas: _.filter(state.activityConnectionDatas,
            (n) => { return n.guid != _actDelete.connectionGuid; }),
          currentConnectionGuid: state.currentConnectionGuid
        };

      case ActivityConnectionDataActions.UPDATE_CONNECTION_DATA:
        const _actUpdate = (<ActivityConnectionDataActions.UpdateConnectionDataAction>action);
        const _index = _.findIndex(state.activityConnectionDatas,
          { guid: _actUpdate.connectionData.guid });
        return {
          activityConnectionDatas: [...state.activityConnectionDatas.slice(0, _index),
          Object.assign({}, state.activityConnectionDatas[_index],
            _actUpdate.connectionData),
          ...state.activityConnectionDatas.slice(_index + 1)
          ], currentConnectionGuid: state.currentConnectionGuid
        };

      case ActivityConnectionDataActions.SET_CURRENT_CONNECTION_DATA:
        const _actSetCurrent =
          (<ActivityConnectionDataActions.SetCurrentConnectionDataAction>action);
        return {
          activityConnectionDatas: state.activityConnectionDatas,
          currentConnectionGuid: _actSetCurrent.currentConnectionGuid
        };

      default:
        return state;
    }
  };