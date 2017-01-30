import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  template: `
  <div id="TotalFlowArea">
    <div id="MainSubjectArea" class="main-flow-area">
      EnouFlow Process Integrated Definition Environment
    </div>
    <div id="MainMenuBar" class="main-flow-area">顶层操作菜单</div>
    <div id="MainDesignArea" class="main-flow-area">
      <app-slide-tool-bar id="SlideToolBar">左侧工具栏</app-slide-tool-bar>
      <app-flow-frame id="FlowFrame">中间绘图区域</app-flow-frame>
      <app-property-panel id="PropertyPanel">右侧流程模板属性区</app-property-panel>
    </div>
    <div id="MainFooterArea" class="main-flow-area">页面主底端区域-保留</div>
  </div>  
  `
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
