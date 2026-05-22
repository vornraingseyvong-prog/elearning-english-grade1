import { useState, useCallback } from 'react';

let audio = null;
let currentAbort = null;

// Use edge-tts directly in browser via WebSocket
async function speakWithEdgeTTS(text, voice = 'en-US-AriaNeural', onEnd, onError) {
  const baseUrl = 'speech.platform.bing.com/consumer/speech/synthesize/readaloud';
  const token = '6A5AA1D4EAFF4E9FB37E23D68491D6F4';
  const wsURL = `wss://${baseUrl}/edge/v1?TrustedClientToken=${token}`;

  return new Promise((resolve, reject) => {
    const ws = new WebSocket(wsURL, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.5060.66 Safari/537.36 Edg/103.0.1264.44'
      }
    });

    const audioChunks = [];
    let closed = false;

    ws.onopen = () => {
      const ssml = [
        'X-RequestId:' + crypto.randomUUID().replace(/-/g, ''),
        'Content-Type:application/ssml+xml',
        'X-Timestamp:' + new Date().toISOString(),
        'Path:ssml',
        '',
        `<speak version='1.0' xmlns='http://www.w3.org/2001/10/synthesis' xml:lang='en-US'><voice name='${voice}'>${text}</voice></speak>`
      ].join('\r\n');

      ws.send(ssml);
    };

    ws.onmessage = (event) => {
      if (typeof event.data === 'string') {
        if (event.data.includes('turn.end')) {
          ws.close();
          closed = true;
          if (audioChunks.length > 0) {
            const blob = new Blob(audioChunks, { type: 'audio/mpeg' });
            resolve(blob);
          } else {
            reject(new Error('No audio data'));
          }
        }
      } else {
        audioChunks.push(event.data);
      }
    };

    ws.onerror = (err) => {
      if (!closed) reject(err);
    };

    ws.onclose = () => {
      if (!closed && audioChunks.length === 0) {
        reject(new Error('Connection closed'));
      }
    };
  });
}

export default function useSpeech() {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isSupported] = useState(true);

  const speak = useCallback(async (text, voice = 'en-US-AriaNeural') => {
    // Stop any current playback
    if (audio) {
      audio.pause();
      audio.src = '';
      audio = null;
    }
    if (currentAbort) {
      try { currentAbort.abort(); } catch {}
      currentAbort = null;
    }

    if (!text) return;

    setIsSpeaking(true);
    try {
      const blob = await speakWithEdgeTTS(text, voice);
      const url = URL.createObjectURL(blob);

      audio = new Audio(url);
      audio.playbackRate = 0.85;

      audio.onplay = () => setIsSpeaking(true);
      audio.onended = () => {
        setIsSpeaking(false);
        URL.revokeObjectURL(url);
        audio = null;
      };
      audio.onerror = (e) => {
        console.warn('Audio error:', e);
        setIsSpeaking(false);
        URL.revokeObjectURL(url);
        audio = null;
      };

      await audio.play();
    } catch (err) {
      console.warn('Edge TTS error:', err);
      setIsSpeaking(false);
    }
  }, []);

  const stop = useCallback(() => {
    if (audio) {
      audio.pause();
      audio.src = '';
      audio = null;
    }
    setIsSpeaking(false);
  }, []);

  return { speak, stop, isSpeaking, isSupported };
}

// Voices:
// en-US-AriaNeural (default, friendly female)
// en-US-JennyNeural (female, warm)
// en-US-GuyNeural (male, clear)
// en-GB-SoniaNeural (UK female)
// zh-CN-XiaoxiaoNeural (Chinese)