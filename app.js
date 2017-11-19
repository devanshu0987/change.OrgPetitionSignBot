const puppeteer = require('puppeteer');
const emailurl = 'https://app.getnada.com/inbox/';
const url = 'http://chn.ge/2AcQ40D';
const NUM = 5;
async function dos(){
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
    const first_name = 'test';
    const last_name = 'test';
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
function test(i){
    console.log(i);
    return new Promise(resolve => {
        dos().then( () => {
            
            resolve();
        });
    })
}
async function loop(){
    for(let i=0;i<NUM;i++)
        await test(i);
};
loop().then( () => {});
