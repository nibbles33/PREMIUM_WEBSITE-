const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ 
    headless: false,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });
  
  console.log('Navigating to homepage...');
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' });
  
  console.log('Waiting 3 seconds on hero...');
  await new Promise(resolve => setTimeout(resolve, 3000));
  
  console.log('Scrolling to authority section...');
  
  // Inject monitoring script BEFORE scrolling
  await page.evaluate(() => {
    window.animationData = {
      startTime: null,
      endTime: null,
      samples: []
    };
    
    // Wait for the section to appear
    const checkAndMonitor = setInterval(() => {
      const section = document.querySelector('.pilot-authority-strip');
      if (!section) return;
      
      const firstStat = section.querySelector('span[aria-label*="2700"], span[aria-label*="2,700"]');
      if (!firstStat) return;
      
      clearInterval(checkAndMonitor);
      
      let lastValue = firstStat.textContent.trim();
      let startRecorded = false;
      
      const observer = new MutationObserver(() => {
        const newValue = firstStat.textContent.trim();
        if (newValue !== lastValue) {
          const now = performance.now();
          
          if (!startRecorded) {
            window.animationData.startTime = now;
            startRecorded = true;
            console.log('[ANIMATION START]', now, 'Value:', newValue);
          }
          
          window.animationData.samples.push({ time: now, value: newValue });
          console.log('[ANIMATION UPDATE]', now, 'Value:', newValue);
          lastValue = newValue;
          
          // Check if animation is complete
          if (newValue.includes('2,700') || newValue.includes('2700')) {
            window.animationData.endTime = now;
            const duration = window.animationData.endTime - window.animationData.startTime;
            console.log('[ANIMATION END]', now, 'Duration:', duration, 'ms');
            observer.disconnect();
          }
        }
      });
      
      observer.observe(firstStat, { 
        childList: true, 
        subtree: true, 
        characterData: true 
      });
      
      console.log('[MONITOR] Observer attached, waiting for animation...');
    }, 100);
  });
  
  // Scroll slowly to trigger the animation
  await page.evaluate(() => {
    const section = document.querySelector('.pilot-authority-strip');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  });
  
  // Wait for animation to complete
  await new Promise(resolve => setTimeout(resolve, 5000));
  
  // Get the results
  const results = await page.evaluate(() => window.animationData);
  
  console.log('\n========== RESULTS ==========');
  console.log('Start Time:', results.startTime?.toFixed(2), 'ms');
  console.log('End Time:', results.endTime?.toFixed(2), 'ms');
  if (results.startTime && results.endTime) {
    const duration = results.endTime - results.startTime;
    console.log('Total Duration:', duration.toFixed(2), 'ms (' + (duration/1000).toFixed(2) + 's)');
    console.log('Sample Count:', results.samples.length);
  } else {
    console.log('Animation not captured properly');
  }
  console.log('============================\n');
  
  await browser.close();
})();
