const puppeteer = require("puppeteer-extra");
const stealthPlugin = require("puppeteer-extra-plugin-stealth")();

["chrome.runtime", "navigator.languages"].forEach(a =>
  stealthPlugin.enabledEvasions.delete(a)
);

puppeteer.use(stealthPlugin);

main();
async function main() {
  const browser = await puppeteer.launch( { headless: true } );
  const page = await browser.newPage();

  await page.evaluateOnNewDocument(() => {
    delete navigator.__proto__.webdriver;
  });
  //We stop images and stylesheet to save data
  await page.setRequestInterception(true);

  page.on('request', (request) => {
    if(['image', 'stylesheet', 'font'].includes(request.resourceType())) {
      request.abort();
    } else {
      request.continue();
    }
  })

  await page.goto(`https://tiktok.com/@karim90101`); //change this to user url page

  //scroll down until no more videos
  await autoScroll(page);

  const urls = await page.evaluate(() => 
    Array.from(document.querySelectorAll('div.jsx-1906445185.video-feed.compact > div > div > div > div > a'), element => element.href));

  
//loop on snaptik for no watermark tiktok videos
      //becareful that can be alot of gigas if profile has a lot of videos
    for (var i=0;i<urls.length;i++) //you can limit number of videos by replace url.length by number
    {
      function getRandomNumber() {
        var random = Math.floor(Math.random() * (500 - 300 + 1)) + 300;
         return random;
       };
       function getHighNumber() {
        var random = Math.floor(Math.random() * (500 - 300 + 1)) + 1150;
         return random;
       };
    await page.waitForTimeout(getHighNumber());
    await page.goto('https://snaptik.app/');
    await page.waitForTimeout(getRandomNumber());
    await page.waitForSelector('input[name="url"]');
    await page.type('input[name="url"]' , (urls[i]) , {delay: 100}); //type result of links
    let link = (urls[i]).slice(-19)
    await page.waitForTimeout(getRandomNumber());
    // await page.keyboard.press('Enter');
    await page.click('#submiturl')
    await page.waitForTimeout(getHighNumber());
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

    const request = https.get(content, function(response) {
        if (response.statusCode === 200) {
            var file = ds.createWriteStream(path+link+'.mp4');
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

  
  browser.close();
}

async function autoScroll(page){
  await page.evaluate(async () => {
      await new Promise((resolve, reject) => {
          var totalHeight = 0;
          var distance = 100;
          var timer = setInterval(() => {
              var scrollHeight = document.body.scrollHeight;
              window.scrollBy(0, distance);
              totalHeight += distance;

              if(totalHeight >= scrollHeight){
                  clearInterval(timer);
                  resolve();
              }
          }, 100);
      });
  });
}
