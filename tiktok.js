// importing puppeteer & open new tab for headless browser
const puppeteer = require('puppeteer');
const iPhone = puppeteer.devices['iPhone 6'];

(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
//here we catch all requests to block
//images & stylesheet & fonts to save data and speed up our scraper
await page.setRequestInterception(true);

page.on('request', (request) => {
  if(['image', 'stylesheet', 'font'].includes(request.resourceType())) {
    request.abort();
  } else {
    request.continue();
  }
})




  await page.goto('https://www.tiktok.com/search/video?q=@willsmith');//change @willsmith to user id or keyword




  for (var i=0;i<2;i++){ //Loop 2 pages
  await page.waitForSelector('button[data-e2e=search-load-more]');
  await page.keyboard.press('PageDown');
  await page.waitForTimeout('300');
  await page.keyboard.press('PageDown');
  await page.waitForTimeout('300');
  await page.keyboard.press('PageDown');
  await page.waitForTimeout('300');
  await page.keyboard.press('PageDown');
  await page.click('button[data-e2e=search-load-more]')
  }
  await page.waitForSelector('div.tiktok-bbkab3-DivContainer > div > div > a')//select links &  videos description
  const urls = await page.evaluate(() => 
    Array.from(document.querySelectorAll('div.tiktok-bbkab3-DivContainer > div > div > a '), element => element.href));
    
  var videoDes = await page.evaluate(() =>Array.from(document.querySelectorAll('div > div.tiktok-f22ew5-DivMetaCaptionLine.e1lwj0oe1')).map((items) => items.innerText))
    
    for (var i=videoDes.length; i--;) {
      videoDes[i] = videoDes[i] + ' #shorts' + "\r\n" ;} //append #shorts for each video title

  
//save videos names to files
    const fs = require('fs');

    fs.appendFile('names.txt','Video Title: ' + videoDes + "\r\n" , function (err) {
    if (err) throw err;
    console.log('Saved Videos names');
    });
//loop on snaptik for no watermark tiktok videos
  
for (var i=0;i<urls.length;i++) //Loop 10 times
{

await page.waitForTimeout(1210);
await page.goto('https://snaptik.app/');
await page.waitForTimeout(300);
await page.waitForSelector('input[name="url"]');
await page.type('input[name="url"]' , (urls[i])); //type result of links
await page.waitForTimeout(300);
await page.keyboard.press('Enter');
await page.waitForTimeout(500);
await page.waitForXPath('//*[@id="download-block"]/div/a[1]');
const featureArticle = (await page.$x('//*[@id="download-block"]/div/a[1]'))[0];
    // the same as:
    // const featureArticle = await page.$('#mp-tfa');

    const text = await page.evaluate(el => {
        // do what you want with featureArticle in page.evaluate
        return el.href;
    }, featureArticle);
    var noWaterMark = text
    const content = decodeURIComponent(noWaterMark);

    
    const https = require('https');
    const ds = require('fs');
    
     // link to file you want to download
    const path = './' // location to save videos

    //genrate random number for file name
    function getRandomFileName() {
      var timestamp = new Date().toISOString().replace(/[-:.]/g,"");    
      return timestamp;
      }
    const request = https.get(content, function(response) {
        if (response.statusCode === 200) {
            var file = ds.createWriteStream(path+getRandomFileName()+'.mp4');
            response.pipe(file);
            console.log(file.path + ' Saved!')
            
            const fs = require('fs');

            fs.appendFile('names.txt',file.path + "\r\n" , function (err) {
            if (err) throw err;
            console.log('Done');
            });
        }

        // request.setTimeout(60000, function() { // if after 60s file not downlaoded, we abort a request 
        //     request.destroy();
    // });
    });
    ;};


  await browser.close();
  
  
})();
