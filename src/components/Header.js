import React from 'react';
import { Menubar } from 'primereact/menubar';
import { useNavigate, useLocation } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const items = [
    {
      label: 'Home',
      icon: 'pi pi-fw pi-home',
      command: () => {
        if (location.pathname === '/') {
          window.scrollTo(0, 0);
        } else {
          navigate('/');
        }
      }
    },
    {
      label: 'Book Event',
      icon: 'pi pi-fw pi-calendar',
      command: () => {
        if (location.pathname === '/') {
          window.scrollTo(0, 500);
        } else {
          navigate('/');
          // Wait for navigation to complete before scrolling
          setTimeout(() => window.scrollTo(0, 500), 100);
        }
      }
    },
    {
      label: 'Contact Us',
      icon: 'pi pi-fw pi-envelope',
      command: () => {
        if (location.pathname === '/') {
          window.scrollTo(0, 1000);
        } else {
          navigate('/');
          // Wait for navigation to complete before scrolling
          setTimeout(() => window.scrollTo(0, 1000), 100);
        }
      }
    },
    {
      label: 'Rewards Game',
      icon: 'pi pi-fw pi-star',
      command: () => {
        navigate('/rewards');
        window.scrollTo(0, 0);
      }
    }
  ];

  const start = <img 
    src="/images/Birria_Boss_favicon_red.png" 
    alt="Birria Boss Logo" 
    height="40" 
    className="mr-2 cursor-pointer"
    onClick={() => {
      navigate('/');
      window.scrollTo(0, 0);
    }}
  />;

  return (
    <Menubar 
      model={items} 
      start={start}
      className="border-none"
      style={{ 
        background: 'var(--main-color)',
        color: 'white'
      }}
    />
  );
};

export default Header;