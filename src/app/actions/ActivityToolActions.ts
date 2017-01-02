import {Action, ActionCreator} from 'redux';

//import {ActivityTool} from '../models/flow-data-def';

export const SET_CURRENT_TOOL = '[TOOL] Set Current';
export interface SetCurrentToolAction extends Action{
  tool: string;
}
export const setCurrentTool: ActionCreator<SetCurrentToolAction> =
  (activityType) => ({type: SET_CURRENT_TOOL, tool: activityType});