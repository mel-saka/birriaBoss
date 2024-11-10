// Header.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MegaMenu } from 'primereact/megamenu';

const Header = () => {
  const navigate = useNavigate();

  const items = [
    { label: 'Booking', command: () => navigate('/booking') },
    { label: 'Rewards', command: () => navigate('/rewards') },
    { label: 'Menu', command: () => navigate('/menu') },
    { label: 'Opening Hours', command: () => navigate('/hours') },
    { label: 'Reviews', command: () => navigate('/reviews') },
    { label: 'Contact', command: () => navigate('/contact') },
  ];

  return (
    <header style={{
      display: 'flex',
      alignItems: 'center',
      padding: '10px 20px',
      backgroundColor: '#FFB4E1',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    }}>
      {/* Logo */}
      <img 
        src="/images/Birria_Boss_favicon_red.png" 
        alt="Birria Boss Logo" 
        style={{
          cursor: 'pointer',
          width: '50px', // Adjust size as needed
          height: 'auto',
          marginRight: '20px',
        }}
        onClick={() => {
          navigate('/');
          window.scrollTo(0, 0);
        }}
      />

      {/* Mega Menu */}
      <MegaMenu 
        orientation="horizontal" 
        style={{
          backgroundColor: 'transparent',
          color: '#DB0B00',
          fontSize: '0.8rem', // Smaller font size for modern look
          fontWeight: '500',
        }} 
        itemTemplate={(item) => (
          <span style={{
            color: '#DB0B00',
            padding: '8px 12px',
            border: '1px solid #DB0B00',
            borderRadius: '5px',
            margin: '0 5px',
            display: 'inline-block',
            
          }}>
            {item.label}
          </span>
        )}
      />
    </header>
  );
};

export default Header;
