import * as console from 'console';
import { Injectable }   from '@angular/core';

import { 
  FlowPropertyBase,
  TextboxFlowProperty,
  TextareaFlowProperty,
  DropdownFlowProperty,
  RoleuserlistFlowProperty,
  ConditionRuleManagerFlowProperty,
} from '../models/flow-data-def';


@Injectable()
export class FlowTemplateMetaService {
  private readonly defs: Object={
    "Flow.basicInfo": [
      new TextboxFlowProperty({
        name: 'name', 
        label: '流程名称',
        guid:  '7493e28f-b34b-418f-b269-c0986d77d39b',
        required: true,
        readonly: false
      }),
      new TextboxFlowProperty({
        name: 'code', 
        label: '流程代码',
        guid:  '6483e386-b15b-482f-a295-76286d77d39b',
        required: true,
        readonly: false
      }),      
      new TextboxFlowProperty({
        name: 'displayName', 
        label: '流程显示名称',
        guid:  '5493328f-132b-e98f-a9bc-26f86d77d5bf',
        required: true,
        readonly: false
      }),      
      new TextboxFlowProperty({
        name: 'version', 
        label: '版本', 
        guid:  'daf14a8a-6e4f-42de-ba01-23a5bfdca247',
        required: true,
        readonly: false
      }),
      new TextareaFlowProperty({
        name: 'desc', 
        label: '备注说明', 
        guid:  '8c0fdd7e-67af-43c2-8aa3-26f9a4cb8ac3',
        required: false,
        readonly: false,
        rows: 2,
      }),
      new TextboxFlowProperty({
        name: 'createTime', 
        label: '创建时间', 
        guid:  'a58e1fea-378c-41ec-96bf-e71cf01d410a',
        required: false,
        readonly: true
      }), 
      new DropdownFlowProperty({
        name: 'isPopular', 
        label: '是否为常用流程?', 
        guid:  '2034e82e-e495-4725-986b-fc29d33ff9eb',
        required: false,
        readonly: false,
        options:[{text: '否', value: 0},{text: '是', value: 1}]
      }),         
    ],
    "Flow.advancedInfo":[
      new DropdownFlowProperty({
        name: 'arbitraryJumpAllowed', 
        label: '是否允许随意跳转?', 
        guid:  'c0588821-8a5f-4747-a565-7f84d51ebb83',
        required: false,
        readonly: false,
        options:[{text: '否', value: 0},{text: '是', value: 1}]
      }),
      new TextareaFlowProperty({
        name: 'managers', 
        label: '流程负责人列表(依序)', 
        guid:  'a66de058-ee10-41f6-9c69-c2f84d29f22c',
        required: false,
        readonly: false,
        rows: 2,
      }),
    ],
    "Flow.customData": [],    
    "Activity.basicInfo":[
      new TextboxFlowProperty({
        name: 'name', 
        label: '活动名称', 
        guid:  '07b6bd34-38c3-4cd6-a65f-1c844a8bd7d9',
        required: true,
        readonly: false
      }),
      new TextboxFlowProperty({
        name: 'type', 
        label: '活动类型', 
        guid:  'cbb98715-dd92-460b-87b5-2b02a84e23ba',
        required: true,
        readonly: true
      }),
      new RoleuserlistFlowProperty({
        name: 'roles', 
        label: '参与人员/角色', 
        guid:  'f63e59e6-024c-40fb-bffb-1c61d912cf48',
        required: false,
        readonly: false,
        rows: 3,
      }),
    ],
    "Activity.advancedInfo":[
      new ConditionRuleManagerFlowProperty({
        name: 'autoRules', 
        label: '自动规则集', 
        guid:  '00c15b73-df35-4691-974e-a5e7ea1cc56e',
        required: false,
        readonly: false,
        rows: 3,
      }),
      new TextboxFlowProperty({
        name: 'linkForm', 
        label: '处理表单', 
        guid:  '99d868ca-39f8-4b43-8684-d0169c983aae',
        required: false,
        readonly: false
      }),
      new TextareaFlowProperty({
        name: 'beforeActions', 
        label: '前置处理组件集',
        guid:  'f1869f77-f36d-4470-861c-56e559622c39', 
        required: false,
        readonly: false
      }),
      new TextareaFlowProperty({
        name: 'afterActions', 
        label: '后置处理组件集', 
        guid:  '56198d9a-36e9-4833-bb65-355ddd76f22f',
        required: false,
        readonly: false
      }),      
    ],
    "Connection.basicInfo":[
      new TextboxFlowProperty({
        name: 'name', 
        label: '连接名称', 
        guid:  '6ce1d57a-83b3-4946-9fd5-c4bb877b3a8a',
        required: true,
        readonly: false
      }),
      new DropdownFlowProperty({
        name: 'showName', 
        label: '是否在连接上显示名称?', 
        guid:  'bb52f186-2dd5-499b-a844-37c4b0f86b10',
        required: false,
        readonly: false,
        options:[{text: '否', value: 0},{text: '是', value: 1}]
      }),            
      // new TextareaFlowProperty({
      //   name: 'roles', 
      //   label: '目标活动参与人员/角色',
      //   guid:  '875c385f-6871-4921-831d-7a1b5200af6b', 
      //   required: false,
      //   readonly: false,
      //   rows: 3,
      // }), 

      // new RoleuserlistFlowProperty({
      //   name: 'roles', 
      //   label: '目标活动参与人员/角色',
      //   guid:  '875c385f-6871-4921-831d-7a1b5200af6b', 
      //   required: false,
      //   readonly: false,
      //   rows: 3,
      // }),
    ],
    "Connection.advancedInfo":[
      new TextboxFlowProperty({
        name: 'beforeActions', 
        label: '前置处理组件集', 
        guid:  'ce13fdf1-4907-4aab-881a-09dbcfe6bda5',
        required: false,
        readonly: false
      }),
      new TextboxFlowProperty({
        name: 'afterActions', 
        label: '后置处理组件集', 
        guid:  '4b3bee66-1b4e-444f-8469-f64b4bee3d3d',
        required: false,
        readonly: false
      }),      
    ],    
  }
  constructor() {

  }

  getPropertyDefinitions(defName: string){
    if(this.defs.hasOwnProperty(defName)) {
      return this.defs[defName];
    }else{
      throw new Error(`试图获取不存在的流程模板元数据定义集 '${defName}'`);
    }
  }
}