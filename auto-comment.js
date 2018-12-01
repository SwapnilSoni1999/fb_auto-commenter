const webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    Keys = webdriver.Key;
    until = webdriver.until;
const chrome = require('selenium-webdriver/chrome');
const path = require('chromedriver').path;
const objlen = require('object-length');
const sleep = require('system-sleep');
const fs = require('fs');
const readLine = require('readline-sync');
const Cryptr = require('cryptr');

const cryptr = new Cryptr('swapnil@xdaot');

//env
var currentpath = process.cwd();
process.env.PATH += currentpath+"\\chromedriver\\chromedriver.exe;";

//configs
const postBox = "_4-u2 mbm _4mrt _5jmm _5pat _5v3q _4-u8";
let EMAIL = "",
    PASSWD = "",
    GROUP_URL = "";

let options = new chrome.Options(),
    optionCap = options.addArguments(["--disable-notifications"]);
let driver = new webdriver.Builder().forBrowser('chrome').withCapabilities(optionCap.toCapabilities()).build();

var commentBox,counter=0; 

function startBrowser(){
    driver.get("https://facebook.com");
    driver.findElement(By.id('email')).sendKeys(EMAIL);
    driver.sleep(2000);
    driver.findElement(By.id('pass')).sendKeys(PASSWD);
    driver.sleep(2000);
    driver.findElement(By.id('loginbutton')).click();

    driver.sleep(6000); //6second
    if(GROUP_URL != "") {
        driver.get(GROUP_URL);
    }

    driver.sleep(8000); //8second
    driver.executeScript(`
        var current = document.getElementsByClassName("`+ postBox + `")[`+counter+`];
        var next = current.id;   
        return next;
    `).then(function (current) {
            console.log(current);
            console.log("Mil gaya bsdx");
            console.log("Scrolling to", current);
            counter++;
            console.log("Counter = ",counter);
            spamComment(current);
        });
}
function spamComment(currentPost) {
    let accion = new webdriver.ActionSequence(driver);
    driver.sleep(5000); //5second
    driver.executeScript(`
        document.getElementById('`+ currentPost + `').scrollIntoView();
    `);
    console.log("Bhai thai gyu scroll");
    this.postId = currentPost;
    console.log(this.postId);

    driver.sleep(1000); //1second
    sleep(1000); //1second script sleep
    this.postIdSlice = this.postId.slice(10, checkCol(this.postId));
    console.log(this.postIdSlice);
    driver.sleep(3000); //3second
    
    driver.executeScript(`
        var sed = document.getElementsByClassName("UFIList")[`+ counter +`].children[2].id;
        return sed;
    `).then(function(commentString){
        commentBox = driver.findElement(By.id(commentString));

        commentBox.click();
        console.log("Clicked on commentbox");
        driver.sleep(2000);

        accion.sendKeys(getRandomComment());
        driver.sleep(1000); //1second
        accion.sendKeys(Keys.ENTER).perform();
        driver.sleep(5000); //5second

        
        delete accion;
        getNextPost();
    });
}

function asnGlobCreds(user, pswd) {
    EMAIL = user;
    PASSWD = cryptr.decrypt(pswd);
}

function getNextPost() {
    console.log("getNextPost called...");
    
    driver.sleep(2000); //2second
    sleep(1000); //1second script sleep
    driver.executeScript(`
        var current = document.getElementsByClassName("`+ postBox + `")[`+counter+`];
        var next = current.id;   
        return next;
    `).then(function(nex){
        console.log("counter = ",counter);
        counter++;
        console.log("Counter=",counter);
        console.log("RETURNED :", nex);
        driver.sleep(4000);
        sleep(2000); //2econd systemsleep
        console.log("ReCalling spamComment...");
        spamComment(nex);
    });
    
}

function checkCol(str) {
    var col = 0;
    console.log("Ye mila : ", str);
    console.log("lenthhhh -", objlen(str));
    for (var i = 0; i <= objlen(str); i++) {
        if (str[i] == ':') {
            col = i;
            break;
        }
    }
    console.log("Sliced : found at", col);
    return col;
}

function getRandomComment() {
    var msgArr = [
        "sed -auto",
        "Mic testing 1..2.3.. -auto",
        "kek -auto",
        "chal bro -auto",
        "noU pro -auto",
        "lmao -auto",
        ":) :) :) -auto",
        ":| -auto",
        " No logic lel -auto",
        "swepn!l pari -auto"
    ];
    var rnd = Math.floor(Math.random() * 9);
    var messeg = msgArr[rnd];
    
    return messeg;  
}

// before starting browser we have to check if credentials are provided or not
function main() {

    var creds = {
        USERMAIL: "",
        USERPASS: ""
    }
    var group_url;

    if(fs.existsSync("./creds.json")) {
        var group_url = readLine.question("Enter Group URL which you want to spam(optional) :");
        GROUP_URL = group_url.toString();
        console.log("Credentials found! Starting script...");
        let rawdata = fs.readFileSync('creds.json');
        let credObj = JSON.parse(rawdata);
        creds.USERMAIL = credObj.USERMAIL;
        creds.USERPASS = credObj.USERPASS;
    } 
    else {
        console.log("Credentials not found! Please enter...\n");
        var user_mail = readLine.question("Enter your facebook email :");
        var user_pass = readLine.question("Enter your facebook password :", {
            hideEchoBack: true
        });
        var hashed_passwd = cryptr.encrypt(user_pass);
        group_url = readLine.question("Enter Group URL which you want to spam(optional) :");
        GROUP_URL = group_url.toString();
        //set to json
        
        creds.USERMAIL = user_mail.toString();
        creds.USERPASS = hashed_passwd.toString();

        let configFile = JSON.stringify(creds);
        fs.writeFileSync('creds.json', configFile);
        console.log("Config file created Scuccessfully!");
        console.log("Credentials assigned! Starting Script...\n");
    }

    asnGlobCreds(creds.USERMAIL, creds.USERPASS);
    startBrowser();
}
main();
