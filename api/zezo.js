const express = require("express");
const fetch = require("node-fetch");

module.exports = async function handler(req, res) {
    const targetUrl = req.query.url;
    if (!targetUrl) {
        return res.status(400).send("Missing URL");
    }

    try {
        const response = await fetch(targetUrl);
        const text = await response.text();

        // Autoriser CORS
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.status(200).send(text);
    } catch (err) {
        res.status(500).send("Error fetching Zezo route: " + err.message);
    }
};
