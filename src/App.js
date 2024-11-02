import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Header from './components/Header';
import BookingForm from './components/BookingForm';
import BirriaRoulette from './components/BirriaRoulette';
import Footer from './components/Footer';
import './styles/App.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css'; // Choose a theme or replace with your theme name
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';


const App = () => {
  return (
    <Router>
      <div className="App">
        
        
        {/* Navigation Menu
        <nav className="bg-gradient-to-r from-red-900 to-red-700 p-4">
          <div className="max-w-4xl mx-auto flex justify-center space-x-6">
            <Link 
              to="/" 
              className="text-white hover:text-yellow-300 transition-colors font-semibold px-4 py-2 rounded-lg hover:bg-red-800"
            >
              Book Catering
            </Link>
            <Link 
              to="/rewards" 
              className="text-white hover:text-yellow-300 transition-colors font-semibold px-4 py-2 rounded-lg hover:bg-red-800"
            >
              Rewards Game
            </Link>
          </div>
        </nav> */}

        {/* Routes */}
        <Routes>
          <Route path="/" element={<BookingForm />} />
          <Route path="/rewards" element={<BirriaRoulette />} />
        </Routes>

        
      </div>
    </Router>
  );
};

export default App;