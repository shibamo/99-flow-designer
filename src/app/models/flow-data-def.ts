import { genGuid } from './../utilites/gen-guid';
import { UserDTO, RoleDTO } from './master-data-def';

export interface ActivityConnectionData { //节点间连线数据对象
  guid: string;
  fromGuid: string; //起始端节点数据对象的GUID
  toGuid: string; //结束端节点数据对象的GUID
  name?: string;
}

export class ActivityConnectionDataObj
  implements ActivityConnectionData {
  guid: string;
  fromGuid: string; //起始端节点数据对象的GUID
  toGuid: string; //结束端节点数据对象的GUID
  name?: string;

  constructor(fromGuid: string, toGuid: string,
    guid?: string, name?: string) {
    this.guid = guid || genGuid();
    this.fromGuid = fromGuid;
    this.toGuid = toGuid;
    this.name = name || '未命名连接' + Date.now().toString();
  }
}

export interface ActivityNodeData { //节点数据对象
  type: string;
  guid: string;
  name: string;
  size: number[];
  position: number[];
  initData?: Object;
  linkForm?: Object;
  beforeActions?: any[];
  afterActions?: any[];
  roles?: Paticipant[];
  autoRules?: ConditionRule[];
}

export class ActivityNodeDataObj implements ActivityNodeData { //节点数据对象
  type: string;
  guid: string;
  name: string;
  size: number[];
  position: number[];
  initData?: Object;
  linkForm?: Object;
  beforeActions?: any[];
  afterActions?: any[];
  roles?: Paticipant[];
  autoRules?: ConditionRule[];


  constructor(type: string, position: number[], size?: number[],
    guid?: string, name?: string, initData?: Object,
    linkForm?: Object, beforeActions?: any[],
    afterActions?: any[], roles?: any[], autoRules?: ConditionRule[]) {
    this.type = type;
    //TODO-需要加入对type的合法值判断
    this.guid = guid || genGuid();
    this.position = position;
    this.name = name || '未命名 ' + type;
    this.size = size || [50, 50];
    this.initData = initData;
    this.linkForm = linkForm;
    this.beforeActions = beforeActions;
    this.afterActions = afterActions;
    this.roles = roles;
    this.autoRules = autoRules;
  }
}

export interface PersonShortInfo {
  name: string;
  guid: string;
}

export interface FlowBasicInfoData {
  name: string;
  version: string;
  guid: string;
  desc: string;
  creator: PersonShortInfo;
  createTime: string;
  lastUpdateTime: string;
}

export interface FlowAdvancedInfoData {
}

// export interface FlowConfigInfoData {
// }

// export interface FlowPreferenceData {
// }

export interface FlowCustomInfoData {
}

export interface FlowData {
  basicInfo: FlowBasicInfoData;
  customData?: FlowCustomInfoData;
  advancedInfo?: FlowAdvancedInfoData;
  activityNodes: { nodes: ActivityNodeData[] };
  activityConnections: { connections: ActivityConnectionData[] };
  // configInfo?: FlowConfigInfoData;
  // preferences?: FlowPreferenceData;
}

export interface ActivityTool {
  isSelected: boolean;
  activityType: string;
  activityToolName: string;
  imagePath: string;
  tooltip?: string;
}

export interface ActivityToolSet {
  name: string;
  display: string;
  configData?: any;
  tools: ActivityTool[];
}

export abstract class FlowPropertyBase<T>{
  name: string;
  value: T;
  guid: string;
  label: string;
  required: boolean;
  order: number;
  controlType: string;
  placeholder: string;
  readonly: boolean;

  constructor(options: {
    name?: string,
    value?: T,
    guid?: string,
    label?: string,
    required?: boolean,
    order?: number,
    controlType?: string,
    placeholder?: string,
    readonly?: boolean
  } = {}) {
    this.name = options.name;
    this.value = options.value;
    this.guid = options.guid || '';
    this.label = options.label || '';
    this.required = !!options.required;
    this.order = options.order === undefined ? 1 : options.order;
    this.controlType = options.controlType || '';
    this.placeholder = options.placeholder || '';
    this.readonly = !!options.readonly;
  }
}

export class TextboxFlowProperty extends FlowPropertyBase<string> {
  controlType = 'text';

  constructor(options: {} = { name: '未命名文本属性' }) {
    super(options);
  }
}

export class DropdownFlowProperty extends FlowPropertyBase<string> {
  controlType = 'dropdown';
  options: { text: string, value: string }[] = [];

  constructor(options: {} = { name: '未命名下拉框属性' }) {
    super(options);
    this.options = options['options'] || [];
  }
}

export class TextareaFlowProperty extends FlowPropertyBase<string> {
  controlType = 'textarea';
  rows: number;

  constructor(options: {} = { name: '未命名长文本属性' }) {
    super(options);
    this.rows = options['rows'] || 3;
  }
}

export interface Paticipant {
  PaticipantType: string; // 'role' or 'user'
  PaticipantObj: RoleDTO | UserDTO;
}

export class RoleuserlistFlowProperty
  extends FlowPropertyBase<Paticipant[]> {
  controlType = 'role-user-selector';
  rows: number;

  constructor(options: {} = { name: '未命名角色用户列表属性' }) {
    super(options);
    this.rows = options['rows'] || 3;
    this.value = [];
  }
}

export interface ConditionRule {
  name: string;
  guid: string;
  isDefault: boolean;
  code: string; // C# code to evaluate
  connectionGuid: string;
  paticipants: Paticipant[];
}

export class ConditionRuleManagerFlowProperty
  extends FlowPropertyBase<ConditionRule[]> {
  controlType = 'condition-rule-manager';
  rows: number;

  constructor(options: {} = { name: '未命名自动规则列表属性' }) {
    super(options);
    this.rows = options['rows'] || 3;
    this.value = [];
  }
}