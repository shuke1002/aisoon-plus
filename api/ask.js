import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: "https://openrouter.ai/api/v1",
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "POSTメソッドのみ対応しています。" });
  }

  const { message } = req.body;
  if (!message) return res.status(400).json({ message: "質問が空です。" });

  try {
    const completion = await openai.chat.completions.create({
      model: "mistralai/mixtral-8x7b",
      messages: [
        { role: "system", content: "あなたは株式投資に詳しいアシスタントです。" },
        { role: "user", content: message },
      ],
    });

    res.status(200).json({ message: completion.choices[0].message.content });
  } catch (error) {
    res.status(500).json({
      message: "APIエラー",
      details: error.message,
    });
  }
}
