import fetch from "node-fetch";

export default async function handler(req, res) {
  const { emoji1, emoji2 } = req.query;

  if (!emoji1 || !emoji2) {
    return res.status(400).json({ error: "Please provide emoji1 and emoji2." });
  }

  const encode = s => [...s].map(c => c.codePointAt(0).toString(16)).join("-");
  const url = `https://www.gstatic.com/android/keyboard/emojikitchen/${encode(emoji1)}/${encode(emoji1)}_${encode(emoji2)}.png`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Image not found");
    const buffer = await response.arrayBuffer();
    res.setHeader("Content-Type", "image/png");
    res.send(Buffer.from(buffer));
  } catch (e) {
    res.status(500).json({ error: "Failed to fetch emoji mix image." });
  }
}
