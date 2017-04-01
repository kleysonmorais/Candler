import { CandlerWebPage } from './app.po';

describe('candler-web App', function() {
  let page: CandlerWebPage;

  beforeEach(() => {
    page = new CandlerWebPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
