// api/ask.js  ← 既存のask.jsを一旦通知用に使う
export default async function handler(req, res) {
  try {
    const url = process.env.DISCORD_WEBHOOK_URL; // VercelのEnvに貼ったURL
    if (!url) throw new Error("DISCORD_WEBHOOK_URL が未設定です");

    await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content: "🟢 テスト：AIsoon+ からDiscord通知OK！" }),
    });

    res.status(200).json({ ok: true, msg: "通知を送信しました！" });
  } catch (e) {
    res.status(500).json({ ok: false, error: String(e) });
  }
}
