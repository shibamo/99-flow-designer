import { genGuid } from '../utilites/gen-guid';

export function mockFlowDataObj(): Object {
  return {
    'basicInfo': {
      'name': '流程模板样例',
      'code': 'XX',
      'version': '1',
      'guid': genGuid(),
      'desc': 'Test Flow',
      'creator': {
        'name': 'Qin,Chao',
        'guid': '4d0abaa9-4825-4809-8f8f-631a7595439c'
      },
      'createTime': '2016-12-20 8:00AM',
      'lastUpdateTime': '',
      'displayName': '测试流程1',
      'isPopular': ''
    },
    'advancedInfo': {
      'arbitraryJumpAllowed': '',
      'managers': ''
    },
    'customData': {
    },
    'activityNodes': {
      'nodes': [
        {
          'type': 'st-start',
          'guid': 'f6152039-1745-4f4c-8f8e-3ed37770fa0d',
          'size': [
            0,
            0
          ],
          'position': [
            120,
            22
          ],
          'name': '开始',
          'customData': {
          },
          'linkForm': '',
          'beforeActions': '',
          'afterActions': '',
          'roles': [
            {
              'PaticipantType': 'role',
              'PaticipantObj': {
                'name': '角色-系统管理员',
                'guid': 'ae25f603-87ff-4671-900f-ee69e770891a',
                'roleId': 1
              }
            }
          ]
        },
        {
          'type': 'st-singleHumanActivity',
          'guid': '2dde0ed2-c10b-4c98-b263-1016dcfa951d',
          'size': [
            0,
            0
          ],
          'position': [
            100,
            100
          ],
          'name': '财务经理预审',
          'customData': {
          },
          'linkForm': '',
          'beforeActions': '',
          'afterActions': '',
          'roles': [
            {
              'PaticipantType': 'user',
              'PaticipantObj': {
                'name': '李四',
                'guid': '27bcd361-12c7-4376-8dd8-ce68ad964431',
                'userId': 2
              }
            }
          ]
        },
        {
          'type': 'st-multiHumanActivity',
          'guid': 'ab0f92f6-35cd-44b9-a7bd-5a17e544aa9c',
          'size': [
            0,
            0
          ],
          'position': [
            100,
            200
          ],
          'name': '总监批准',
          'customData': {
          },
          'linkForm': '',
          'beforeActions': '',
          'afterActions': '',
          'roles': [
            {
              'PaticipantType': 'role',
              'PaticipantObj': {
                'name': 'Directors',
                'guid': '0c57f01f-f576-4a97-9dcb-f4eea0959c03',
                'roleId': 11
              }
            },
            {
              'PaticipantType': 'role',
              'PaticipantObj': {
                'name': '中方员工',
                'guid': '31a306a3-900d-46f6-ba95-66c37aaa9e84',
                'roleId': 12
              }
            }
          ]
        },
        {
          'type': 'st-end',
          'guid': 'c09fcfbe-92a9-48cd-bd14-975996e063a7',
          'size': [
            0,
            0
          ],
          'position': [
            492,
            373
          ],
          'name': '结束',
          'customData': {
          },
          'linkForm': '',
          'beforeActions': '',
          'afterActions': '',
          'roles': ''
        },
        {
          'type': 'st-singleHumanActivity',
          'guid': '5ee19a5b-df8b-4c11-a0d4-082848b5f216',
          'position': [
            287,
            441
          ],
          'name': '总经理终审',
          'size': [
            50,
            50
          ],
          'linkForm': '',
          'beforeActions': '',
          'afterActions': '',
          'roles': [
            {
              'PaticipantType': 'user',
              'PaticipantObj': {
                'name': '川普',
                'guid': 'c4961686-41a6-469a-afa9-df05e42ba9f8',
                'userId': 16
              }
            }
          ],
          'autoRules': [
            {
              'guid': '6146f486-0b86-4580-9faa-69c2e814bf59',
              'name': '默认规则1',
              'isDefault': true,
              'code': 'return true;',
              'connectionGuid': '0dade9b8-acc9-4223-8dab-9d55480722a8',
              'paticipants': [
                {
                  'PaticipantType': 'role',
                  'PaticipantObj': {
                    'name': '中方员工',
                    'guid': '31a306a3-900d-46f6-ba95-66c37aaa9e84',
                    'roleId': 12
                  }
                },
                {
                  'PaticipantType': 'role',
                  'PaticipantObj': {
                    'name': 'Directors',
                    'guid': '0c57f01f-f576-4a97-9dcb-f4eea0959c03',
                    'roleId': 11
                  }
                }
              ]
            }
          ]
        },
        {
          'type': 'st-autoActivity',
          'guid': '9d4a6006-1099-46ad-b037-24e84476ab50',
          'position': [
            253,
            261
          ],
          'name': 'CEO批准?',
          'size': [
            50,
            50
          ],
          'linkForm': '',
          'beforeActions': '',
          'afterActions': '',
          'roles': '',
          'autoRules': [
            {
              'guid': 'f00ea40e-d9ef-429b-b4bb-d18e0a4f5b05',
              'name': '大于5万',
              'isDefault': false,
              'code': 'IC8v6KeE5YiZ5Yik5pat5LiO5omn6KGM6ISa5pys5Luj56CBLCAicmV0dXJuIHRydWU7IiDku6Pooajor6Xop4TliJnlsIbpgILnlKguCiAgICAgICAgICAgIGlmKChkb3VibGUpQml6RGF0YS5BbW91bnRUb3RhbD41MDAwMCkgewogICAgICAgICAgICAgIHJldHVybiB0cnVlOwogICAgICAgICAgICB9CiAgICAgICAgICAgIA==',
              'connectionGuid': 'd95490ae-a806-42ed-9327-272cdc7a73e8',
              'paticipants': [
                {
                  'PaticipantType': 'user',
                  'PaticipantObj': {
                    'name': '川普',
                    'guid': 'c4961686-41a6-469a-afa9-df05e42ba9f8',
                    'userId': 16
                  }
                }
              ]
            },
            {
              'guid': 'e0f3b9ef-2e97-4f6d-ad86-5554fe3e899f',
              'name': '默认规则',
              'isDefault': true,
              'code': 'Ly/op4TliJnliKTmlq3kuI7miafooYzohJrmnKzku6PnoIEsICdyZXR1cm4gdHJ1ZTsnIOS7o+ihqOivpeinhOWImeWwhumAgueUqC4KICAgICAgICAgICAgcmV0dXJuIHRydWU7',
              'connectionGuid': '04c313cf-e702-485a-ab7e-6e0603f73366',
              'paticipants': [
                {
                  'PaticipantType': 'role',
                  'PaticipantObj': {
                    'name': '角色-系统管理员',
                    'guid': 'ae25f603-87ff-4671-900f-ee69e770891a',
                    'roleId': 1
                  }
                }
              ]
            }
          ]
        }
      ]
    },
    'activityConnections': {
      'connections': [
        {
          'guid': '476d2d52-fd31-4589-9da8-8c1e7f5d0766',
          'name': '提交预审',
          'fromGuid': 'f6152039-1745-4f4c-8f8e-3ed37770fa0d',
          'toGuid': '2dde0ed2-c10b-4c98-b263-1016dcfa951d',
          'showName': '',
          'beforeActions': '',
          'afterActions': ''
        },
        {
          'guid': '55d72a3e-051a-46a0-9aae-0be1c62b2e24',
          'name': '完成审批',
          'fromGuid': '2dde0ed2-c10b-4c98-b263-1016dcfa951d',
          'toGuid': 'ab0f92f6-35cd-44b9-a7bd-5a17e544aa9c',
          'showName': '',
          'beforeActions': '',
          'afterActions': ''
        },
        {
          'guid': '0dade9b8-acc9-4223-8dab-9d55480722a8',
          'name': 'CEO批准结束',
          'fromGuid': '5ee19a5b-df8b-4c11-a0d4-082848b5f216',
          'toGuid': 'c09fcfbe-92a9-48cd-bd14-975996e063a7',
          'showName': '',
          'beforeActions': '',
          'afterActions': ''
        },
        {
          'guid': 'ec0ac0d6-9ddb-4919-8a77-965891e9cfe7',
          'name': '完成审批',
          'fromGuid': 'ab0f92f6-35cd-44b9-a7bd-5a17e544aa9c',
          'toGuid': '9d4a6006-1099-46ad-b037-24e84476ab50',
          'showName': '',
          'beforeActions': '',
          'afterActions': ''
        },
        {
          'guid': 'd95490ae-a806-42ed-9327-272cdc7a73e8',
          'name': '送CEO批准',
          'fromGuid': '9d4a6006-1099-46ad-b037-24e84476ab50',
          'toGuid': '5ee19a5b-df8b-4c11-a0d4-082848b5f216',
          'showName': '',
          'beforeActions': '',
          'afterActions': ''
        },
        {
          'guid': '04c313cf-e702-485a-ab7e-6e0603f73366',
          'name': '直接完成批准生效',
          'fromGuid': '9d4a6006-1099-46ad-b037-24e84476ab50',
          'toGuid': 'c09fcfbe-92a9-48cd-bd14-975996e063a7',
          'showName': '',
          'beforeActions': '',
          'afterActions': ''
        },
        {
          'guid': '9d985ac5-a1da-4c63-8aea-83e9974ffccc',
          'name': '直接提交',
          'fromGuid': 'f6152039-1745-4f4c-8f8e-3ed37770fa0d',
          'toGuid': '9d4a6006-1099-46ad-b037-24e84476ab50',
          'showName': '',
          'beforeActions': '',
          'afterActions': ''
        }
      ]
    }
  };
}