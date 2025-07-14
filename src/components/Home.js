import React from 'react';

const BrriaBossHome = () => {
  const handleNavigation = (path, external = false) => {
    if (external) {
      window.open(path, '_blank');
    } else {
      // For internal navigation, you can replace this with your router logic
      console.log('Navigate to:', path);
    }
  };

  return (
    <div className="birria-boss-home">
      {/* Navigation Bar */}
      <nav className="navbar">
        <div className="nav-container">
          <div className="logo">
            <img 
              src="/images/Birria_Boss_favicon_white.PNG" 
              alt="Birria Boss Logo" 
              className="logo-image"
            />
          </div>
          <div className="nav-links">
            <button onClick={() => handleNavigation('/')} className="nav-link active">HOME</button>
            <button onClick={() => handleNavigation('/about')} className="nav-link">ABOUT US</button>
            <button onClick={() => handleNavigation('/reviews')} className="nav-link">REVIEWS</button>
            <button onClick={() => handleNavigation('/menu')} className="nav-link">MENU</button>
            <button onClick={() => handleNavigation('/hours')} className="nav-link">OPENING HOURS</button>
            <button onClick={() => handleNavigation('/contact')} className="nav-link">CONTACT US</button>
            <button onClick={() => handleNavigation('https://www.ubereats.com/nz/store/birria-boss/4xeB2_1fR0WuKM3mFMMbWw', true)} className="nav-link">ORDER ON UBER</button>
            <button onClick={() => handleNavigation('https://www.instagram.com/birriabossnz/', true)} className="nav-link">FOLLOW US</button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">BIRRIA BOSS</h1>
            <p className="hero-subtitle">
              CHRISTCHURCH'S<br/>
              VIRAL FOOD<br/>
              DESTINATION
            </p>
          </div>
          <div className="hero-image">
            <img 
              src="/images/birriabosshome.png" 
              alt="Birria Boss Tacos" 
              className="food-image"
            />
            <div className="brand-pattern"></div>
          </div>
        </div>
      </div>

      {/* Bottom Navigation Dots */}
      <div className="bottom-nav">
        <div className="nav-dots">
          <div className="dot active"></div>
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
        </div>
      </div>

      <style>{`
        .birria-boss-home {
          min-height: 100vh;
          background-color: #DB0B00;
          font-family: 'Open Sans', Arial, sans-serif;
          overflow-x: hidden;
        }

        .navbar {
          background-color: #DB0B00;
          padding: 1rem 0;
          position: relative;
          z-index: 1000;
        }

        .nav-container {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0 2rem;
        }

        .logo {
          display: flex;
          align-items: center;
        }

        .logo-image {
          height: 60px;
          width: auto;
          margin-right: 1rem;
        }

        .nav-links {
          display: flex;
          gap: 2rem;
          align-items: center;
        }

        .nav-link {
          background: none;
          border: none;
          color: #F0F2E4;
          font-weight: 600;
          font-size: 0.9rem;
          cursor: pointer;
          padding: 0.5rem 0;
          transition: all 0.3s ease;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          font-family: 'Open Sans', Arial, sans-serif;
        }

        .nav-link:hover {
          color: #FFD9F0;
          transform: translateY(-2px);
        }

        .nav-link.active {
          color: #FFD9F0;
          border-bottom: 2px solid #FFD9F0;
        }

        .hero-section {
          background: linear-gradient(135deg, #DB0B00 0%, #B30A00 100%);
          min-height: 80vh;
          display: flex;
          align-items: center;
          position: relative;
          overflow: hidden;
        }

        .hero-content {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 2rem;
          display: grid;
          grid-template-columns: 1fr 1.3fr;
          gap: 4rem;
          align-items: center;
          width: 100%;
        }

        .hero-text {
          color: #F0F2E4;
        }

        .hero-title {
          font-family: 'Bukhari Script', cursive;
          font-size: clamp(3rem, 8vw, 6rem);
          font-weight: 900;
          margin-bottom: 1rem;
          letter-spacing: 2px;
          text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
          color: #F0F2E4;
        }

        .hero-subtitle {
          font-family: 'Open Sans', Arial, sans-serif;
          font-weight: 700;
          font-size: clamp(1.2rem, 3vw, 1.8rem);
          line-height: 1.2;
          letter-spacing: 1px;
          text-shadow: 1px 1px 2px rgba(0,0,0,0.3);
          color: #F0F2E4;
        }

        .hero-image {
          position: relative;
          height: 500px;
          border-radius: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 10px 30px rgba(0,0,0,0.3);
          overflow: hidden;
          background: linear-gradient(45deg, #FFD9F0, #FFB4E1);
        }

        .food-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 20px;
          position: relative;
          z-index: 2;
        }

        .brand-pattern {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="taco-pattern" x="0" y="0" width="25" height="25" patternUnits="userSpaceOnUse"><circle cx="12.5" cy="12.5" r="8" fill="none" stroke="white" stroke-width="1" opacity="0.1"/><circle cx="12.5" cy="12.5" r="3" fill="white" opacity="0.05"/></pattern></defs><rect width="100" height="100" fill="url(%23taco-pattern)"/></svg>') repeat;
          opacity: 0.3;
          z-index: 1;
          border-radius: 20px;
        }

        .bottom-nav {
          position: fixed;
          bottom: 2rem;
          left: 50%;
          transform: translateX(-50%);
          z-index: 1000;
        }

        .nav-dots {
          display: flex;
          gap: 1rem;
          background: rgba(240,242,228,0.2);
          padding: 1rem;
          border-radius: 25px;
          backdrop-filter: blur(10px);
        }

        .dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: rgba(240,242,228,0.5);
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .dot.active {
          background: #EDBE4C;
          transform: scale(1.2);
        }

        .dot:hover {
          background: rgba(240,242,228,0.8);
        }

        /* Mobile Responsive */
        @media (max-width: 768px) {
          .nav-links {
            display: none;
          }

          .logo-image {
            height: 50px;
            margin-right: 0;
          }

          .hero-content {
            grid-template-columns: 1fr;
            text-align: center;
            gap: 2rem;
          }

          .hero-title {
            font-size: 2.5rem;
          }

          .hero-subtitle {
            font-size: 1.2rem;
          }

          .hero-image {
            height: 300px;
          }
        }

        @media (max-width: 480px) {
          .nav-container {
            padding: 0 1rem;
          }

          .hero-content {
            padding: 0 1rem;
          }

          .hero-title {
            font-size: 2rem;
          }

          .hero-subtitle {
            font-size: 1rem;
          }

          .logo-image {
            height: 40px;
          }
        }

        /* Add mobile menu for smaller screens */
        @media (max-width: 768px) {
          .nav-container::after {
            content: '☰';
            color: #F0F2E4;
            font-size: 1.5rem;
            cursor: pointer;
          }
        }
      `}</style>
    </div>
  );
};

export default BrriaBossHome;