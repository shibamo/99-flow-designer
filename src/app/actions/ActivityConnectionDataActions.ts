import { Action, ActionCreator } from 'redux';

import { ActivityConnectionData } from '../models/flow-data-def';

// Populate ConnectionDatas
export const POPULATE_CONNECTIONS_DATA = '[ConnectionsData] Populate';
export interface PopulateConnectionsDataAction extends Action{
  connectionsData: ActivityConnectionData[];
  currentConnectionGuid: string;
}
export const populateConnectionsData: ActionCreator<PopulateConnectionsDataAction> =
  (connectionsData, currentConnectionGuid) => ({type: POPULATE_CONNECTIONS_DATA, 
                                              connectionsData: connectionsData, 
                                              currentConnectionGuid: currentConnectionGuid});

// Create ConnectionData
export const CREATE_CONNECTION_DATA = '[ConnectionData] Create';
export interface CreateConnectionDataAction extends Action{
  connectionData: ActivityConnectionData;
}
export const CreateConnectionData: ActionCreator<CreateConnectionDataAction> =
  (connectionData) => ({type: CREATE_CONNECTION_DATA, 
                        connectionData: connectionData});

// Delete ConnectionData
export const DELETE_CONNECTION_DATA = '[ConnectionData] Delete';
export interface DeleteConnectionDataAction extends Action{
  connectionGuid: string;
}
export const DeleteConnectionData: ActionCreator< DeleteConnectionDataAction> =
  (connectionGuid) => ({type: DELETE_CONNECTION_DATA, 
                        connectionGuid: connectionGuid});

// Update ConnectionData
export const UPDATE_CONNECTION_DATA = '[ConnectionData] Update';
export interface UpdateConnectionDataAction extends Action{
  connectionData: ActivityConnectionData;
}
export const UpdateConnectionData: ActionCreator< UpdateConnectionDataAction> =
  (connectionData) => ({type: UPDATE_CONNECTION_DATA, 
                        connectionData: connectionData});

// Set Current ConnectionData
export const SET_CURRENT_CONNECTION_DATA = '[ConnectionData] SetCurrent';
export interface SetCurrentConnectionDataAction extends Action{
  currentConnectionGuid: string;
}
export const SetCurrentConnectionData: ActionCreator< SetCurrentConnectionDataAction> =
  (currentConnectionGuid) => ({type: SET_CURRENT_CONNECTION_DATA, 
                                currentConnectionGuid: currentConnectionGuid});

