# English Learning for Grade 1 🇰🇭

A fun, interactive e-learning platform for Grade 1 students (ages 6-7) learning English in Cambodia. Features Khmer translations, audio pronunciation, gamification, and mobile-friendly design.

## ✨ Features

### Phase 1 (MVP)
- 🔤 **Learn Letters** — A-Z grid with audio pronunciation, sample words, star rewards
- 📖 **Flashcards** — Word + picture cards with Khmer translation, auto-advance, TTS
- 🎮 **Matching Game** — Match words to images, animated card flips, confetti celebration
- ⭐ **Star Rewards** — Earn stars for completing activities, track progress

### Phase 2
- 🎧 **Phonics Quiz** — Hear a sound, tap the matching letter
- 🇰🇭 **Khmer/English Toggle** — Switch between language translations
- 🔄 **Drag & Drop** — (Coming soon) Drag words to match pictures

### Phase 3
- 🎤 **Speech Practice** — (Coming soon) Practice pronunciation with microphone
- 📊 **Dashboard** — Track progress, badges, weekly activity chart
- 📱 **PWA Install** — Add to home screen for offline access

### Student Profiles
- Multiple student profiles with emoji avatars
- Progress saved per student (letters, words, stars, streak)
- Switch between profiles anytime

## 🛠️ Tech Stack

- **Frontend:** React 18 + Vite
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **Routing:** React Router v6
- **Audio:** Web Speech API (browser-native TTS, no external service)
- **Storage:** localStorage (profiles + progress)
- **Hosting:** Vercel (free)

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

## 🌐 Deploy to Vercel

### Option 1: One-click Deploy (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/import/project?template=empty)

1. Click the button above or go to [vercel.com/import](https://vercel.com/import)
2. Import this GitHub repository
3. Vercel auto-detects React + Vite settings
4. Click Deploy!

### Option 2: Vercel CLI

```bash
# Install Vercel CLI globally
npm i -g vercel

# Login to Vercel
vercel login

# Deploy (from project directory)
vercel --prod

# Or deploy preview
vercel
```

### Option 3: GitHub Integration

1. Push to GitHub: `git add . && git commit -m "init" && git remote add origin https://github.com/YOUR_USER/ELearning-English-Grade1.git && git push -u origin main`
2. Go to [vercel.com/import](https://vercel.com/import)
3. Import from GitHub repo
4. Vercel deploys automatically on every push!

## 📁 Project Structure

```
src/
├── App.jsx                 # Main router
├── main.jsx               # Entry point
├── components/
│   ├── Navigation.jsx     # Bottom nav bar
│   ├── LetterCard.jsx     # Letter display card
│   ├── StarReward.jsx     # Animated star popup
│   ├── ProgressBar.jsx    # Progress tracker
│   ├── KhmerToggle.jsx    # Language switcher
│   ├── AvatarPicker.jsx   # Avatar selection grid
│   ├── ProfileMenu.jsx    # Top-right profile dropdown
│   └── LoginModal.jsx     # First-visit login
├── context/
│   ├── AuthContext.jsx    # Student profile context
│   └── LanguageContext.jsx # Language toggle context
├── data/
│   └── vocabulary.js      # 171 words + A-Z (with Khmer)
├── hooks/
│   └── useSpeech.js       # Web Speech API TTS
└── pages/
    ├── Home.jsx           # Welcome + activity cards
    ├── LearnLetters.jsx   # A-Z learning grid
    ├── FlashcardGame.jsx  # Flashcard study
    ├── MatchingGame.jsx   # Word-image matching
    ├── PhonicsGame.jsx    # Phonics quiz
    ├── DragDropGame.jsx   # Drag-drop (placeholder)
    ├── Dashboard.jsx      # Progress dashboard
    ├── SpeechPractice.jsx # Speech practice (placeholder)
    └── Profiles.jsx       # Profile management
```

## 📚 Vocabulary

- **171 vocabulary words** across 12 categories
- **26 A-Z letters** with phonetic sounds
- **Khmer translations** for every word
- Categories: Animals, Colors, Numbers, Body Parts, Family, Objects, Food, Nature, Actions, Weather, Shapes, Clothes, Vehicles, Toys, Places, Seasons, Verbs, Adjectives

## 📱 Design

- **Child-friendly:** Large buttons (60-80px+), bright colors, rounded corners
- **Mobile-first:** Works on tablets and phones
- **Audio-first:** Text-to-speech for all words (no reading required)
- **Gamification:** Stars, badges, confetti celebrations
- **Offline-ready:** Progress saved in localStorage

## 🎨 Colors

| Color | Hex | Usage |
|-------|-----|-------|
| Coral | `#FF6B6B` | Primary, letters |
| Teal | `#4ECDC4` | Secondary, buttons |
| Yellow | `#FFE66D` | Accent, stars |
| Green | `#6BCB77` | Success, progress |
| Lavender | `#F7F7FF` | Background |

## License

MIT — Free to use and modify for educational purposes.

---

Built with ❤️ for Grade 1 students in Cambodia 🇰🇭