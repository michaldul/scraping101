const puppeteer = require("puppeteer");

// (async () => {
//     const browser = await puppeteer.launch({ headless: false, slowMo: 250 });
//     const url = 'https://kubotastore.pl/p/KK1806/klapki-kubota-premium-tricolor/KK1806-45';
//     const product = await scrapeProduct(browser, url);
//     console.log(product);
//     await browser.close();
// })();

async function scrapeProduct(browser, url) {
    var product = {url: url}
    const page = await browser.newPage();
    await page.setViewport({width: 1200, height: 800});
    await page.goto(url);
    // get title
    const element = await page.$('.product__details__title')
    product.title = (await page.evaluate(el => el.textContent, element)).trim();

    // get price
    product.price = await page.$eval('.product__details__price', el => el.textContent)
    
    // get sizes
    product.sizes = await page.$$eval('.size-select__other-sizes--size-option', elements => elements.map(el => el.textContent));
    
    // close page
    await page.close();

    return product;
}

module.exports.scrapeProduct = scrapeProduct;