import {ActivityTool, ActivityToolSet} from '../models/flow-data-def';

export const activityToolsConfig = {
  activityToolsets: <ActivityToolSet[]>[
    {name: "基本活动集", display: "基本活动集",
    tools:[{isSelected: true, activityType: "_", activityToolName: "选择/移动", 
              imagePath: "assets/images/flow_select.png"},
            {activityType: "_connection", activityToolName: "连接", 
              imagePath: "assets/images/flow_arrow.png"},
            {activityType: "st-start", activityToolName: "开始", 
              imagePath: "assets/images/flow_start.png"},
            {activityType: "st-end", activityToolName: "结束", 
              imagePath: "assets/images/flow_end.png"},
            {activityType: "st-singleHumanActivity", activityToolName: "单人处理", 
              imagePath: "assets/images/flow_singleHumanActivity.png"},
            {activityType: "st-multiHumanActivity", activityToolName: "多人处理", 
              imagePath: "assets/images/flow_multiHumanActivity.png"},
            {activityType: "st-autoActivity", activityToolName: "自动处理", 
              imagePath: "assets/images/flow_autoActivity.png"},
    ]},
    {name: "扩展活动集", display: "扩展活动集",
    tools:[]}
  ],
};

