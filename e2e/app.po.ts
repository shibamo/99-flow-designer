import { browser, element, by } from 'protractor';

export class FlowDesignerPage {
  navigateTo() {
    return browser.get('/');
  }

  getAppTitleText() {
    return element(by.id('app-title-text')).getText();
  }
}
