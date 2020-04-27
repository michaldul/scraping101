const puppeteer = require("puppeteer");
const { from } = require('rxjs');
const { mergeMap } = require('rxjs/operators');
const { urls } = require("./urls");
const { scrapeProduct } = require("./scrape");

(async () => {
    const browser = await puppeteer.launch({headless: false});
    from(urls).pipe(mergeMap(url => scrapeProduct(browser, url), undefined, 1)).subscribe(
        product => console.log(product), err => console.err(err), () => browser.close()
    )
})();
