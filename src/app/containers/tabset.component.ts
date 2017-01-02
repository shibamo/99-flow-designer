import { 
  Component, 
  OnInit, 
  AfterContentInit, 
  QueryList, 
  ContentChildren 
} from '@angular/core';

import { TabComponent } from './tab.component'

@Component({
  selector: 'app-tabset',
  template: `
    <div class="ui top attached tabular menu">
      <a *ngFor="let tab of tabs" 
        class="item"
        [class.active]="tab.active"
        (click)="setActive(tab)"
        style='padding-left:8px;padding-right:8px;'>

        {{ tab.title }}

      </a>
    </div>
    <ng-content></ng-content>
  `
})
export class TabsetComponent implements AfterContentInit {
  @ContentChildren(TabComponent) tabs: QueryList<TabComponent>;

  constructor() { }

  ngAfterContentInit() {
    this.tabs.toArray()[0].active = true;
  }

  setActive(tab: TabComponent) {
    this.tabs.toArray().forEach((t) => t.active = false);
    tab.active = true;
  }

}
