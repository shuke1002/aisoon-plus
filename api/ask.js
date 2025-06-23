import OpenAI from "openai";← 修正済み

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
      model: "gpt-3.5-turbo", // ← 一時的にこちらに変更
      messages: [
        { role: "system", content: "あなたは株式投資に詳しいアシスタントです。" },
        { role: "user", content: question }
      ]
    });

    const answer = chatCompletion.choices[0].message.content;
    res.status(200).json({ message: answer });
  } catch (err) {
    console.error("OpenAI API error:", err); // ← 追加
    res.status(500).json({ message: "APIエラー", details: err.message });
  }
}
