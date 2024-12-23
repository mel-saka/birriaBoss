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

// New Component to handle conditional rendering
const MainContent = () => {
  const location = useLocation();

  return (
    <div className="App">
      {/* Conditionally render Header */}
      {location.pathname !== '/' && <Header />}
      <Routes>
        <Route path="/" element={<BrriaBossHome />} />
        <Route path="/booking" element={<BookingForm />} />
        <Route path="/rewards" element={<BirriaRoulette />} />
        <Route path="/menu" element={<MenuPage />} />
        <Route path="/hours" element={<OpeningHours />} />
        <Route path="/reviews" element={<ReviewPage />} />
        <Route path="/contact" element={<div>Contact Page Coming Soon</div>} />
        <Route path="/win" element={<BirriaRoulette/>} />
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
