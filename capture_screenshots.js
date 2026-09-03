const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const SCREENSHOT_DIR = '/opt/cursor/artifacts/screenshots';
const LOCALHOST = 'http://localhost:3000';
const PREVIEW = 'https://temporary-snappy-maple-kkys5lz.vercel.app';

const viewports = {
  desktop: { width: 1440, height: 900 },
  tablet: { width: 1024, height: 768 },
  mobile: { width: 390, height: 844 }
};

const routes = [
  { path: '/', name: 'homepage' },
  { path: '/auto-insurance/', name: 'auto' },
  { path: '/trucking-insurance/', name: 'trucking' }
];

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function captureScreenshot(browser, url, viewport, filename) {
  const page = await browser.newPage();
  await page.setViewport(viewport);
  await page.goto(url, { waitUntil: 'networkidle0', timeout: 30000 });
  
  const filepath = path.join(SCREENSHOT_DIR, filename);
  await page.screenshot({ path: filepath, fullPage: false });
  console.log(`Captured: ${filename}`);
  await page.close();
  return filepath;
}

async function captureSection(browser, url, viewport, filename, scrollAmount) {
  const page = await browser.newPage();
  await page.setViewport(viewport);
  await page.goto(url, { waitUntil: 'networkidle0', timeout: 30000 });
  
  if (scrollAmount > 0) {
    await page.evaluate((amount) => window.scrollTo(0, amount), scrollAmount);
    await sleep(500);
  }
  
  const filepath = path.join(SCREENSHOT_DIR, filename);
  await page.screenshot({ path: filepath, fullPage: false });
  console.log(`Captured: ${filename}`);
  await page.close();
  return filepath;
}

async function main() {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const screenshots = [];

  console.log('\n=== Capturing localhost screenshots ===\n');
  
  // Capture all route/viewport combinations for localhost
  for (const route of routes) {
    for (const [vpName, vpSize] of Object.entries(viewports)) {
      const width = vpName === 'desktop' ? '1440' : (vpName === 'tablet' ? '1024' : '390');
      const filename = `${route.name}_${width}_hero.png`;
      const url = LOCALHOST + route.path;
      const filepath = await captureScreenshot(browser, url, vpSize, filename);
      screenshots.push(filepath);
    }
  }

  console.log('\n=== Capturing special homepage sections (1440) ===\n');
  
  // Homepage hero settled (after animation)
  const homepageHeroPage = await browser.newPage();
  await homepageHeroPage.setViewport(viewports.desktop);
  await homepageHeroPage.goto(LOCALHOST + '/', { waitUntil: 'networkidle0' });
  await sleep(3000); // Wait for animation
  let filepath = path.join(SCREENSHOT_DIR, 'homepage_1440_hero_settled.png');
  await homepageHeroPage.screenshot({ path: filepath });
  screenshots.push(filepath);
  console.log('Captured: homepage_1440_hero_settled.png');
  await homepageHeroPage.close();

  // Personal filmstrip section
  filepath = await captureSection(browser, LOCALHOST + '/', viewports.desktop, 'homepage_1440_personal_filmstrip.png', 900);
  screenshots.push(filepath);

  // Commercial discovery section
  filepath = await captureSection(browser, LOCALHOST + '/', viewports.desktop, 'homepage_1440_commercial_discovery.png', 1800);
  screenshots.push(filepath);

  // Yep section
  filepath = await captureSection(browser, LOCALHOST + '/', viewports.desktop, 'homepage_1440_yep_section.png', 2700);
  screenshots.push(filepath);

  console.log('\n=== Capturing Auto and Trucking mid-page sections ===\n');
  
  // Auto coverage section
  filepath = await captureSection(browser, LOCALHOST + '/auto-insurance/', viewports.desktop, 'auto_1440_coverage.png', 900);
  screenshots.push(filepath);

  // Trucking mid-page
  filepath = await captureSection(browser, LOCALHOST + '/trucking-insurance/', viewports.desktop, 'trucking_1440_midpage.png', 900);
  screenshots.push(filepath);

  console.log('\n=== Capturing preview URL screenshots ===\n');
  
  // Capture all route/viewport combinations for preview URL
  for (const route of routes) {
    for (const [vpName, vpSize] of Object.entries(viewports)) {
      const width = vpName === 'desktop' ? '1440' : (vpName === 'tablet' ? '1024' : '390');
      const filename = `preview_${route.name}_${width}_hero.png`;
      const url = PREVIEW + route.path;
      const filepath = await captureScreenshot(browser, url, vpSize, filename);
      screenshots.push(filepath);
    }
  }

  await browser.close();
  
  console.log('\n=== All screenshots captured ===\n');
  console.log(JSON.stringify(screenshots, null, 2));
  
  return screenshots;
}

main().catch(console.error);
