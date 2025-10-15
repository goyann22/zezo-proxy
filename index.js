import express from "express";
import fetch from "node-fetch";

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/proxy", async (req, res) => {
    const target = req.query.url;
    if (!target) return res.status(400).send("Missing url parameter");

    try {
        const response = await fetch(target);
        const data = await response.text();
        res.send(data);
    } catch (err) {
        res.status(500).send(err.toString());
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
