const puppeteer = require("puppeteer-extra");
const stealthPlugin = require("puppeteer-extra-plugin-stealth")();
const AdblockerPlugin = require('puppeteer-extra-plugin-adblocker');
const fetch = require("node-fetch");
const fs = require('fs');
const https = require('https');
const {Headers} = require('node-fetch');

//set a user-agent for fetch
const headers = new Headers();
headers.append('User-Agent', 'TikTok 26.2.0 rv:262018 (iPhone; iOS 14.4.2; en_US) Cronet');



["chrome.runtime", "navigator.languages"].forEach(a =>
  stealthPlugin.enabledEvasions.delete(a)
);

puppeteer.use(stealthPlugin);
puppeteer.use(AdblockerPlugin({ blockTrackers: true }))

main();
async function main() {
  const browser = await puppeteer.launch( { headless: true } );
  const page = await browser.newPage();
    page.setUserAgent("Mozilla/5.0 (Macintosh; Intel Mac OS X 12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/106.0.0.0 Safari/537.36");
  //delete browser profile after finish
  let chromeTmpDataDir = null;
  let chromeSpawnArgs = browser.process().spawnargs;
  for (let i = 0; i < chromeSpawnArgs.length; i++) {
      if (chromeSpawnArgs[i].indexOf("--user-data-dir=") === 0) {
          chromeTmpDataDir = chromeSpawnArgs[i].replace("--user-data-dir=", "");
      }
  }


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
const args = process.argv.slice(2)
const userLink = args[0]


  await page.goto(userLink); //change this to user url page
  let username = page.url().slice(23,).replace(/[-:.\/*<>|?]/g,"");

  //scroll down until no more videos
  await autoScroll(page);

  const urls = await page.evaluate(() => 
    Array.from(document.querySelectorAll('div.tiktok-1qb12g8-DivThreeColumnContainer > div > div > div > div > div > a'), element => element.href));

  var videoDes = await page.evaluate(() =>Array.from(document.querySelectorAll('div.tiktok-1qb12g8-DivThreeColumnContainer.eegew6e2 > div > div > div > a')).map((items) => items.innerText))
    
    for (var i=videoDes.length; i--;) {
      videoDes[i] = videoDes[i] + ' #shorts' + "\r\n" ;}; //append #shorts for each video title
      fs.appendFile('names.txt', videoDes + '', function (err) {
        if (err) throw err;
        console.log('Descriptions Saved!');
      });
        console.log('now it downloading ' +urls.length+ ' video' ) 

      //becareful that can be alot of gigas if profile has a lot of videos
    for (var i=0;i<urls.length;i++) //you can limit number of videos by replace url.length by number
    {
      function getRandomNumber() {
        var random = Math.floor(Math.random() * (500 - 300 + 1)) + 300;
         return random;
       };
    await page.waitForTimeout(getRandomNumber());
    let link = (urls[i]).slice(-19);
    const content = await getvideourl()
    async function getvideourl(){
      const API_URL = `https://api2.musical.ly/aweme/v1/feed/?aweme_id=${link}&version_code=262&app_name=musical_ly&channel=App&device_id=null&os_version=14.4.2&device_platform=iphone&device_type=iPhone9`;
      const request = await fetch(API_URL, {
          method: "GET",
          headers:headers
      });
      const res = await request.json()
      const getvideourl =  res.aweme_list[0].video.play_addr.url_list[0].split("?")[0]
      return getvideourl
  }

     // link to file you want to download
     const path = './'+username+'/'; // location to save videos
     try {
       if (!fs.existsSync(path)) {
         fs.mkdirSync(path)
       }
     } catch (err) {
       console.error(err)
     }
    const request = https.get(content, function(response) {
        if (response.statusCode === 200) {
            var file = fs.createWriteStream(path+link+'.mp4');
            response.pipe(file);
            console.log(file.path + ' Saved!')

            fs.appendFile('names.txt',file.path +  "\r\n" , function (err) {
            if (err) throw err;
            console.log('Done');
            });
        }

        request.setTimeout(90000, function() { // if after 60s file not downlaoded, we abort a request 
            request.destroy();
            console.log('Cant download at video'+urls[i]);
    });
    });
    ;};

  
    browser.close();
    if (chromeTmpDataDir !== null) {
      fs.rm(chromeTmpDataDir, { recursive: true }, () => console.log('Deleted tmp profile'));
    }

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