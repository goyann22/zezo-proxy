import puppeteer from "puppeteer";

export default async function handler(req, res) {
    const targetUrl = req.query.url;
    if (!targetUrl) return res.status(400).send("Missing URL");

    let browser;
    try {
        browser = await puppeteer.launch({
            args: ['--no-sandbox', '--disable-setuid-sandbox'],
            headless: true
        });
        const page = await browser.newPage();

        await page.setUserAgent(
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) " +
            "AppleWebKit/537.36 (KHTML, like Gecko) " +
            "Chrome/117.0.0.0 Safari/537.36"
        );

        // Timeout plus long
        await page.goto(targetUrl, { waitUntil: 'networkidle2', timeout: 60000 });

        const html = await page.content();

        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader("Content-Type", "text/html; charset=UTF-8");

        await browser.close();
        res.status(200).send(html);

    } catch (err) {
        if (browser) await browser.close();
        console.error("Puppeteer error:", err);
        res.status(500).send("Error fetching Zezo route: " + err.message);
    }
}
