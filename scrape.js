const puppeteer = require("puppeteer")
const sleep = require("util").promisify(setTimeout);

(async () => {
    const browser = await puppeteer.launch({ headless: false, slowMo: 250 });
    const url = 'https://kubotastore.pl/p/KK1806/klapki-kubota-premium-tricolor/KK1806-45';
    
    const product = await scrapeProduct(browser, url);

    console.log(product)
    await sleep(500);
    await browser.close();
})();

async function scrapeProduct(browser, url) {
    const page = await browser.newPage();
    await page.setViewport({ width: 1200, height: 800 })
    await page.goto(url);
    var product = {url: url}
    
    const titleElement = await page.$(".product__details__title");
    product.title = (await page.evaluate(element => element.textContent, titleElement)).trim();
    product.price = await page.$eval(".product__details__price", 
        element => element.textContent);
    product.sizes = await page.$$eval(".size-select__other-sizes--size-option",
        elements => elements.map(element => element.textContent));
    
    page.close()
    return product;
}

module.exports.scrapeProduct = scrapeProduct;