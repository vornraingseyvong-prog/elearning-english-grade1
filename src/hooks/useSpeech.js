import { useState, useCallback, useEffect, useRef } from 'react';

let audio = null;
let currentUtterance = null;

function getVoices() {
  if (!window.speechSynthesis) return [];
  return window.speechSynthesis.getVoices();
}

function waitForVoices(timeout = 3000) {
  return new Promise((resolve) => {
    const voices = getVoices();
    if (voices.length > 0) return resolve(voices);
    
    const timeoutId = setTimeout(() => resolve(getVoices()), timeout);
    window.speechSynthesis.onvoiceschanged = () => {
      clearTimeout(timeoutId);
      resolve(getVoices());
    };
  });
}

export default function useSpeech() {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isSupported] = useState(() => 'speechSynthesis' in window);
  const speakingRef = useRef(false);

  const speak = useCallback(async (text, voice = 'en-US') => {
    if (!text || !window.speechSynthesis) return;

    // Stop any current playback
    if (audio) {
      audio.pause();
      audio.src = '';
      audio = null;
    }
    window.speechSynthesis.cancel();
    if (currentUtterance) {
      currentUtterance = null;
    }

    setIsSpeaking(true);
    speakingRef.current = true;

    // Wait for voices to be available
    const voices = await waitForVoices();
    
    if (!speakingRef.current) return;

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    utterance.rate = 0.85;
    utterance.pitch = 1.1;
    utterance.volume = 1;

    // Pick a good English voice
    const enVoices = voices.filter(v => v.lang.startsWith('en'));
    const preferred = enVoices.find(v => v.name.includes('Neural')) 
      || enVoices.find(v => v.name.includes('Aria'))
      || enVoices.find(v => v.name.includes('Google'))
      || enVoices[0];
    
    if (preferred) utterance.voice = preferred;

    utterance.onstart = () => {
      if (speakingRef.current) setIsSpeaking(true);
    };
    utterance.onend = () => {
      speakingRef.current = false;
      setIsSpeaking(false);
      currentUtterance = null;
    };
    utterance.onerror = (e) => {
      console.warn('TTS error:', e.error);
      speakingRef.current = false;
      setIsSpeaking(false);
      currentUtterance = null;
    };

    currentUtterance = utterance;
    window.speechSynthesis.speak(utterance);
  }, []);

  const stop = useCallback(() => {
    speakingRef.current = false;
    if (audio) {
      audio.pause();
      audio.src = '';
      audio = null;
    }
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    currentUtterance = null;
    setIsSpeaking(false);
  }, []);

  return { speak, stop, isSpeaking, isSupported };
}