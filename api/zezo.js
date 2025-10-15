// api/zezo.js
import https from "https";
import http from "http";
import urlModule from "url";

export default async function handler(req, res) {
  const targetUrl = req.query.url;
  if (!targetUrl) {
    return res.status(400).send("Missing URL");
  }

  try {
    // Parser l'URL pour choisir http/https
    const parsedUrl = urlModule.parse(targetUrl);
    const lib = parsedUrl.protocol === "https:" ? https : http;

    const options = {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) " +
                      "AppleWebKit/537.36 (KHTML, like Gecko) " +
                      "Chrome/117.0.0.0 Safari/537.36",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "Referer": "https://zezo.org/",
      }
    };

    lib.get(targetUrl, options, (resp) => {
      let data = "";
      resp.on("data", chunk => data += chunk);
      resp.on("end", () => {
        // Autoriser CORS pour front local ou file://
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader("Content-Type", "text/html; charset=UTF-8");
        res.status(200).send(data);
      });
    }).on("error", (err) => {
      res.status(500).send("Error fetching Zezo route: " + err.message);
    });

  } catch (err) {
    res.status(500).send("Unexpected error: " + err.message);
  }
}
