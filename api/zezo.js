// zezo.js pour Vercel
const fetch = require("node-fetch");

module.exports = async function handler(req, res) {
    const targetUrl = req.query.url;
    if (!targetUrl) {
        return res.status(400).send("Missing URL");
    }

    try {
        // On simule un navigateur réel pour éviter le 401
        const response = await fetch(targetUrl, {
            headers: {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36",
                "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
                "Accept-Language": "en-US,en;q=0.5",
                "Connection": "keep-alive"
            }
        });

        const text = await response.text();

        // Autoriser CORS pour que ton fetch local fonctionne
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.status(200).send(text);

    } catch (err) {
        res.status(500).send("Error fetching Zezo route: " + err.message);
    }
};
