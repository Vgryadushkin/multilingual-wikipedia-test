const { test, expect} = require('@playwright/test');
const { DesktopPage } = require('../pageObjects/DesktopPage');

test('languageChange', async ({ page }) => {
    const desktopPage = new DesktopPage(page);
    //Pre-conditions
    await page.goto('https://uk.wikipedia.org/wiki/');
    await desktopPage.authorization('Увійти','Вхід');
    //Steps
    await desktopPage.preferences();
    await desktopPage.languageChange('uk - українська','Save');
    await desktopPage.waitForElementByText('Інтернаціоналізація');
    expect('Ваші налаштування збережено.').toBeDefined();
    //Post-conditions
    await desktopPage.languageChange('en - English','Зберегти');
    await desktopPage.waitForElementByText('Internationalisation');
    expect('Your preferences have been saved.').toBeDefined();
});


