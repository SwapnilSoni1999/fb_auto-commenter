const webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    Keys = webdriver.Key;
    until = webdriver.until;
const chrome = require('selenium-webdriver/chrome');
const path = require('chromedriver').path;
const objlen = require('object-length');
const sleep = require('system-sleep');

//env
var currentpath = process.cwd();
process.env.PATH += currentpath+"\\chromedriver\\chromedriver.exe;";

//configs
let postBox = "_4-u2 mbm _4mrt _5jmm _5pat _5v3q _4-u8",
    EMAIL = "",
    PASSWD = "",
    GROUP_URL = "";

let options = new chrome.Options(),
    optionCap = options.addArguments(["--disable-notifications"]);
let driver = new webdriver.Builder().forBrowser('chrome').withCapabilities(optionCap.toCapabilities()).build();
let actions = driver.actions({ async: true, bridge: true });


var postId, postIdSlice,commentBox,next_post,counter=0; 

function startBrowser(){
    driver.get("https://facebook.com");
    driver.findElement(By.id('email')).sendKeys(EMAIL);
    driver.sleep(2000);
    driver.findElement(By.id('pass')).sendKeys(PASSWD);
    driver.sleep(2000);
    driver.findElement(By.id('loginbutton')).click();

    driver.sleep(6000); //6second

    driver.get(GROUP_URL); //to Machhi Bazar

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
    //click on comment box
    //commentBox = null;
    
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
    //commentString = "addComment_"+this.postIdSlice;
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
        // driver.executeScript(`
        //     document.activeElement.blur();
        // `);
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
        " ",
        ":) :) :) -auto",
        ":| -auto",
        " No logic lel -auto",
        "swepn!l pari -auto"
    ];
    var rnd = Math.floor(Math.random() * 3);
    var messeg = msgArr[rnd];
    
    return messeg;  
}

startBrowser();
