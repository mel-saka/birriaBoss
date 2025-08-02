// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import BookingForm from './components/BookingForm';
import BirriaRoulette from './components/BirriaRoulette';
import BrriaBossHome from './components/BrriaBossHome';
import Footer from './components/Footer';
import MenuPage from './components/MenuPage';
import OpeningHours from './components/OpeningHours';
import ReviewPage from './components/ReviewPage.js';

// Styles
import './styles/App.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
// import { Contact, Home } from 'lucide-react'; // icons, not pages
import ComingSoon from './components/comingsoon.js';

// ✅ Vercel Analytics + Speed Insights (React)
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';


const MainContent = () => {
  const location = useLocation();

  return (
    <div className="App">
      {/* Conditionally render Header if needed */}

      <Routes>
        <Route path="/" element={<BrriaBossHome />} />
        <Route path="/home" element={<BrriaBossHome />} />
        <Route path="/booking" element={<BookingForm />} />
        <Route path="/rewards" element={<BirriaRoulette />} />
        <Route path="/menu" element={<MenuPage />} />
        <Route path="/hours" element={<OpeningHours />} />
        <Route path="/reviews" element={<ReviewPage />} />
        {/* <Route path="/contact" element={<ContactPage />} /> */}
        <Route path="/win" element={<BirriaRoulette />} />
        {/* Duplicate /home route to <Home /> (an icon) removed */}
      </Routes>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <MainContent />
      {/* Render once at the root */}
      <Analytics />
      <SpeedInsights />
    </Router>
  );
};

export default App;
