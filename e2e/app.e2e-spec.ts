import { Ng2IdxDbServicePage } from './app.po';

describe('ng2-idx-db-service App', function() {
  let page: Ng2IdxDbServicePage;

  beforeEach(() => {
    page = new Ng2IdxDbServicePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
