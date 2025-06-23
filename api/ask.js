import { OpenAI } from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { question } = req.body;
  if (!question) return res.status(400).json({ error: '質問が空です' });

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [{ role: 'user', content: `株式投資の視点で答えて：${question}` }]
    });
    const answer = completion.choices[0].message.content;
    res.status(200).json({ answer });
  } catch (err) {
    res.status(500).json({ error: 'APIエラー', detail: err.message });
  }
}
