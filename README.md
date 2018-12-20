# Facebook auto-comment Script
A Facebook commenter which comments into group posts **without using API.**

Prerequisites
> Latest Node version. (if you dont have, then download from [Nodejs.org](https://nodejs.org/))
>
> A terminal (MINGW/Git on windows,cmd will work too OR Linux(not tested on linux yet))


### How to install

```sh
$ git clone https://github.com/SwapnilSoni1999/fb_auto-commentor -b 1.1-js auto-commenter
$ cd auto-commenter
```

### Required Packages

Before you run script you need following packages to be installed:

| Modules | 
| ------ | 
| selenium-webdriver |
| chromedriver |
| object-length |
| system-sleep |
| fs |
| readline-sync |
| cryptr |

Install them using following command: 
```sh
$ npm install --save selenium-webdriver@3.6.0 chromedriver object-length system-sleep fs readline-sync cryptr
```
After that just run `node auto-comment.js` in terminal and follow the instructions.
```sh
$ node auto-comment.js
```

### Note
- If you want to reset credentials then just delete `creds.json`
- Always enter the group URL which you want to spam :relieved:
  (eg. `https://facebook.com/groups/GROUP_ID`)

License
----

MIT
