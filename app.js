const puppeteer = require('puppeteer');
const emailurl = 'https://app.getnada.com/inbox/';
const url = process.argv[2];// YOUR PETITION SHARE URL
const NUM = process.argv[3];// NUMBER OF SIGNINGS YOU WANT
const first_name = 'test';
const last_name = 'test';
async function signPetitionOneTime(){
    const browser = await puppeteer.launch({headless: true});
    //GET A TEMP EMAIL
    const emailpage = await browser.newPage();
    await emailpage.goto(emailurl);
    const element = await emailpage.$eval('.fg-black50',function(ele){
        return ele.innerText;
    });
    const email = ((element.split('copy'))[0]).trim();
    console.log(email);
    await emailpage.close();
    //SIGN THE PETITION
    const page = await browser.newPage();
    await page.goto(url);
    await page.focus('#first_name');
    await page.keyboard.type(first_name, {delay: 100});
    page.keyboard.press('Tab');
    await page.keyboard.type(last_name, {delay: 100});
    page.keyboard.press('Tab');
    await page.keyboard.type(email, {delay: 100});
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Space');
    await browser.close();
}
// the following code has been written to specifically run each signing in sequence
// rather than in pararell
function test(index){
    console.log(index);
    return new Promise(resolve => {
        signPetitionOneTime().then( () => {      
            resolve();
        });
    })
}
async function loop(){
    for(let index = 0;index < NUM;index++)
        await test(index);
};
loop().then( () => {});
