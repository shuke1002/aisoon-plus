export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "POSTメソッドだけ対応しています" });
  }

  const { message: question } = req.body;

  if (!question || question.trim() === "") {
    return res.status(400).json({ message: "質問が空です" });
  }

  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,  // ← ここを使う
        "HTTP-Referer": "https://aisoon-plus.vercel.app",             // ← あなたのサイトURL
        "X-Title": "aisoon-plus"
      },
      body: JSON.stringify({
        model: "openai/gpt-4o",  // ← 完全無料で使えるGPT-4o互換
        messages: [
          { role: "system", content: "あなたは株式投資に詳しいアシスタントです。" },
          { role: "user", content: question }
        ]
      })
    });

    const result = await response.json();

    const aiMessage = result.choices?.[0]?.message?.content;
    res.status(200).json({ message: aiMessage || "（AIの回答がありません）" });

  } catch (err) {
    console.error("OpenRouter APIエラー:", err);
    res.status(500).json({ message: "APIエラー", details: err.message });
  }
}
