const  cheerio = require('cheerio'), puppeteer = require('puppeteer');

async function getPic() {
    const browser = await puppeteer.launch({headless: false});  
    const page = await browser.newPage();

    await page.goto('https://www.shazam.com/ru/charts/top-200/ukraine');
    await page.waitFor(1000);
    await page.setViewport({width: 1200, height: 1000});

    const content = await page.content();
    const $ = cheerio.load(content);
    const counts = [], titles = [], artists = [], urls = [],  elements = [];

        $('div.count.flex-reset span').slice(0, 50).each((idx, elem) => {
            const count = $(elem).text();
            counts.push({count});
        });
        $('div.title').slice(0, 50).each((idx, elem) => {
            const title = $(elem).text();
            titles.push({title});
        });
        $('div.artist').slice(0, 50).each((idx, elem) => {
            const artist = $(elem).text();
            artists.push({artist});
        });
        $('.shz-partial-track.audio-play-indicator.audio-play').slice(0, 50).each((idx, elem) => {
            const url = $(elem).attr('data-shz-audio-url');
            urls.push({url});
        });

 
    elements.push(counts, titles, artists, urls);
    browser.close();
    console.log(elements);
  

};

getPic();
