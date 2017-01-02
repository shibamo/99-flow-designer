import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {
  createStore,
  Store,
  compose,
  StoreEnhancer
} from 'redux';

// 服务
import { FlowTemplateMetaService } from './services/flow-template-meta.service';
import { PropertyControlService } from './services/property-control.service';

// 根组件
import { AppComponent } from './app.component'; 

// 其他容器与功能型组件
import { SlideToolBarComponent } from './containers/slide-tool-bar.component';
import { ActivityToolComponent } from './components/activity-tool.component';
import { FlowFrameComponent } from './containers/flow-frame.component';
import { FlowTemplateMenuComponent } from './containers/flow-template-menu.component';
import { FlowChartParentComponent } from './components/flow-chart-parent.component';
import { PropertyPanelComponent } from './containers/property-panel.component';
import { TabsetComponent } from './containers/tabset.component';
import { TabComponent } from './containers/tab.component';
import { DynamicFlowPropertyControlComponent } from
  './components/dynamic-flow-property-control.component';
import { SimpleModalDialogComponent } from 
  './components/simple-modal-dialog.component';

// 统一数据状态管理
import { AppStore } from './app-store';
import {
  AppState,
  default as reducer
} from './reducers';


// Chrome Redux调试工具兼容
let devtools: StoreEnhancer<AppState> =
  window['devToolsExtension'] ?
  window['devToolsExtension']() : f => f;

let store: Store<AppState> = createStore<AppState>(
  reducer,
  compose(devtools)
);

export function createStoreEx(){
  return store;
}

@NgModule({
  declarations: [
    AppComponent,
    SlideToolBarComponent,
    ActivityToolComponent,
    FlowFrameComponent,
    FlowTemplateMenuComponent,
    FlowChartParentComponent,
    PropertyPanelComponent,
    TabsetComponent,
    TabComponent,
    DynamicFlowPropertyControlComponent,
    SimpleModalDialogComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    CommonModule
  ],
  providers: [
    { provide: AppStore, useFactory: createStoreEx },
    FlowTemplateMetaService,
    PropertyControlService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
