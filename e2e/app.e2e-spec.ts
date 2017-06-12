import { FlowDesignerPage } from './app.po';

describe('Flow-Template-Designer App', function() {
  let page: FlowDesignerPage;

  beforeEach(() => {
    page = new FlowDesignerPage();
  });

  it('should display app title in main menu', () => {
    page.navigateTo();
    expect(page.getAppTitleText()).toEqual('流程模板定义器/Flow Template Designer');
  });
});
