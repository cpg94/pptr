const express = require('express');
const app = express();
const path = require('path');
const puppeteer = require('puppeteer');

app.get('/bsd', async (_, res) => {
    res.sendFile(path.join(__dirname + '/index.html'));
})

app.get('/measure', async () => {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.setViewport({
        width: 3840,
        height: 2160
    });
    const local_url = 'http://localhost:2020/bsd'
    await page.goto(local_url, {
        waitUntil: "networkidle0",
    });

    const screens = await page.evaluate(() => {
        return document.bsdHeight
    });

    console.log({ screens })
});

app.listen(2020, () => console.log(`Server is up`))