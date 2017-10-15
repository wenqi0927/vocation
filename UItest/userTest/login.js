let uiAction = require('../../common/ui/uiaction')
let loginPage = require('../../config/uiconfig/loginPage')
let app = require('../../config/app.confifg')
let indexpage = require('../../config/uiconfig/indexpage')
require ("chromedriver")
var assert = require('assert');
var webdriver = require('selenium-webdriver');
var driver = new webdriver.Builder().forBrowser('chrome').build();

describe('用户登录',function(){

    this.timeout(600000)
   
    afterEach('tackscreenshot', async function () {
        
        await uiAction.saveScreenShots(driver);
        await driver.manage().deleteAllCookies();
    })
    after(' close browser', async function () {
        
        return await driver.quit();
    })
    it('登陆窗口是否可以正常打开？', async function () {
        await driver.get(app.baseUrl);
        await driver.findElement(indexpage.loginhref).click();
        // 验证页面中的元素是否存在
        return assert.ok(driver.findElement({ css: "body > div.navbar > div > div > ul > li:nth-child(6) > a" }));
    })
    describe('登陆信息验证',function(){
        it('用户名及密码为空',async function(){
            await driver.get(app.baseUrl); 
            await uiAction.userLogin(driver,'','')
            let errortip = await driver.findElement(loginPage.errortip).getText();
            return assert.ok(errortip.indexOf("信息不完整。"));      
        })
        it('用户名为空',async function(){
            await driver.get(app.baseUrl); 
            await uiAction.userLogin(driver,'','123456')
            let errortip = await driver.findElement(loginPage.errortip).getText();
            return assert.ok(errortip.indexOf("信息不完整。"));      
        })
        it('密码为空',async function(){
            await driver.get(app.baseUrl); 
            await uiAction.userLogin(driver,'1505399200170','')
            let errortip = await driver.findElement(loginPage.errortip).getText();
            return assert.ok(errortip.indexOf("信息不完整。"));      
        })
        it('密码错误',async function(){
            await driver.get(app.baseUrl); 
            await uiAction.userLogin(driver,'1505399200170','654321')
            let errortip = await driver.findElement(loginPage.errortip).getText();
            return assert.deepEqual('×\n用户名或密码错误',errortip);      
        })
        it('密码正确，登陆成功',async function(){
            await driver.get(app.baseUrl);
            await uiAction.userLogin(driver,'1505399200170','123456')
            return assert.ok(driver.findElement({css:'body > div.navbar > div > div > ul > li:nth-child(7) > a'}))

        })
    })
})