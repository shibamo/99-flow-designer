import { Component, OnInit, Inject, ElementRef } from '@angular/core';
import { Store } from 'redux';

import {ActivityToolComponent} from '../components/activity-tool.component';

import {ActivityTool, ActivityToolSet} from '../models/flow-data-def';

import {activityToolsConfig} from '../services/slide-tool-bar.config';

import { AppStore } from '../app-store';

import {
  ActivityToolActions
} from '../actions';

import {
  AppState,
  getCurrentActivityTool,
} from '../reducers';


@Component({
  selector: 'app-slide-tool-bar',
  template: `
  <div class="ui vertical accordion menu">
    <div *ngFor="let toolset of activityToolSets;let i = index;" class="item">
      <div class="activity-tool-tab title" [ngClass]="{active: i==0}"
      style="padding-bottom: 10px;">
        {{toolset.display}}
      </div>
      <flow-activity-tool *ngFor="let tool of toolset.tools; " 
        [activityType]="tool.activityType" [activityToolName]="tool.activityToolName" 
        [imagePath]="tool.imagePath" [isSelected]="tool.activityType==currentActivityType"
        [tool]="tool" class="active content" style="padding:0px;">
      </flow-activity-tool>
    </div>
  </div>
  `
})
export class SlideToolBarComponent implements OnInit {
  activityToolSets: ActivityToolSet[];
  currentActivityType: string;

  constructor(@Inject(AppStore) private store: Store<AppState>) { 
    this.activityToolSets = activityToolsConfig.activityToolsets;
    store.subscribe(() => this.updateCurrentActivityTool());
    this.updateCurrentActivityTool();
  }

  updateCurrentActivityTool(){
    let state = this.store.getState();
    this.currentActivityType = state.activityTools.currentActivityTool;
  }

  ngOnInit() {
  }
}
