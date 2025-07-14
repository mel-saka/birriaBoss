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
import { Contact, Home } from 'lucide-react';
import ComingSoon from './components/comingsoon.js';

// New Component to handle conditional rendering
const MainContent = () => {
  const location = useLocation();

  return (
    <div className="App">
      {/* Conditionally render Header */}

      <Routes>
        <Route path="/" element={<ComingSoon/>} />
        <Route path="/booking" element={<BookingForm />} />
        <Route path="/rewards" element={<BirriaRoulette />} />
        <Route path="/menu" element={<MenuPage />} />
        <Route path="/hours" element={<OpeningHours />} />
        <Route path="/reviews" element={<ReviewPage />} />
        <Route path="/contact" element={<Contact/>} />
        <Route path="/win" element={<BirriaRoulette/>} />
        <Route path="/home" element={<Home/>} />
      </Routes>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <MainContent />
    </Router>
  );
};

export default App;
