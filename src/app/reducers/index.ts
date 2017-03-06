import { FlowDataReducer, FlowDataState } from './FlowDataReducer';
import {
  Reducer,
  combineReducers 
} from 'redux';

import {
  ActivityToolsState,
  ActivityToolsReducer,
} from './ActivityToolsReducer';
export * from './ActivityToolsReducer';

import {
  ActivityNodeDatasState ,
  ActivityNodeDatasReducer
} from './ActivityNodeDataReducer';
export * from './ActivityNodeDataReducer';

import {
  ActivityConnectionDatasState ,
  ActivityConnectionDatasReducer
} from './ActivityConnectionDataReducer';
export * from './ActivityConnectionDataReducer';

export interface AppState {
  flowData: FlowDataState;
  activityTools: ActivityToolsState;
  activityDataNodes: ActivityNodeDatasState;
  activityConnections: ActivityConnectionDatasState;
}

const rootReducer: Reducer<AppState> = combineReducers<AppState>({
  flowData: FlowDataReducer,
  activityTools: ActivityToolsReducer,
  activityDataNodes: ActivityNodeDatasReducer,
  activityConnections: ActivityConnectionDatasReducer,
});

export default rootReducer;
