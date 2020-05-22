import puppeteer from 'puppeteer-core';
import {
  openBrowser,
  openPage,
  textBySelector,
} from '../helper';

let browser: puppeteer.Browser;
let page: puppeteer.Page;
const pageName = '/';

beforeEach(async () => {
  browser = await openBrowser();
  page = await openPage(browser, pageName);
  await page.setViewport({
    width: 1280,
    height: 980,
    deviceScaleFactor: 1
  });
});

afterEach(async () => {
  if (browser) {
    browser.close();
  }
});

describe('Example Test Scenarios', () => {
  test('check if page title is correct', async () => {
    const title = await page.title();
    expect(title).toEqual('The Internet');
})

test('check if basic authentication works', async () => {
  await page.setExtraHTTPHeaders({
    Authorization: `Basic ${Buffer.from('admin:admin').toString('base64')}`
  });
  await page.goto((await page.url())+'/basic_auth')
  const successMessage = await textBySelector(page, '.example p');
  expect(successMessage.trim()).toEqual("Congratulations! You must have the proper credentials.")
})
});
