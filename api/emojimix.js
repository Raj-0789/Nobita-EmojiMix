import { createCanvas, loadImage } from 'canvas';
import twemoji from 'twemoji';

function getEmojiURL(emoji) {
  const code = twemoji.convert.toCodePoint(emoji);
  return `https://twemoji.maxcdn.com/v/latest/72x72/${code}.png`;
}

export default async function handler(req, res) {
  const { emoji1, emoji2 } = req.query;

  if (!emoji1 || !emoji2) {
    return res.status(400).send("Missing emoji1 or emoji2");
  }

  try {
    const canvas = createCanvas(256, 256);
    const ctx = canvas.getContext("2d");

    const img1 = await loadImage(getEmojiURL(emoji1));
    const img2 = await loadImage(getEmojiURL(emoji2));

    ctx.drawImage(img1, 0, 0, 256, 256);
    ctx.globalAlpha = 0.6;
    ctx.drawImage(img2, 0, 0, 256, 256);

    res.setHeader("Content-Type", "image/png");
    res.send(canvas.toBuffer("image/png"));
  } catch (err) {
    res.status(500).send("Error generating emoji mix");
  }
}
