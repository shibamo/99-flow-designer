import { Component, OnInit } from '@angular/core';

import { LogonBackendService } from
  '../services/logon-backend.service';

import { LogonRequestInfo, UserInfo } from '../models/authentication-data-def';

@Component({
  selector: 'app-main-menu',
  template: `
  <div class="ui blue inverted  menu">
    <div class="item">
      <img src="assets/images/FlowDesignerIcon.png">
    </div>
    
    <span class="text-center" 
      style="width: 100%; font-size: large; line-height: 2em; color: #eeeeee">
      <span class="glyphicon glyphicon-pencil" aria-hidden="true"></span>
      <span id="app-title-text">流程模板定义器/Flow Template Designer</span>
      
    </span>
    <div class="right menu">
      <a class="item" (click)="logon()">登录</a>
      <a class="item" (click)="logoff()">注销</a>
      <a class="item">OPASV2.0</a>
       
    </div>
  </div>
  `,
})
export class MainMenuComponent implements OnInit {

  constructor(private logonBackendService:
      LogonBackendService) { }

  ngOnInit() {
  }

  logon(){

  }

  logoff(){

  }

}
