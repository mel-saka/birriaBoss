import React from 'react';
import Header from './components/Header';
import BookingForm from './components/BookingForm';
import Footer from './components/Footer';
import './styles/App.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css'; // Theme
import 'primereact/resources/primereact.min.css'; // PrimeReact
import 'primeicons/primeicons.css'; // PrimeIcons

const App = () => {
  return (
    <div className="App">
      <BookingForm />
    </div>
  );
};

export default App;
