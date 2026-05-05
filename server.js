import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

app.post("/ai-search", async (req, res) => {

  const { query } = req.body;

  if (!query) {
    return res.json({ result: "검색어 없음" });
  }

  try {

    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        input: query
      })
    });

    const data = await response.json();

    const result = data.output_text || "AI 결과 없음";

    res.json({ result });

  } catch (err) {
    console.error(err);
    res.status(500).json({ result: "서버 오류" });
  }

});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("서버 실행됨");
});