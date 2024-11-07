// Header.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();

  const start = (
    <img 
      src="/images/Birria_Boss_favicon_red.png" 
      alt="Birria Boss Logo" 
      style={{
        cursor: 'pointer',
        width: '6rem', // Three times larger
        height: 'auto',
        transition: 'transform 0.2s ease-in-out',
      }}
      onClick={() => {
        navigate('/');
        window.scrollTo(0, 0);
      }}
      onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.1)')}
      onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
    />
  );

  return (
    <header style={{
      display: 'flex',
      justifyContent: 'center',
      padding: '10px',
      backgroundColor: '#FFB4E1', // Updated background color
    }}>
      {start}
    </header>
  );
};

export default Header;
