import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function PWAInstall() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showBanner, setShowBanner] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    // Check if already installed
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
    setIsInstalled(isStandalone);

    if (!isStandalone) {
      // Listen for the beforeinstallprompt event
      const handleBeforeInstallPrompt = (e) => {
        e.preventDefault();
        setDeferredPrompt(e);
        // Show banner after a short delay for better UX
        setTimeout(() => setShowBanner(true), 2000);
      };

      window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

      return () => {
        window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      };
    }
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;

    // Show the install prompt
    deferredPrompt.prompt();

    // Wait for the user's response
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === 'accepted') {
      setIsInstalled(true);
    }
    
    setDeferredPrompt(null);
    setShowBanner(false);
  };

  const handleDismiss = () => {
    setShowBanner(false);
    // Store in localStorage so it doesn't show again for a while
    localStorage.setItem('pwaInstallDismissed', Date.now().toString());
  };

  // Don't show if already installed or dismissed recently
  if (isInstalled || !showBanner) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 120, damping: 14 }}
        className="fixed bottom-4 left-4 right-4 z-50 max-w-md mx-auto"
      >
        <div className="bg-gradient-to-r from-purple-500 to-blue-500 rounded-3xl p-5 shadow-2xl border-4 border-white">
          {/* Close button */}
          <button
            onClick={handleDismiss}
            className="absolute top-2 right-3 text-white text-xl font-bold hover:opacity-70 transition-opacity"
            aria-label="Dismiss"
          >
            ✕
          </button>

          <div className="flex items-center gap-4">
            {/* App Icon */}
            <motion.div
              animate={{ bounce: [0, -8, 0] }}
              transition={{ repeat: Infinity, duration: 1 }}
              className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-lg flex-shrink-0"
            >
              <span className="text-3xl">📚</span>
            </motion.div>

            {/* Text Content */}
            <div className="flex-1 min-w-0">
              <h3 className="text-white text-lg font-bold mb-1">
                📱 Add to Home Screen
              </h3>
              <p className="text-white text-sm opacity-90">
                Play our app anytime, anywhere!
              </p>
            </div>
          </div>

          {/* Install Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleInstall}
            className="w-full mt-4 bg-white text-purple-600 font-bold py-3 px-6 rounded-2xl shadow-lg hover:bg-yellow-100 transition-colors"
          >
            ⭐ Install Now!
          </motion.button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}