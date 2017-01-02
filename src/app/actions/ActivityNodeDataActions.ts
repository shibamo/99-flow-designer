import { Action, ActionCreator } from 'redux';

import { ActivityNodeData } from '../models/flow-data-def';

// Populate NodeDatas
export const POPULATE_NODES_DATA = '[NodesData] Populate';
export interface PopulateNodesDataAction extends Action{
  nodesData: ActivityNodeData[];
  currentNodeGuid: string;
}
export const populateNodesData: ActionCreator<PopulateNodesDataAction> =
  (nodesData, currentNodeGuid) => 
  ({type: POPULATE_NODES_DATA, nodesData: nodesData, 
    currentNodeGuid: currentNodeGuid});

// Create NodeData
export const CREATE_NODE_DATA = '[NodeData] Create';
export interface CreateNodeDataAction extends Action{
  nodeData: ActivityNodeData;
}
export const CreateNodeData: ActionCreator<CreateNodeDataAction> =
  (nodeData) => ({type: CREATE_NODE_DATA, nodeData: nodeData});

// Delete NodeData
export const DELETE_NODE_DATA = '[NodeData] Delete';
export interface DeleteNodeDataAction extends Action{
  nodeGuid: string;
}
export const DeleteNodeData: ActionCreator< DeleteNodeDataAction> =
  (nodeGuid) => ({type: DELETE_NODE_DATA, nodeGuid: nodeGuid});

// Update NodeData
export const UPDATE_NODE_DATA = '[NodeData] Update';
export interface UpdateNodeDataAction extends Action{
  nodeData: ActivityNodeData;
}
export const UpdateNodeData: ActionCreator< UpdateNodeDataAction> =
  (nodeData) => ({type: UPDATE_NODE_DATA, nodeData: nodeData});

// Set Current NodeData
export const SET_CURRENT_NODE_DATA = '[NodeData] SetCurrent';
export interface SetCurrentNodeDataAction extends Action{
  currentNodeGuid: string;
}
export const SetCurrentNodeData: ActionCreator< SetCurrentNodeDataAction> =
  (currentNodeGuid) => ({type: SET_CURRENT_NODE_DATA, currentNodeGuid: currentNodeGuid});

