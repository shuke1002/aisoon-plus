// api/ask.js
export default async function handler(req, res) {
  try {
    const url = process.env.DISCORD_WEBHOOK_URL;
    if (!url) return res.status(500).json({ ok: false, error: "DISCORD_WEBHOOK_URL が未設定です" });

    // ブラウザからの GET でも、ツールからの POST でもOKにする
    if (req.method !== "GET" && req.method !== "POST") {
      return res.status(405).json({ ok: false, error: "Method Not Allowed" });
    }

    // Discordへテスト通知
    await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content: "🟢 テスト：AIsoon+ からDiscord通知OK！" })
    });

    return res.status(200).json({ ok: true, msg: "通知を送信しました！" });
  } catch (e) {
    return res.status(500).json({ ok: false, error: String(e) });
  }
}
