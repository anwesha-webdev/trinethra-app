const express = require("express");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Route
app.post("/analyze", (req, res) => {
  let text = req.body.text;

  // Handle empty input
  if (!text || text.trim() === "") {
    // Processing
const words = text.split(" ");
const wordCount = words.length;
const charCount = text.length;
const sentenceCount = text.split(/[.!?]+/).filter(Boolean).length;

// Longest word
const longestWord = words.reduce((a, b) => a.length > b.length ? a : b, "");

// Reading time (200 words/min)
const readingTime = (wordCount / 200).toFixed(2);

// FINAL RESPONSE
return res.json({
  wordCount,
  charCount,
  sentenceCount,
  longestWord,
  readingTime
});
  }

  // Limit text length
  if (text.length > 1000) {
    return res.json({
      error: "Text too long (max 1000 characters)"
    });
  }

  // Clean text
  text = text.trim().replace(/\s+/g, " ");

  // Processing
  const words = text.split(" ");
  const wordCount = words.length;
  const charCount = text.length;
  const sentenceCount = text.split(/[.!?]+/).filter(Boolean).length;

  // Longest word
const longestWord = words.reduce((a, b) =>
  a.length > b.length ? a : b, ""
);

// Reading time (200 words per minute)
const readingTime = (wordCount / 200).toFixed(2);

res.json({
  wordCount,
  charCount,
  sentenceCount,
  longestWord,
  readingTime
});
});

// Start server
app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});