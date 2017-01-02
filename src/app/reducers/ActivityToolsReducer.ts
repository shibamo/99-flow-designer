import { Action } from 'redux';
import { createSelector } from 'reselect';
import { ActivityTool } from '../models/flow-data-def';
import { ActivityToolActions } from '../actions';

export interface ActivityToolsState {
  currentActivityTool: string;
};

const initialState: ActivityToolsState = {
  currentActivityTool: "_"
};

export const ActivityToolsReducer =
function(state: ActivityToolsState = initialState, 
        action: Action): ActivityToolsState 
{
  switch (action.type) {
    case ActivityToolActions.SET_CURRENT_TOOL:
      const tool: string = 
        (<ActivityToolActions.SetCurrentToolAction>action).tool;
      return {
        currentActivityTool: tool
      };
    default:
      return state;
  }
};

export const getActivityToolsState = (state): ActivityToolsState => 
                                              state.dummy;

// The selector
export const getCurrentActivityTool = createSelector(
  getActivityToolsState,
  ( state: ActivityToolsState ) => state.currentActivityTool );