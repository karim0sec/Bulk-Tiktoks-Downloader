// importing puppeteer & open new tab for headless browser
const puppeteer = require('puppeteer');

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

  //here we change user agent to not detect as bot with waf
  await page.setUserAgent("Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/44.0.2403.156 Safari/537.36");
  await page.goto('https://www.tiktok.com/');
  await page.waitForSelector('input[name="q"]');
  await page.type('input[name="q"]' , 'love' , { delay: 100 }); // change love for keyword of content
  await page.keyboard.press('Enter'); //press enter
  await page.waitForNavigation();//wait page load
  await page.waitForSelector('div.tiktok-bbkab3-DivContainer > div > div > a')//select 12 links & 12 video description
  const urls = await page.evaluate(() => 
    Array.from(document.querySelectorAll('div.tiktok-bbkab3-DivContainer > div > div > a '), element => element.href));
    
  var videoDes = await page.evaluate(() =>Array.from(document.querySelectorAll('div > div.tiktok-f22ew5-DivMetaCaptionLine.e1lwj0oe1')).map((items) => items.innerText))
    
    for (var i=videoDes.length; i--;) {
      videoDes[i] = videoDes[i] + ' #shorts' + "\r\n" ; //append #shorts for each video title
  }
//save videos names to files
  const fs = require('fs');

  fs.appendFile('newapp.txt', videoDes + "\r\n" , function (err) {
  if (err) throw err;
  console.log('Saved Videos names');
  });
//loop on snaptik for no watermark tiktok videos
  
for (var i=0;i<12;i++) //Loop 10 times
{

await page.waitForTimeout(1210);
await page.goto('https://snaptik.app/');
await page.waitForTimeout(300);
await page.waitForSelector('input[name="url"]');
await page.type('input[name="url"]' , (urls[i])); //type result of links
await page.waitForTimeout(300);
await page.keyboard.press('Enter');
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
            console.log('Saved!');
        }
        request.setTimeout(60000, function() { // if after 60s file not downlaoded, we abort a request 
            request.destroy();
    });
    });
    ;};


  await browser.close();
  
  
})();
