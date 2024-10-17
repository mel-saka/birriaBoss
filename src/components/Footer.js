import React from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';


const Footer = () => {
  return (
    <Card className="p-mt-4 p-p-4">
      <h3>Contact Us</h3>
      <p>birriaboss@example.com</p>
      <Button label="Follow Us" icon="pi pi-instagram" className="p-button-secondary" />
    </Card>
  );
};

export default Footer;
