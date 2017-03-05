import { Injectable } from '@angular/core';
import { genGuid } from '../utilites/gen-guid';
import * as moment from 'moment';

@Injectable()
export class NewFlowTemplateSkeletonService {
  constructor() {
  }

  getNewFlowTemplateSkeletonObj(): Object {
    return {
      'basicInfo': {
        'name': 'Untitled Flow',
        'code': 'XXX',
        'version': '1',
        'guid': genGuid(),
        'desc': 'Untitled Flow',
        'creator': {
          'name': 'Qin,Chao',
          'guid': 'yyyyyyyy-yyyy-yyyy-yyyy-yyyyyyyyyyyy'
        },
        'createTime': moment().format('YYYY-MM-DD HH:mm:ssA'),
        'lastUpdateTime': '',
        'displayName': 'Untitled Flow/未命名流程',
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
            'guid': genGuid(),
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
            ]
          },
          {
            'type': 'st-end',
            'guid': genGuid(),
            'size': [
              0,
              0
            ],
            'position': [
              300,
              200
            ],
            'name': '结束',
            'customData': {
            },
            'linkForm': '',
            'beforeActions': '',
            'afterActions': '',
            'roles': [
            ]
          },
        ]
      },
      'activityConnections': {
        'connections': [
        ]
      }
    };
  }
}
