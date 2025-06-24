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
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`, // ここを正しく設定しておく
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "openai/gpt-3.5-turbo", // または "openai/gpt-4o"
        messages: [
          { role: "system", content: "あなたは株式投資に詳しいアシスタントです。" },
          { role: "user", content: question }
        ]
      })
    });

    const data = await response.json();

    // ログで確認
    console.log("OpenRouter応答:", JSON.stringify(data, null, 2));

    const answer = data.choices?.[0]?.message?.content || "(AIの回答がありません)";
    res.status(200).json({ message: answer });

  } catch (err) {
    console.error("OpenRouterエラー:", err);
    res.status(500).json({ message: "APIエラー", details: err.message });
  }
}
