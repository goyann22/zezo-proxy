// api/zezo.js
import puppeteer from "puppeteer";

export default async function handler(req, res) {
    const targetUrl = req.query.url;
    if (!targetUrl) {
        return res.status(400).send("Missing URL");
    }

    let browser;
    try {
        // Lancer Chromium headless
        browser = await puppeteer.launch({
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        });
        const page = await browser.newPage();

        // Mettre un User-Agent “browser-like”
        await page.setUserAgent(
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) " +
            "AppleWebKit/537.36 (KHTML, like Gecko) " +
            "Chrome/117.0.0.0 Safari/537.36"
        );

        // Charger la page Zezo et attendre que tout soit rendu
        await page.goto(targetUrl, { waitUntil: 'networkidle2' });

        // Récupérer le HTML final
        const html = await page.content();

        // Autoriser CORS pour ton front local ou file://
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader("Content-Type", "text/html; charset=UTF-8");

        await browser.close();

        res.status(200).send(html);

    } catch (err) {
        if (browser) await browser.close();
        res.status(500).send("Error fetching Zezo route: " + err.message);
    }
}
