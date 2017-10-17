/**
 * 
 * 1. 登录窗口是否可以正常打开？
 * 2. 登录窗口UI显示正常
 * 3. 用户名及密码为空
 * 4. 用户名为空
 * 5. 密码为空
 * 6. 密码错误
 * 7. 用户名错误
 * 8. 用户名及密码均错误
 * 9. 密码正确，登陆成功
 */

let uiAction = require('../../common/ui/uiaction')
let loginPage = require('../../config/uiconfig/loginPage')
let app = require('../../config/app.confifg')
let indexpage = require('../../config/uiconfig/indexpage')
require ("chromedriver")
var assert = require('assert');
var webdriver = require('selenium-webdriver');
var driver = new webdriver.Builder().forBrowser('chrome').build();
let data = require("../../testdata/login.json")

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
    it('登录窗口UI显示正常？', async function () {
        await driver.get(app.baseUrl);
        await driver.findElement(indexpage.loginhref).click();
        // 验证页面中的元素是否存在
        return assert.ok(driver.findElement({ css: "body > div.navbar > div > div > ul > li:nth-child(6) > a" }));
    })
    describe('登陆信息验证',function(){
        it('用户名及密码为空',async function(){
            await driver.get(app.baseUrl); 
            await uiAction.userLogin(driver,data.emptyerr.username,data.emptyerr.password)
            let errortip = await driver.findElement(loginPage.errortip).getText();
            return assert.ok(errortip.indexOf("信息不完整。"));      
        })
        it('用户名为空',async function(){
            await driver.get(app.baseUrl); 
            await uiAction.userLogin(driver,data.emptyerr.username,data.user.password)
            let errortip = await driver.findElement(loginPage.errortip).getText();
            return assert.ok(errortip.indexOf("信息不完整。"));      
        })
        it('密码为空',async function(){
            await driver.get(app.baseUrl); 
            await uiAction.userLogin(driver,data.user.username,data.emptyerr.password)
            let errortip = await driver.findElement(loginPage.errortip).getText();
            return assert.ok(errortip.indexOf("信息不完整。"));      
        })
        it('密码错误',async function(){
            await driver.get(app.baseUrl); 
            await uiAction.userLogin(driver,data.user.username,data.err.password)
            let errortip = await driver.findElement(loginPage.errortip).getText();
            return assert.deepEqual('×\n用户名或密码错误',errortip);      
        })
        it('用户名错误',async function(){
            await driver.get(app.baseUrl); 
            await uiAction.userLogin(driver,data.err.username,data.user.password)
            let errortip = await driver.findElement(loginPage.errortip).getText();
            return assert.deepEqual('×\n用户名或密码错误',errortip);      
        })
        it('用户名及密码均错误',async function(){
            await driver.get(app.baseUrl); 
            await uiAction.userLogin(driver,data.err1.username,data.err1.password)
            let errortip = await driver.findElement(loginPage.errortip).getText();
            return assert.deepEqual('×\n用户名或密码错误',errortip);      
        })
        it('密码正确，登陆成功',async function(){
            await driver.get(app.baseUrl);
            await uiAction.userLogin(driver,data.user.username,data.user.password)
            return assert.ok(driver.findElement({css:'body > div.navbar > div > div > ul > li:nth-child(7) > a'}))

        })
    })
})