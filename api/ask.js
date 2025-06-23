<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <title>アイスーンプラス</title>
</head>
<body>
  <h1>アイスーンプラス - 株価予想AI</h1>

  <form id="ask-form">
    <input type="text" id="question" placeholder="質問を入力してください（例：トヨタの株価予想）" style="width: 300px;" required />
    <button type="submit">送信</button>
  </form>

  <div id="response" style="margin-top: 20px; white-space: pre-wrap;"></div>

  <script>
    const form = document.getElementById("ask-form");
    const responseDiv = document.getElementById("response");

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const question = document.getElementById("question").value;

      responseDiv.textContent = "回答を生成中です…";

      try {
        const res = await fetch("/api/ask", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ question }),
        });

        const data = await res.json();
        responseDiv.textContent = data.message || "回答が取得できませんでした。";
      } catch (err) {
        responseDiv.textContent = "エラーが発生しました。";
      }
    });
  </script>
</body>
</html>

