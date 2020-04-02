const puppeteer = require('puppeteer');

let scrape = async () => {
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();
    await page.setViewport({width: 1000, height: 700});


    await page.goto('https://www.shazam.com/ru/charts/top-200/ukraine');
    // await page.click('div.title a');
    await page.waitFor(1000);

    const result = await page.evaluate(() => {

        let data = []; 

        let numbers = document.querySelectorAll('shz-partial-track.audio-play-indicator.audio-play');
         let number = document.querySelector('div.count.flex-reset span').innerText;

        for (var number of numbers) {

            data.push({ number});
        };

        // let title = document.querySelector('div.title  a').innerText;
        // let artlist = document.querySelector('div.artist  a').innerText;

 

        // // Создаём пустой массив для хранения данных
        // let elements = document.querySelectorAll('.shz-partial-track.audio-play-indicator.audio-play'); // Выбираем все товары

        // for (var i of elements){ 
        //     // let number = document.querySelector('div.count.flex-reset span').innerText;
        //     let title = document.querySelector('div.details.details.grid.grid-vertical.grid-space-between div.title a').innerText;
        //     let artlist = document.querySelector('div.artist').innerText;


        //     data.push({title, artlist}); 
        // }

        return data; 
    });

    browser.close();
    return result;
};

scrape().then((value) => {
    console.log(value); // Получилось!
});