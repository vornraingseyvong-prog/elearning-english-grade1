import { Routes, Route } from 'react-router-dom';
import AuthProvider from './context/AuthContext';
import ProfileMenu from './components/ProfileMenu';
import LoginModal from './components/LoginModal';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import Profiles from './pages/Profiles';
import LearnLetters from './pages/LearnLetters';
import FlashcardGame from './pages/FlashcardGame';
import MatchingGame from './pages/MatchingGame';
import PhonicsGame from './pages/PhonicsGame';
import DragDropGame from './pages/DragDropGame';
import SpeechPractice from './pages/SpeechPractice';
import { useAuth } from './context/AuthContext';

function StarsPage() {
  const { currentProfile } = useAuth();
  const studentName = currentProfile?.name || 'Friend';
  const totalStars = currentProfile?.totalStars || 0;
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-100 to-orange-100 p-6">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-yellow-600 mb-8">
          ⭐ {studentName}'s Stars ⭐
        </h1>
        <div className="bg-white rounded-3xl p-8 shadow-xl border-4 border-yellow-300 text-center">
          <div className="text-8xl mb-4">🌟</div>
          <p className="text-3xl font-bold text-gray-700 mb-2">
            You have collected
          </p>
          <div className="text-6xl font-bold text-yellow-500 mb-4">
            {totalStars} Stars!
          </div>
          <p className="text-xl text-gray-600">
            Keep learning to earn more stars!
          </p>
        </div>
      </div>
    </div>
  );
}

function AppContent() {
  const { showLogin, createProfile } = useAuth();
  
  return (
    <>
      <ProfileMenu />
      {showLogin && <LoginModal onComplete={createProfile} />}
      <div className="min-h-screen bg-gradient-to-b from-blue-100 to-purple-100 pb-20">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/letters" element={<LearnLetters />} />
          <Route path="/flashcards" element={<FlashcardGame />} />
          <Route path="/matching" element={<MatchingGame />} />
          <Route path="/stars" element={<StarsPage />} />
          <Route path="/phonics" element={<PhonicsGame />} />
          <Route path="/drag" element={<DragDropGame />} />
          <Route path="/speech" element={<SpeechPractice />} />
          <Route path="/profiles" element={<Profiles />} />
        </Routes>
        <Navigation />
      </div>
    </>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}