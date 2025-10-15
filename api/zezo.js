// zezo.js (Vercel serverless function)
const fetch = require("node-fetch");

module.exports = async function handler(req, res) {
    if (req.method === "OPTIONS") {
        // gérer préflight CORS
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS");
        res.setHeader("Access-Control-Allow-Headers", "*");
        return res.status(200).end();
    }

    const targetUrl = req.query.url;
    if (!targetUrl) return res.status(400).send("Missing URL");

    try {
        const response = await fetch(targetUrl, {
            headers: {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
                "Accept": "text/html",
            }
        });

        const html = await response.text();

        // Autoriser CORS pour le navigateur
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS");
        res.setHeader("Access-Control-Allow-Headers", "*");

        res.status(200).send(html);
    } catch (err) {
        res.status(500).send("Error fetching Zezo route: " + err.message);
    }
};
