import React from 'react';
import { Menubar } from 'primereact/menubar';

const Header = () => {
  const items = [
    { label: 'Home', icon: 'pi pi-fw pi-home' },
    { label: 'Book Event', icon: 'pi pi-fw pi-calendar', command: () => window.scrollTo(0, 500) },
    { label: 'Contact Us', icon: 'pi pi-fw pi-envelope', command: () => window.scrollTo(0, 1000) }
  ];

  return (
    <Menubar model={items} />
  );
};

export default Header;
