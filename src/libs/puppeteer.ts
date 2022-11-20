import puppeteer, { Browser, Page } from 'puppeteer';

export const generatePDF = async (url: string, accessToken: string, destPath: string): Promise<void> => {
  // start a new browser, without showing UI
  const browser: Browser = await puppeteer.launch({
    headless: true,
    ignoreHTTPSErrors: true,
    args: ['--no-sandbox']
  });
  const page: Page = await browser.newPage();

  await page.setExtraHTTPHeaders({
    'Authorization': `Bearer ${accessToken}`
  });

  // networkidle0 means we're waiting for the network to stop making new calls for 500ms
  await page.goto(url, {waitUntil: 'networkidle0'});

  //Let's generate the pdf and close the browser
  await page.pdf({ path: destPath, format: 'A4' });
  await browser.close();
};