const  cheerio = require('cheerio'), puppeteer = require('puppeteer');

async function getPic() {
    const browser = await puppeteer.launch({headless: false});  
    const page = await browser.newPage();

    await page.goto('https://www.shazam.com/ru/charts/top-200/ukraine');
    await page.waitFor(1000);

    const content = await page.content();
    const $ = cheerio.load(content);
    const counts = [], urls = [],  elements = [];


    $('.shz-partial-track.audio-play-indicator.audio-play').slice(0, 200).each((idx, elem) => {

        $('div.count.flex-reset span').each((idx, elem) =>{
            let count = $(elem).text();
            counts.push(count);
        });

        $('.shz-partial-track.audio-play-indicator.audio-play').each((idx, elem) => {
            let url = $(elem).attr('data-shz-audio-url');
            urls.push(url);
        });

        let title = $('div.title').text().split('    ');
        let artist = $('div.artist').text().split('    ');

        let Id = counts[idx], Title = title[idx], Artist = artist[idx],  Url = urls[idx];

        elements.push({Id, Title, Artist, Url});
    });

    browser.close();
    console.log(elements);


}
getPic();
