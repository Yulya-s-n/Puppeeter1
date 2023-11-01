let page;

beforeEach(async () => {
  page = await browser.newPage();
});

afterEach(() => {
  page.close();
});

describe("Github page tests", () => {

  beforeEach(async () => {
    await page.goto("https://github.com/team");
  });

  test("The h1 header content'", async () => {
    const firstLink = await page.$("header div div a");
    await firstLink.click();
    await page.waitForSelector('h1');//Стандартный паттерн ожидания загрузки следующей cтраницы
    const title2 = await page.title();
    expect(title2).toEqual('GitHub for teams · Build like the best teams on the planet · GitHub');
  }, 20000);

  test("The first link attribute", async () => {
    const actual = await page.$eval("a", link => link.getAttribute('href') );
    expect(actual).toEqual("#start-of-content");
  }, 30000);

  test("The page contains Sign in button", async () => {
    const btnSelector = ".btn-large-mktg.btn-mktg";
    await page.waitForSelector(btnSelector, {
      visible: true,
    });
    const actual = await page.$eval(btnSelector, link => link.textContent);
    expect(actual).toContain("Get started with Team")
  }, 40000);
});

describe("new tests", () => {

  beforeEach(async () => {
    page = await browser.newPage("https://github.blog");
  });
  
  test("Blog", async () => {
    await page.goto("https://github.blog", {timeout: 300000 });
    const title = await page.title();
    expect(title).toContain("The GitHub Blog - Updates, ideas, and inspiration from GitHub to help developers build and design software.");
  });

  test("Text under h1", async () => {
    await page.goto("https://github.com/features/security", {timeout: 300000 });
    const textSpans = await page.$$eval("span.color-fg-default", elements => elements.map(el => el.textContent));
    const expectedText = "Ship secure applications within the GitHub flow";
    expect(textSpans).toContain(expectedText);
  });

  test("Check Pricing page", async () => {
    await page.goto("https://github.com/pricing", {timeout: 300000 });
    const title = await page.title();
    expect(title).toContain("Pricing · Plans for every developer · GitHub");
  });
});
