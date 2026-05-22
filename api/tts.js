import { tts } from 'edge-tts';

export default async function handler(req, res) {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { text, voice, rate, volume } = req.body || {};

    if (!text) {
      return res.status(400).json({ error: 'text is required' });
    }

    const options = {
      voice: voice || 'en-US-AriaNeural',
      rate: rate || '+0%',
      volume: volume || '+0%',
    };

    // Generate audio via edge-tts
    const audioBuffer = await tts(text, options);

    res.setHeader('Content-Type', 'audio/mpeg');
    res.setHeader('Content-Disposition', 'inline');
    return res.send(Buffer.from(audioBuffer));
  } catch (err) {
    console.error('Edge TTS error:', err);
    return res.status(500).json({ error: 'TTS failed', details: err.message });
  }
}