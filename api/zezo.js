// api/zezo.js
import fetch from "node-fetch";

export default async function handler(req, res) {
  const { url } = req.query;
  if (!url) return res.status(400).json({ error: "Missing url parameter" });

  try {
    const response = await fetch(url);
    const data = await response.text(); // ou .json() si JSON
    res.status(200).send(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
