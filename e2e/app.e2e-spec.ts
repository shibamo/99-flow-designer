import { FlowDesignerPage } from './app.po';

describe('flow-designer App', function() {
  let page: FlowDesignerPage;

  beforeEach(() => {
    page = new FlowDesignerPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
