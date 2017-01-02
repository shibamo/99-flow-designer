import { Component, OnInit, Input, Inject } from '@angular/core';
import { Store } from 'redux';

import { AppStore } from '../app-store';
import {
  ActivityToolActions
} from '../actions';

import {
  AppState
} from '../reducers';

import {ActivityTool, ActivityToolSet} from '../models/flow-data-def';

@Component({
  selector: 'flow-activity-tool',
  template: `
  <div class="activity-tool" [ngClass]="{'activity-tool-selected': isSelected}" (click)="onClick($event)">
    <img [src]="imagePath" [alt]="tooltip">
    <div class="activity-tool-name">{{activityToolName}}</div>
  </div>
  `
})
export class ActivityToolComponent implements OnInit {
  @Input() isSelected: boolean = false;
  @Input() activityType: string;
  @Input() activityToolName: string;
  @Input() imagePath: string;
  @Input() tooltip?: string;
  @Input() tool?: ActivityTool;

  constructor(@Inject(AppStore) private store: Store<AppState>){ 
    
  }

  ngOnInit() {
  }

  onClick(event:any){
    this.store.dispatch(ActivityToolActions.setCurrentTool(this.activityType));
    event.preventDefault();
  }

}
