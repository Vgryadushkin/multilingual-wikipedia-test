const { Main } = require('./Main');
require('dotenv').config();

const username = process.env.WIKIUSERNAME;
const password = process.env.WIKIPASSWORD;

class DesktopPage extends Main {

    async authorization(linkName, buttonName){
        await this.page.getByRole('link', { name: linkName }).click();
        await this.page.locator('[name="wpName"]').fill(`${username}`);
        await this.page.locator('[type="password"]').fill(`${password}`);
        await this.page.getByRole('button', { name: buttonName }).click();
    }
    async preferences(){
        await this.page.locator('.vector-menu-content-list #pt-preferences').click();
    }

    async languageChange(language, buttonName){
        await this.page.locator('#mw-input-wplanguage .oo-ui-dropdownWidget-handle').click();
        await this.page.getByRole('option',{name: language}).click();
        await this.page.getByRole('button',{name:buttonName}).click();
    }

    // waiter for specific element
    async waitForElementByText(text, counter = 30) {
        let i = 0;
        let isPresented = await this.page.getByText(text).isVisible();
        // console.log('isPresented outside loop', isPresented)
        while(!isPresented && i < counter) {
            await this.page.waitForTimeout(500);
            isPresented = await this.page.getByText(text).isVisible();
            i +=1;
            // console.log('isPresented in loop', isPresented);
        }
        return isPresented
    }

    // wait for specific element in frame
    async waitForElementByTextInFrame(frameSelector, text, counter = 30) {
        let i = 0;
        const frame = await this.page.frameLocator(frameSelector);
        let isPresented = await frame.getByText(text).isVisible();
        // console.log('isNotPresented outside loop', isPresented)
        while(!isPresented && i < counter) {
            await this.page.waitForTimeout(500);
            isPresented = await frame.getByText(text).isVisible();
            i +=1;
            // console.log('isNotPresented in loop', isPresented);
        }
        return isPresented
    }

    // waiter until no element is presented
    async waitNoElementByText(text, counter = 30) {
        let i = 0;
        let isNotPresented = await this.page.getByText(text).isVisible();
        // console.log('isNotPresented outside loop', isNotPresented)
        while(isNotPresented && i < counter) {
            await this.page.waitForTimeout(500);
            isNotPresented = await this.page.getByText(text).isVisible();
            i +=1;
            // console.log('isNotPresented in loop', isNotPresented);
        }
        return isNotPresented
    }

    // waiter until no element is presented in frame
    async waitNoElementByTextInFrame(frameSelector, text, counter = 30) {
        let i = 0;
        const frame = await this.page.frameLocator(frameSelector);
        let isNotPresented = await frame.getByText(text).isVisible();
        while(isNotPresented && i < counter) {
            await this.page.waitForTimeout(500);
            isNotPresented = await frame.getByText(text).isVisible();
            i +=1;
            // console.log('isNotPresented in loop', isNotPresented);
        }
        return isNotPresented
    }

    async waitForURLChange(url, counter = 30) {
        let i = 0;
        let actualUrl = await this.page.url();
        while(actualUrl === url && i < counter) {
            await this.page.waitForTimeout(500);
            actualUrl = await this.page.url();
            i +=1;
        }
    }

    async loadingPage(){
        for (let i = 1; i > 0; i -= 0.02) {
            await this.page.evaluate((i) => {
                const html = document.querySelector('html');
                html.style.height = 'auto';
                html.style.overflow = 'auto';
                const content = document.querySelector('#app');
                const height = content.scrollHeight;
                window.scrollTo(0, Math.round(height * i));
            }, i);
            await this.page.waitForTimeout(50);
        }
    }

}

module.exports = { DesktopPage };
