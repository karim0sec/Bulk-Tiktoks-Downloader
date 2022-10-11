# BulkToks
Simple script to bulk download tiktok clips without watermark, used node js+ puppeteer

- allvideosuser script bulk downloads all tiktok videos of a single user and the descriptions.
- nvideosuser script bulk downloads n number of tiktok videos of a single user and the descriptions.

Note: Videos are stored in @username folder whereas the description is stored in names.txt
Warning: Since the script bulk downloads, it can be alot of data depending on the number you enter or the number of videos a user has. 

# requirements:
+ Node Js
+ puppeteer 
+ puppeteer-extra-plugin-stealth
+ puppeteer-extra-plugin-adblocker
+ puppeteer-extra

# Installtion:
After installing Node Js, navigate to the project directory and use this command:

+ npm i puppeteer

+ npm install puppeteer puppeteer-extra

+ npm install puppeteer-extra-plugin-stealth puppeteer-extra-plugin-adblocker

# How to use:

Manual Way:
For AllVideos, edit the user profile url in allvideosuser script.
For nVideos, edit the user profile url & the nVideos parameter in nvideosuser script.

Terminal Way:
In the terminal or command prompt use:

+ node allvideosuser https://www.tiktok.com/@davidbeckham
+ node nvideosuser https://www.tiktok.com/@davidbeckham n

Note: Replace n with your desired number in the second command. e.g; 2


Of course you can change the username davidbeckham to whatever user you want 
to download all videos of single user.

Results will be saved in names.txt and videos in username folder location.

All videos will be saved without watermark unless the user reuploaded his clips with logo.

Cheers