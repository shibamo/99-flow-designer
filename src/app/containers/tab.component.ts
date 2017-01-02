import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-tab',
  template: `
    <div class="ui bottom attached tab segment" [class.active]="active"
    style="border-top-width: 0px;">

      <ng-content></ng-content>

    </div>
  `
})
export class TabComponent implements OnInit {
  @Input() title: string;
  active: boolean = false;
  name: string;

  constructor() { }

  ngOnInit() {
  }

}
