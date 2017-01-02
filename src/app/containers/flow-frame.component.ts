import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-flow-frame',
  template: `
    <app-flow-template-menu id="FlowTemplateMenu"></app-flow-template-menu>
    <app-flow-chart-parent id="FlowChartParent"></app-flow-chart-parent>

  `
})
export class FlowFrameComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
