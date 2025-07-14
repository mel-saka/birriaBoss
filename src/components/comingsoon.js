import React, { useState, useEffect } from 'react';

const ComingSoon = () => {
  const [scrollY, setScrollY] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const foodImages = [
    "/images/menu.jpg",
    "/images/taco.jpg", 
    "/images/qass.jpg",
    "/images/ramen.jpg",
    "/images/pizza.jpg",
    "/images/birriabosshome.png"
  ];

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % foodImages.length);
    }, 3000); // Change image every 3 seconds
    return () => clearInterval(interval);
  }, [foodImages.length]);

  const handleSocialClick = (url) => {
    window.open(url, '_blank');
  };

  return (
    <div className="under-construction">
      {/* Animated Background Elements */}
      <div className="floating-bg">
        <div className="floating-item item-1" style={{ transform: `translateY(${scrollY * 0.3}px) rotate(${scrollY * 0.1}deg)` }}>🌮</div>
        <div className="floating-item item-2" style={{ transform: `translateY(${scrollY * 0.5}px) rotate(${-scrollY * 0.15}deg)` }}>🔥</div>
        <div className="floating-item item-3" style={{ transform: `translateY(${scrollY * 0.2}px) rotate(${scrollY * 0.05}deg)` }}>🌶️</div>
        <div className="floating-item item-4" style={{ transform: `translateY(${scrollY * 0.4}px) rotate(${-scrollY * 0.1}deg)` }}>🧀</div>
        <div className="floating-item item-5" style={{ transform: `translateY(${scrollY * 0.6}px) rotate(${scrollY * 0.08}deg)` }}>🥄</div>
        <div className="floating-item item-6" style={{ transform: `translateY(${scrollY * 0.25}px) rotate(${-scrollY * 0.12}deg)` }}>🌽</div>
      </div>

      {/* Main Content */}
      <div className="main-content">
        {/* Logo Section */}
        <div className="logo-section">
          <img 
            src="/images/Birria_Boss_favicon_white.PNG" 
            alt="Birria Boss Logo" 
            className="main-logo"
          />
          <h1 className="brand-title">BIRRIA BOSS</h1>
          <div className="tagline">CHRISTCHURCH'S VIRAL FOOD DESTINATION</div>
        </div>

        {/* Under Construction Message */}
        <div className="construction-section">
          <div className="construction-icon">
            <div className="gear gear-1"></div>
            <div className="gear gear-2"></div>
            <div className="cooking-pot">
              <div className="steam steam-1"></div>
              <div className="steam steam-2"></div>
              <div className="steam steam-3"></div>
            </div>
          </div>
          <h2 className="construction-title">We're Cooking Something Amazing!</h2>
          <p className="construction-message">
            Our website is currently under construction, but our kitchen is always open! 
            While we put the finishing touches on our digital experience, you can still 
            enjoy our delicious birria dishes.
          </p>
        </div>

        {/* Rotating Food Showcase */}
        <div className="food-showcase">
          <div className="food-carousel">
            {foodImages.map((image, index) => (
              <div
                key={index}
                className={`food-slide ${index === currentImageIndex ? 'active' : ''}`}
                style={{
                  backgroundImage: `url(${image})`,
                  transform: `translateX(${(index - currentImageIndex) * 100}%) scale(${index === currentImageIndex ? 1 : 0.8})`,
                  opacity: index === currentImageIndex ? 1 : 0.3
                }}
              >
                <div className="slide-overlay"></div>
              </div>
            ))}
          </div>
          <div className="carousel-dots">
            {foodImages.map((_, index) => (
              <div
                key={index}
                className={`carousel-dot ${index === currentImageIndex ? 'active' : ''}`}
                onClick={() => setCurrentImageIndex(index)}
              ></div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="cta-section">
          <h3>Don't Wait - Order Now!</h3>
          <button 
            onClick={() => handleSocialClick('https://www.ubereats.com/nz/store/birria-boss/4xeB2_1fR0WuKM3mFMMbWw')}
            className="order-btn"
          >
            <span className="btn-icon">🚚</span>
            ORDER ON UBER EATS
          </button>
        </div>

        {/* Social Media Links */}
        <div className="social-section">
          <h4>Follow Our Journey</h4>
          <div className="social-links">
            <button 
              onClick={() => handleSocialClick('https://www.instagram.com/birriabossnz/')}
              className="social-btn instagram"
            >
              <span className="social-icon">📸</span>
              <span className="social-text">@birriabossnz</span>
            </button>
            <button 
              onClick={() => handleSocialClick('https://www.tiktok.com/@birriabossnz')}
              className="social-btn tiktok"
            >
              <span className="social-icon">🎵</span>
              <span className="social-text">TikTok</span>
            </button>
          </div>
        </div>

        {/* Coming Soon Info */}
        <div className="coming-soon">
          <div className="countdown-container">
            <div className="countdown-text">New Website Coming Soon!</div>
            <div className="loading-bar">
              <div className="loading-progress"></div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .under-construction {
          min-height: 100vh;
          background: linear-gradient(135deg, #DB0B00 0%, #B30A00 50%, #DB0B00 100%);
          font-family: 'Open Sans', Arial, sans-serif;
          overflow-x: hidden;
          position: relative;
        }

        /* Floating Background Elements */
        .floating-bg {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 1;
        }

        .floating-item {
          position: absolute;
          font-size: 4rem;
          opacity: 0.2;
          animation: float 8s ease-in-out infinite;
          filter: drop-shadow(2px 2px 4px rgba(0,0,0,0.3));
        }

        .item-1 { top: 10%; left: 10%; animation-delay: 0s; }
        .item-2 { top: 20%; right: 15%; animation-delay: 1.5s; }
        .item-3 { top: 70%; left: 5%; animation-delay: 3s; }
        .item-4 { top: 60%; right: 10%; animation-delay: 4.5s; }
        .item-5 { top: 30%; left: 70%; animation-delay: 6s; }
        .item-6 { top: 80%; right: 60%; animation-delay: 7.5s; }

        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-30px) rotate(10deg); }
        }

        /* Main Content */
        .main-content {
          position: relative;
          z-index: 10;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 2rem;
          text-align: center;
        }

        /* Logo Section */
        .logo-section {
          margin-bottom: 3rem;
          animation: fadeInDown 1s ease-out;
        }

        .main-logo {
          height: 120px;
          margin-bottom: 1rem;
          animation: pulse 2s infinite;
        }

        .brand-title {
          font-family: 'Bukhari Script', cursive;
          font-size: clamp(3rem, 8vw, 5rem);
          color: white;
          margin-bottom: 0.5rem;
          text-shadow: 3px 3px 6px rgba(0,0,0,0.5);
          animation: glow 3s ease-in-out infinite alternate;
        }

        .tagline {
          font-size: clamp(1rem, 3vw, 1.3rem);
          color: #FFD9F0;
          font-weight: 600;
          letter-spacing: 2px;
          text-transform: uppercase;
        }

        @keyframes glow {
          from { text-shadow: 3px 3px 6px rgba(0,0,0,0.5), 0 0 20px rgba(255, 217, 240, 0.3); }
          to { text-shadow: 3px 3px 6px rgba(0,0,0,0.5), 0 0 30px rgba(255, 217, 240, 0.6); }
        }

        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }

        /* Construction Section */
        .construction-section {
          margin-bottom: 3rem;
          animation: fadeInUp 1s ease-out 0.5s both;
        }

        .construction-icon {
          position: relative;
          margin-bottom: 2rem;
          height: 100px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .gear {
          width: 60px;
          height: 60px;
          border: 4px solid #FFB4E1;
          border-radius: 50%;
          position: absolute;
          animation: rotate 4s linear infinite;
        }

        .gear::before {
          content: '';
          position: absolute;
          top: -4px;
          left: -4px;
          right: -4px;
          bottom: -4px;
          border: 4px solid #FFB4E1;
          border-radius: 50%;
          border-color: transparent #FFB4E1 transparent #FFB4E1;
        }

        .gear-1 {
          left: -30px;
        }

        .gear-2 {
          right: -30px;
          animation-direction: reverse;
        }

        .cooking-pot {
          width: 80px;
          height: 60px;
          background: #FFB4E1;
          border-radius: 10px;
          position: relative;
          margin: 0 auto;
        }

        .steam {
          position: absolute;
          width: 6px;
          height: 40px;
          background: rgba(255, 255, 255, 0.6);
          border-radius: 3px;
          top: -45px;
          animation: steam 2s ease-in-out infinite;
        }

        .steam-1 { left: 20px; animation-delay: 0s; }
        .steam-2 { left: 37px; animation-delay: 0.7s; }
        .steam-3 { left: 54px; animation-delay: 1.4s; }

        @keyframes steam {
          0% { opacity: 0; transform: translateY(20px) scale(1); }
          50% { opacity: 1; }
          100% { opacity: 0; transform: translateY(-20px) scale(0.8); }
        }

        @keyframes rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .construction-title {
          font-family: 'Bukhari Script', cursive;
          font-size: clamp(2rem, 5vw, 3rem);
          color: #FFD9F0;
          margin-bottom: 1rem;
        }

        .construction-message {
          color: white;
          font-size: clamp(1rem, 2.5vw, 1.2rem);
          line-height: 1.6;
          max-width: 600px;
          margin: 0 auto;
        }

        /* Food Showcase */
        .food-showcase {
          margin-bottom: 3rem;
          animation: fadeInUp 1s ease-out 1s both;
        }

        .food-carousel {
          position: relative;
          width: 300px;
          height: 300px;
          margin: 0 auto 1rem;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 15px 40px rgba(0,0,0,0.4);
        }

        .food-slide {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-size: cover;
          background-position: center;
          transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
          border-radius: 20px;
        }

        .slide-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(45deg, rgba(255, 180, 225, 0.2), rgba(255, 217, 240, 0.2));
          border-radius: 20px;
        }

        .carousel-dots {
          display: flex;
          justify-content: center;
          gap: 10px;
        }

        .carousel-dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.5);
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .carousel-dot.active {
          background: #FFB4E1;
          transform: scale(1.3);
          box-shadow: 0 0 15px rgba(255, 180, 225, 0.6);
        }

        /* CTA Section */
        .cta-section {
          margin-bottom: 3rem;
          animation: fadeInUp 1s ease-out 1.5s both;
        }

        .cta-section h3 {
          color: #FFD9F0;
          font-size: clamp(1.5rem, 4vw, 2rem);
          margin-bottom: 1.5rem;
          font-weight: 700;
        }

        .order-btn {
          background: linear-gradient(45deg, #FFB4E1, #FFD9F0);
          color: #DB0B00;
          border: none;
          padding: 20px 40px;
          font-size: clamp(1rem, 3vw, 1.3rem);
          font-weight: 800;
          border-radius: 50px;
          cursor: pointer;
          transition: all 0.3s ease;
          text-transform: uppercase;
          letter-spacing: 1px;
          box-shadow: 0 8px 25px rgba(0,0,0,0.3);
          display: flex;
          align-items: center;
          gap: 12px;
          margin: 0 auto;
        }

        .order-btn:hover {
          transform: translateY(-5px) scale(1.05);
          box-shadow: 0 12px 35px rgba(0,0,0,0.4);
        }

        .btn-icon {
          font-size: 1.5em;
          animation: bounce 2s infinite;
        }

        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(-10px); }
          60% { transform: translateY(-5px); }
        }

        /* Social Section */
        .social-section {
          margin-bottom: 3rem;
          animation: fadeInUp 1s ease-out 2s both;
        }

        .social-section h4 {
          color: #FFD9F0;
          font-size: clamp(1.2rem, 3vw, 1.5rem);
          margin-bottom: 1.5rem;
          font-weight: 600;
        }

        .social-links {
          display: flex;
          gap: 1rem;
          justify-content: center;
          flex-wrap: wrap;
        }

        .social-btn {
          background: rgba(255, 255, 255, 0.1);
          color: white;
          border: 2px solid #FFB4E1;
          padding: 15px 25px;
          border-radius: 25px;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          gap: 10px;
          font-weight: 600;
          backdrop-filter: blur(10px);
        }

        .social-btn:hover {
          background: #FFB4E1;
          color: #DB0B00;
          transform: translateY(-3px);
          box-shadow: 0 8px 20px rgba(255, 180, 225, 0.4);
        }

        .social-icon {
          font-size: 1.3em;
        }

        /* Coming Soon */
        .coming-soon {
          animation: fadeInUp 1s ease-out 2.5s both;
        }

        .countdown-text {
          color: #FFD9F0;
          font-size: clamp(1rem, 2.5vw, 1.2rem);
          margin-bottom: 1rem;
          font-weight: 600;
        }

        .loading-bar {
          width: 300px;
          height: 8px;
          background: rgba(255, 255, 255, 0.2);
          border-radius: 4px;
          margin: 0 auto;
          overflow: hidden;
        }

        .loading-progress {
          height: 100%;
          background: linear-gradient(45deg, #FFB4E1, #FFD9F0);
          border-radius: 4px;
          animation: loading 3s ease-in-out infinite;
        }

        @keyframes loading {
          0% { width: 0%; }
          50% { width: 75%; }
          100% { width: 100%; }
        }

        /* Animations */
        @keyframes fadeInDown {
          from { opacity: 0; transform: translateY(-50px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(50px); }
          to { opacity: 1; transform: translateY(0); }
        }

        /* Mobile Responsive */
        @media (max-width: 768px) {
          .main-content {
            padding: 1rem;
          }

          .main-logo {
            height: 80px;
          }

          .floating-item {
            font-size: 2.5rem;
            opacity: 0.15;
          }

          .food-carousel {
            width: 250px;
            height: 250px;
          }

          .construction-icon {
            height: 80px;
          }

          .gear {
            width: 40px;
            height: 40px;
          }

          .cooking-pot {
            width: 60px;
            height: 45px;
          }

          .social-links {
            flex-direction: column;
            align-items: center;
          }

          .order-btn {
            padding: 18px 30px;
          }
        }

        @media (max-width: 480px) {
          .floating-item {
            font-size: 2rem;
            opacity: 0.1;
          }

          .food-carousel {
            width: 200px;
            height: 200px;
          }

          .loading-bar {
            width: 200px;
          }
        }
      `}</style>
    </div>
  );
};

export default ComingSoon;