import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useSpeech from '../hooks/useSpeech';

// Context for language toggle
export const LanguageContext = {};

export default function KhmerToggle() {
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

  // Translations helper
  const t = (en, kh) => (lang === 'en' ? en : kh);

  return (
    <LanguageContext.Provider value={{ lang, t, speak, isSpeaking }}>
      <div className="flex items-center gap-2">
        {/* Language Toggle Button */}
        <motion.button
          onClick={toggle}
          className={`
            relative flex items-center gap-2 px-4 py-2 rounded-full font-bold text-sm
            transition-colors duration-200
            ${lang === 'en'
              ? 'bg-blue-500 text-white'
              : 'bg-orange-500 text-white'
            }
          `}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          title={t('Switch to Khmer', 'ប្ដូរជាភាសាខ្មែរ')}
        >
          <AnimatePresence mode="wait">
            <motion.span
              key={lang}
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 10, opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="flex items-center gap-1"
            >
              {lang === 'en' ? (
                <>
                  <span className="text-base">🇬🇧</span>
                  <span>EN</span>
                </>
              ) : (
                <>
                  <span className="text-base">🇰🇭</span>
                  <span>ខ្មែរ</span>
                </>
              )}
            </motion.span>
          </AnimatePresence>
        </motion.button>

        {/* Speak button for current language */}
        <motion.button
          onClick={() => speak(lang === 'en' ? 'English' : 'Khmer')}
          className="bg-purple-400 text-white px-3 py-2 rounded-full shadow text-sm"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          disabled={isSpeaking}
          title={t('Hear language', 'ស្ដាប់ភាសា')}
        >
          {isSpeaking ? '🔊' : '🔈'}
        </motion.button>
      </div>
    </LanguageContext.Provider>
  );
}

// Hook to use language context
export function useLanguage() {
  const context = LanguageContext;
  return context;
}