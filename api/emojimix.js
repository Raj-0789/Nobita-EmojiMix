import express from "express";
import fetch from "node-fetch";

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/api/emojimix", async (req, res) => {
  const { emoji1, emoji2 } = req.query;

  if (!emoji1 || !emoji2) {
    return res.status(400).json({ error: "Please provide emoji1 and emoji2 in query." });
  }

  const encode = encodeURIComponent;
  const url = `https://www.gstatic.com/android/keyboard/emojikitchen/${getEmojiCode(emoji1)}/${getEmojiCode(emoji1)}_${getEmojiCode(emoji2)}.png`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Image not found");
    const buffer = await response.arrayBuffer();
    res.setHeader("Content-Type", "image/png");
    res.send(Buffer.from(buffer));
  } catch (err) {
    res.status(500).json({ error: "Unable to fetch emoji mix image." });
  }
});

function getEmojiCode(emoji) {
  return [...emoji].map(char => char.codePointAt(0).toString(16)).join("-");
}

app.listen(PORT, () => console.log("EmojiMix API running on port", PORT));
