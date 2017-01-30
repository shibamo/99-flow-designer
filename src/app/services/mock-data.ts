export function mockFlowDataObj(): Object {
  return {
    "basicInfo": {
      "name": "TestFlow",
      "version": "0.0.1",
      "guid": "8ecd44c6-fb15-46ee-8bd5-031e30171deb",
      "desc": "Test Flow",
      "creator": {
        "name": "Qin,Chao",
        "guid": "4d0abaa9-4825-4809-8f8f-631a7595439c"
      },
      "createTime": "2016-12-20 8:00AM",
      "lastUpdateTime": "",
      "displayName": "测试流程1",
      "isPopular": ""
    },
    "advancedInfo": {
      "arbitraryJumpAllowed": "",
      "managers": ""
    },
    "customData": {
    },
    "activityNodes": {
      "nodes": [
        {
          "type": "st-start",
          "guid": "f6152039-1745-4f4c-8f8e-3ed37770fa0d",
          "size": [
            0,
            0
          ],
          "position": [
            120,
            22
          ],
          "name": "开始",
          "customData": {
          },
          "linkForm": "",
          "beforeActions": "",
          "afterActions": "",
          "roles": [
            {
              "PaticipantType": "role",
              "PaticipantObj": {
                "name": "角色-系统管理员",
                "guid": "ae25f603-87ff-4671-900f-ee69e770891a",
                "roleId": 1
              }
            }
          ]
        },
        {
          "type": "st-singleHumanActivity",
          "guid": "2dde0ed2-c10b-4c98-b263-1016dcfa951d",
          "size": [
            0,
            0
          ],
          "position": [
            100,
            100
          ],
          "name": "财务经理预审",
          "customData": {
          },
          "linkForm": "",
          "beforeActions": "",
          "afterActions": "",
          "roles": [
            {
              "PaticipantType": "user",
              "PaticipantObj": {
                "name": "李四",
                "guid": "27bcd361-12c7-4376-8dd8-ce68ad964431",
                "userId": 2
              }
            }
          ]
        },
        {
          "type": "st-multiHumanActivity",
          "guid": "ab0f92f6-35cd-44b9-a7bd-5a17e544aa9c",
          "size": [
            0,
            0
          ],
          "position": [
            100,
            200
          ],
          "name": "总监批准",
          "customData": {
          },
          "linkForm": "",
          "beforeActions": "",
          "afterActions": "",
          "roles": [
            {
              "PaticipantType": "role",
              "PaticipantObj": {
                "name": "Directors",
                "guid": "0c57f01f-f576-4a97-9dcb-f4eea0959c03",
                "roleId": 11
              }
            },
            {
              "PaticipantType": "role",
              "PaticipantObj": {
                "name": "中方员工",
                "guid": "31a306a3-900d-46f6-ba95-66c37aaa9e84",
                "roleId": 12
              }
            }
          ]
        },
        {
          "type": "st-end",
          "guid": "c09fcfbe-92a9-48cd-bd14-975996e063a7",
          "size": [
            0,
            0
          ],
          "position": [
            492,
            373
          ],
          "name": "结束",
          "customData": {
          },
          "linkForm": "",
          "beforeActions": "",
          "afterActions": "",
          "roles": ""
        },
        {
          "type": "st-singleHumanActivity",
          "guid": "5ee19a5b-df8b-4c11-a0d4-082848b5f216",
          "position": [
            287,
            441
          ],
          "name": "总经理终审",
          "size": [
            50,
            50
          ],
          "linkForm": "",
          "beforeActions": "",
          "afterActions": "",
          "roles": [
            {
              "PaticipantType": "user",
              "PaticipantObj": {
                "name": "川普",
                "guid": "c4961686-41a6-469a-afa9-df05e42ba9f8",
                "userId": 16
              }
            }
          ],
          "autoRules": [
            {
              "guid": "6146f486-0b86-4580-9faa-69c2e814bf59",
              "name": "默认规则1",
              "isDefault": true,
              "code": "return true;",
              "connectionGuid": "0dade9b8-acc9-4223-8dab-9d55480722a8",
              "paticipants": [
                {
                  "PaticipantType": "role",
                  "PaticipantObj": {
                    "name": "中方员工",
                    "guid": "31a306a3-900d-46f6-ba95-66c37aaa9e84",
                    "roleId": 12
                  }
                },
                {
                  "PaticipantType": "role",
                  "PaticipantObj": {
                    "name": "Directors",
                    "guid": "0c57f01f-f576-4a97-9dcb-f4eea0959c03",
                    "roleId": 11
                  }
                }
              ]
            }
          ]
        },
        {
          "type": "st-autoActivity",
          "guid": "9d4a6006-1099-46ad-b037-24e84476ab50",
          "position": [
            253,
            261
          ],
          "name": "CEO批准?",
          "size": [
            50,
            50
          ],
          "linkForm": "",
          "beforeActions": "",
          "afterActions": "",
          "roles": "",
          "autoRules": [
            {
              "guid": "f00ea40e-d9ef-429b-b4bb-d18e0a4f5b05",
              "name": "大于5万",
              "isDefault": false,
              "code": `//规则判断与执行脚本代码, 'return true;' 代表该规则将适用.
if((double)BizValues["AmountTotal"]>50000)
{
  return true;
}`,
              "connectionGuid": "d95490ae-a806-42ed-9327-272cdc7a73e8",
              "paticipants": [
                {
                  "PaticipantType": "user",
                  "PaticipantObj": {
                    "name": "川普",
                    "guid": "c4961686-41a6-469a-afa9-df05e42ba9f8",
                    "userId": 16
                  }
                }
              ]
            },
            {
              "guid": "e0f3b9ef-2e97-4f6d-ad86-5554fe3e899f",
              "name": "默认规则",
              "isDefault": true,
              "code": `//规则判断与执行脚本代码, 'return true;' 代表该规则将适用.
return true;`,
              "connectionGuid": "04c313cf-e702-485a-ab7e-6e0603f73366",
              "paticipants": [
                {
                  "PaticipantType": "role",
                  "PaticipantObj": {
                    "name": "角色-系统管理员",
                    "guid": "ae25f603-87ff-4671-900f-ee69e770891a",
                    "roleId": 1
                  }
                }
              ]
            }
          ]
        }
      ]
    },
    "activityConnections": {
      "connections": [
        {
          "guid": "476d2d52-fd31-4589-9da8-8c1e7f5d0766",
          "name": "提交预审",
          "fromGuid": "f6152039-1745-4f4c-8f8e-3ed37770fa0d",
          "toGuid": "2dde0ed2-c10b-4c98-b263-1016dcfa951d",
          "showName": "",
          "beforeActions": "",
          "afterActions": ""
        },
        {
          "guid": "55d72a3e-051a-46a0-9aae-0be1c62b2e24",
          "name": "完成审批",
          "fromGuid": "2dde0ed2-c10b-4c98-b263-1016dcfa951d",
          "toGuid": "ab0f92f6-35cd-44b9-a7bd-5a17e544aa9c",
          "showName": "",
          "beforeActions": "",
          "afterActions": ""
        },
        {
          "guid": "0dade9b8-acc9-4223-8dab-9d55480722a8",
          "name": "CEO批准结束",
          "fromGuid": "5ee19a5b-df8b-4c11-a0d4-082848b5f216",
          "toGuid": "c09fcfbe-92a9-48cd-bd14-975996e063a7",
          "showName": "",
          "beforeActions": "",
          "afterActions": ""
        },
        {
          "guid": "ec0ac0d6-9ddb-4919-8a77-965891e9cfe7",
          "name": "完成审批",
          "fromGuid": "ab0f92f6-35cd-44b9-a7bd-5a17e544aa9c",
          "toGuid": "9d4a6006-1099-46ad-b037-24e84476ab50",
          "showName": "",
          "beforeActions": "",
          "afterActions": ""
        },
        {
          "guid": "d95490ae-a806-42ed-9327-272cdc7a73e8",
          "name": "送CEO批准",
          "fromGuid": "9d4a6006-1099-46ad-b037-24e84476ab50",
          "toGuid": "5ee19a5b-df8b-4c11-a0d4-082848b5f216",
          "showName": "",
          "beforeActions": "",
          "afterActions": ""
        },
        {
          "guid": "04c313cf-e702-485a-ab7e-6e0603f73366",
          "name": "直接完成批准生效",
          "fromGuid": "9d4a6006-1099-46ad-b037-24e84476ab50",
          "toGuid": "c09fcfbe-92a9-48cd-bd14-975996e063a7",
          "showName": "",
          "beforeActions": "",
          "afterActions": ""
        },
        {
          "guid": "9d985ac5-a1da-4c63-8aea-83e9974ffccc",
          "name": "直接提交",
          "fromGuid": "f6152039-1745-4f4c-8f8e-3ed37770fa0d",
          "toGuid": "9d4a6006-1099-46ad-b037-24e84476ab50",
          "showName": "",
          "beforeActions": "",
          "afterActions": ""
        }
      ]
    }
  };

  // return {
  //   "basicInfo": {
  //     "name": "TestFlow",
  //     "version": "0.0.1",
  //     "guid": "8ecd44c6-fb15-46ee-8bd5-031e30171deb",
  //     "desc": "Test Flow",
  //     "creator": {
  //       "name": "Qin,Chao",
  //       "guid": "4d0abaa9-4825-4809-8f8f-631a7595439c"
  //     },
  //     "createTime": "2016-12-20 8:00AM",
  //     "lastUpdateTime": ""
  //   },
  //   "advancedInfo": {
  //   },
  //   "customData": {
  //   },
  //   "activityNodes": {
  //     "nodes": [
  //       {
  //         "type": "st-start",
  //         "guid": "f6152039-1745-4f4c-8f8e-3ed37770fa0d",
  //         "size": [
  //           0,
  //           0
  //         ],
  //         "position": [
  //           120,
  //           22
  //         ],
  //         "name": "开始",
  //         "customData": {
  //         },
  //         "linkForm": "",
  //         "beforeActions": "",
  //         "afterActions": "",
  //         "roles": [
  //           {
  //             "PaticipantType": "role",
  //             "PaticipantObj": {
  //               "name": "角色-系统管理员",
  //               "guid": "ae25f603-87ff-4671-900f-ee69e770891a",
  //               "roleId": 1
  //             }
  //           }
  //         ]
  //       },
  //       {
  //         "type": "st-singleHumanActivity",
  //         "guid": "2dde0ed2-c10b-4c98-b263-1016dcfa951d",
  //         "size": [
  //           0,
  //           0
  //         ],
  //         "position": [
  //           100,
  //           100
  //         ],
  //         "name": "财务经理预审",
  //         "customData": {
  //         },
  //         "linkForm": "",
  //         "beforeActions": "",
  //         "afterActions": "",
  //         "roles": [
  //           {
  //             "PaticipantType": "user",
  //             "PaticipantObj": {
  //               "name": "李四",
  //               "guid": "27bcd361-12c7-4376-8dd8-ce68ad964431",
  //               "userId": 2
  //             }
  //           }
  //         ]
  //       },
  //       {
  //         "type": "st-multiHumanActivity",
  //         "guid": "ab0f92f6-35cd-44b9-a7bd-5a17e544aa9c",
  //         "size": [
  //           0,
  //           0
  //         ],
  //         "position": [
  //           100,
  //           200
  //         ],
  //         "name": "总监批准",
  //         "customData": {
  //         },
  //         "linkForm": "",
  //         "beforeActions": "",
  //         "afterActions": "",
  //         "roles": [
  //           {
  //             "PaticipantType": "role",
  //             "PaticipantObj": {
  //               "name": "Directors",
  //               "guid": "0c57f01f-f576-4a97-9dcb-f4eea0959c03",
  //               "roleId": 11
  //             }
  //           },
  //           {
  //             "PaticipantType": "role",
  //             "PaticipantObj": {
  //               "name": "中方员工",
  //               "guid": "31a306a3-900d-46f6-ba95-66c37aaa9e84",
  //               "roleId": 12
  //             }
  //           }
  //         ]
  //       },
  //       {
  //         "type": "st-end",
  //         "guid": "c09fcfbe-92a9-48cd-bd14-975996e063a7",
  //         "size": [
  //           0,
  //           0
  //         ],
  //         "position": [
  //           456,
  //           391
  //         ],
  //         "name": "结束",
  //         "customData": {
  //         },
  //         "linkForm": "",
  //         "beforeActions": "",
  //         "afterActions": "",
  //         "roles": ""
  //       },
  //       {
  //         "type": "st-singleHumanActivity",
  //         "guid": "5ee19a5b-df8b-4c11-a0d4-082848b5f216",
  //         "position": [
  //           259,
  //           377
  //         ],
  //         "name": "总经理终审",
  //         "size": [
  //           50,
  //           50
  //         ],
  //         "linkForm": "",
  //         "beforeActions": "",
  //         "afterActions": "",
  //         "roles": [
  //           {
  //             "PaticipantType": "user",
  //             "PaticipantObj": {
  //               "name": "川普",
  //               "guid": "c4961686-41a6-469a-afa9-df05e42ba9f8",
  //               "userId": 16
  //             }
  //           }
  //         ]
  //       }
  //     ]
  //   },
  //   "activityConnections": {
  //     "connections": [
  //       {
  //         "guid": "476d2d52-fd31-4589-9da8-8c1e7f5d0766",
  //         "name": "连接1",
  //         "fromGuid": "f6152039-1745-4f4c-8f8e-3ed37770fa0d",
  //         "toGuid": "2dde0ed2-c10b-4c98-b263-1016dcfa951d"
  //       },
  //       {
  //         "guid": "55d72a3e-051a-46a0-9aae-0be1c62b2e24",
  //         "name": "连接2",
  //         "fromGuid": "2dde0ed2-c10b-4c98-b263-1016dcfa951d",
  //         "toGuid": "ab0f92f6-35cd-44b9-a7bd-5a17e544aa9c"
  //       },
  //       {
  //         "guid": "0dade9b8-acc9-4223-8dab-9d55480722a8",
  //         "name": "连接3",
  //         "fromGuid": "5ee19a5b-df8b-4c11-a0d4-082848b5f216",
  //         "toGuid": "c09fcfbe-92a9-48cd-bd14-975996e063a7"
  //       },
  //       {
  //         "guid": "ceeae036-7b21-438f-bc46-33bfad0cc546",
  //         "name": "连接4",
  //         "fromGuid": "ab0f92f6-35cd-44b9-a7bd-5a17e544aa9c",
  //         "toGuid": "5ee19a5b-df8b-4c11-a0d4-082848b5f216"
  //       }
  //     ]
  //   }
  // };

  // return {
  //   basicInfo: { 
  //     name: 'TestFlow', 
  //     version: '0.0.1', 
  //     guid: "8ecd44c6-fb15-46ee-8bd5-031e30171deb", 
  //     desc: 'Test Flow', 
  //     creator: { name: 'Qin,Chao', guid: '4d0abaa9-4825-4809-8f8f-631a7595439c' }, 
  //     createTime: '2016-12-20 8:00AM', 
  //     lastUpdateTime: '' 
  //   },
  //   advancedInfo: {},    
  //   customData: {},
  //   activityNodes: {
  //     nodes: [
  //       { type: 'st-start', guid: "f6152039-1745-4f4c-8f8e-3ed37770fa0d", size: [0, 0], position: [100, 20], name: '开始', customData: {}, linkForm: "", beforeActions: "", afterActions: "", roles: "" }, //st-前缀表示standard
  //       { type: 'st-singleHumanActivity', guid: "2dde0ed2-c10b-4c98-b263-1016dcfa951d", size: [0, 0], position: [100, 100], name: '很长很长很长的单人处理1', customData: {}, linkForm: "", beforeActions: "", afterActions: "", roles: "" },
  //       { type: 'st-multiHumanActivity', guid: "ab0f92f6-35cd-44b9-a7bd-5a17e544aa9c", size: [0, 0], position: [100, 200], name: '多人处理1', customData: {}, linkForm: "", beforeActions: "", afterActions: "", roles: "" },
  //       { type: 'st-autoActivity', guid: "e35b4f81-21b3-407a-b14f-6e198a99ff1b", size: [0, 0], position: [100, 300], name: '自动处理1', customData: {}, linkForm: "", beforeActions: "", afterActions: "", roles: "" },
  //       { type: 'st-end', guid: "c09fcfbe-92a9-48cd-bd14-975996e063a7", size: [0, 0], position: [100, 400], name: '结束', customData: {}, linkForm: "", beforeActions: "", afterActions: "", roles: "" },
  //     ]
  //   },
  //   activityConnections: {
  //     connections: [
  //       { guid: "476d2d52-fd31-4589-9da8-8c1e7f5d0766", name: '连接1', fromGuid: 'f6152039-1745-4f4c-8f8e-3ed37770fa0d', toGuid: "2dde0ed2-c10b-4c98-b263-1016dcfa951d" },
  //       { guid: '55d72a3e-051a-46a0-9aae-0be1c62b2e24', name: '连接2', fromGuid: '2dde0ed2-c10b-4c98-b263-1016dcfa951d', toGuid: "ab0f92f6-35cd-44b9-a7bd-5a17e544aa9c" },
  //       { guid: 'fb10f5ec-3d4e-41d3-b375-6a169a3c978f', name: '连接3', fromGuid: 'ab0f92f6-35cd-44b9-a7bd-5a17e544aa9c', toGuid: "e35b4f81-21b3-407a-b14f-6e198a99ff1b" },
  //       { guid: '17b1b72f-3383-4631-a3ec-e4f3f5c82872', name: '连接4', fromGuid: 'e35b4f81-21b3-407a-b14f-6e198a99ff1b', toGuid: "c09fcfbe-92a9-48cd-bd14-975996e063a7" },
  //       { guid: '65729099-dbd2-46ad-b2a3-ec6c9efa641c', name: '连接5', fromGuid: '2dde0ed2-c10b-4c98-b263-1016dcfa951d', toGuid: "c09fcfbe-92a9-48cd-bd14-975996e063a7" },
  //     ]
  //   },
  // };

}