import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "POSTメソッドだけ対応しています" });
  }

  const { message: question } = req.body;

  if (!question || question.trim() === "") {
    return res.status(400).json({ message: "質問が空です" });
  }

  try {
    const chatCompletion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", content: "あなたは株式投資に詳しいアシスタントです。" },
        { role: "user", content: question }
      ]
    });

    const answer = chatCompletion.choices[0].message.content;
    res.status(200).json({ message: answer });
  } catch (err) {
    console.error("OpenAI APIエラー:", err); // ←デバッグ用にログ追加
    res.status(500).json({ message: "APIエラー", details: err.message });
  }
}
