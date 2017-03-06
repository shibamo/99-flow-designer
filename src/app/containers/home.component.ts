import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  template: `
  <div id="TotalFlowArea">
    <!-- <header id="MainSubjectArea" class="main-flow-area">
      <p class="text-center">
        OPAS 在线流程执行系统 V2.0 流程模板定义工具 
      </p>
    </header> -->
    <div id="MainMenuBar" class="main-flow-area">
      <app-main-menu id="MainMenu">主菜单栏</app-main-menu>
    </div>
    <div id="MainDesignArea" class="main-flow-area">
      <app-slide-tool-bar id="SlideToolBar">左侧工具栏</app-slide-tool-bar>
      <app-flow-frame id="FlowFrame">中间绘图区域</app-flow-frame>
      <app-property-panel id="PropertyPanel">右侧流程模板属性区</app-property-panel>
    </div>
    <div id="MainFooterArea" class="main-flow-area">
      <p class="text-center">
        &copy; 2017 - OPAS 在线流程执行系统 V2.0 
      </p>
    </div>
  </div>  
  `
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
