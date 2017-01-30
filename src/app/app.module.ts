import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import * as primeng from 'primeng/primeng';
import {
  createStore,
  Store,
  compose,
  StoreEnhancer
} from 'redux';

// 服务
import { FlowTemplateMetaService } from './services/flow-template-meta.service';
import { PropertyControlService } from './services/property-control.service';
import { OrgDataService } from './services/org-data.service';
import { FlowTemplateBackendService } from './services/flow-template-backend.service';
import { AppConfigService } from './services/app-config.service';

// 根组件
import { AppComponent } from './app.component';

// 容器型组件
import { HomeComponent } from './containers/home.component';
import { SlideToolBarComponent } from './containers/slide-tool-bar.component';
import { FlowFrameComponent } from './containers/flow-frame.component';
import { FlowTemplateMenuComponent } from './containers/flow-template-menu.component';
import { PropertyPanelComponent } from './containers/property-panel.component';
import { TabsetComponent } from './containers/tabset.component';
import { TabComponent } from './containers/tab.component';

// 功能型组件
import { ActivityToolComponent }
  from './components/activity-tool.component';
import { FlowChartParentComponent }
  from './components/flow-chart-parent.component';
import { DynamicFlowPropertyControlComponent } from
  './components/dynamic-flow-property-control.component';
import { SimpleModalDialogComponent } from
  './components/simple-modal-dialog.component';
import { RoleUserSelectorComponent }
  from './components/role-user-selector.component';
import { RoleUserDialogComponent }
  from './components/role-user-dialog.component';
import { ConditionRuleManagerComponent }
  from './components/condition-rule-manager.component';
import { ConditionRuleEditorComponent }
  from './components/condition-rule-editor.component';


const appRoutes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' }
];

export const appRoutingProviders: any[] = [
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);




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

export function createStoreEx() {
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
    SimpleModalDialogComponent,
    RoleUserSelectorComponent,
    ConditionRuleManagerComponent,
    RoleUserDialogComponent,
    HomeComponent,
    ConditionRuleEditorComponent
  ],
  imports: [
    primeng.SharedModule,
    primeng.DialogModule,
    primeng.TabViewModule,
    primeng.ButtonModule,
    primeng.OrderListModule,
    primeng.TabViewModule,
    primeng.DataTableModule,
    primeng.DataListModule,
    primeng.MenubarModule,
    primeng.MenuModule,
    primeng.ContextMenuModule,
    primeng.DropdownModule,
    primeng.CheckboxModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    CommonModule,
    routing
  ],
  providers: [
    AppConfigService,
    OrgDataService,
    { provide: AppStore, useFactory: createStoreEx },
    FlowTemplateMetaService,
    FlowTemplateBackendService,
    PropertyControlService,
    appRoutingProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
