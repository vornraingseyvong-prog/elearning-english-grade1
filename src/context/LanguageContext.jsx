import { createContext, useContext, useState, useEffect } from 'react';
import useSpeech from '../hooks/useSpeech';

// Language Context for bilingual support (English/Khmer)
export const LanguageContext = createContext({
  lang: 'en',
  t: (en, kh) => en,
  speak: () => {},
  isSpeaking: false,
});

export function useLanguage() {
  return useContext(LanguageContext);
}

export default function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => {
    const saved = localStorage.getItem('app-lang');
    return saved || 'en';
  });
  const { speak, isSpeaking } = useSpeech();

  useEffect(() => {
    localStorage.setItem('app-lang', lang);
  }, [lang]);

  const toggle = () => {
    setLang((prev) => (prev === 'en' ? 'kh' : 'en'));
  };

  const t = (en, kh) => (lang === 'en' ? en : kh);

  return (
    <LanguageContext.Provider value={{ lang, t, speak, isSpeaking, toggle }}>
      {children}
    </LanguageContext.Provider>
  );
}