export function mockFlowDataObj(): Object {
  return {
    basicInfo: { 
      name: 'TestFlow', 
      version: '0.0.1', 
      guid: "8ecd44c6-fb15-46ee-8bd5-031e30171deb", 
      desc: 'Test Flow', 
      creator: { name: 'Qin,Chao', guid: '4d0abaa9-4825-4809-8f8f-631a7595439c' }, 
      createTime: '2016-12-20 8:00AM', 
      lastUpdateTime: '' 
    },
    advancedInfo: {},    
    customData: {},
    activityNodes: {
      nodes: [
        { type: 'st-start', guid: "f6152039-1745-4f4c-8f8e-3ed37770fa0d", size: [0, 0], position: [100, 20], name: '开始', customData: {}, linkForm: "", beforeActions: "", afterActions: "", roles: "" }, //st-前缀表示standard
        { type: 'st-singleHumanActivity', guid: "2dde0ed2-c10b-4c98-b263-1016dcfa951d", size: [0, 0], position: [100, 100], name: '很长很长很长的单人处理1', customData: {}, linkForm: "", beforeActions: "", afterActions: "", roles: "" },
        { type: 'st-multiHumanActivity', guid: "ab0f92f6-35cd-44b9-a7bd-5a17e544aa9c", size: [0, 0], position: [100, 200], name: '多人处理1', customData: {}, linkForm: "", beforeActions: "", afterActions: "", roles: "" },
        { type: 'st-autoActivity', guid: "e35b4f81-21b3-407a-b14f-6e198a99ff1b", size: [0, 0], position: [100, 300], name: '自动处理1', customData: {}, linkForm: "", beforeActions: "", afterActions: "", roles: "" },
        { type: 'st-end', guid: "c09fcfbe-92a9-48cd-bd14-975996e063a7", size: [0, 0], position: [100, 400], name: '结束', customData: {}, linkForm: "", beforeActions: "", afterActions: "", roles: "" },
      ]
    },
    activityConnections: {
      connections: [
        { guid: "476d2d52-fd31-4589-9da8-8c1e7f5d0766", name: '连接1', fromGuid: 'f6152039-1745-4f4c-8f8e-3ed37770fa0d', toGuid: "2dde0ed2-c10b-4c98-b263-1016dcfa951d" },
        { guid: '55d72a3e-051a-46a0-9aae-0be1c62b2e24', name: '连接2', fromGuid: '2dde0ed2-c10b-4c98-b263-1016dcfa951d', toGuid: "ab0f92f6-35cd-44b9-a7bd-5a17e544aa9c" },
        { guid: 'fb10f5ec-3d4e-41d3-b375-6a169a3c978f', name: '连接3', fromGuid: 'ab0f92f6-35cd-44b9-a7bd-5a17e544aa9c', toGuid: "e35b4f81-21b3-407a-b14f-6e198a99ff1b" },
        { guid: '17b1b72f-3383-4631-a3ec-e4f3f5c82872', name: '连接4', fromGuid: 'e35b4f81-21b3-407a-b14f-6e198a99ff1b', toGuid: "c09fcfbe-92a9-48cd-bd14-975996e063a7" },
        { guid: '65729099-dbd2-46ad-b2a3-ec6c9efa641c', name: '连接5', fromGuid: '2dde0ed2-c10b-4c98-b263-1016dcfa951d', toGuid: "c09fcfbe-92a9-48cd-bd14-975996e063a7" },
      ]
    },
  };
}