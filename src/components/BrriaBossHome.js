import React, { useState, useEffect } from 'react';
import { MapPin, Clock, Star, ChevronRight, Instagram, Facebook, Menu, X, TrendingUp, Heart, ShoppingBag, Music2 as TikTokIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const BrriaBossHome = () => {
  const [scrollY, setScrollY] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [hoveredFeature, setHoveredFeature] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Scroll handler
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);

    // Auto-slide for hero images
    const slideInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 3);
    }, 5000);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(slideInterval);
    };
  }, []);

  const handleNavigation = (path, external = false) => {
    if (external) {
      window.open(path, '_blank', 'noopener');
    } else {
      navigate(path);
      setMobileMenuOpen(false);
    }
  };

  const heroSlides = [
    {
      image: "/images/birriabosshome.png",
      title: "AUTHENTIC BIRRIA",
      subtitle: "Slow-cooked to perfection"
    },
    {
      image: "/images/menu.jpg",
      title: "VIRAL SENSATION",
      subtitle: "Christchurch's most talked about tacos"
    },
    {
      image: "/images/qass.jpg",
      title: "CRAFTED WITH LOVE",
      subtitle: "Traditional recipes, modern twist"
    }
  ];

  const features = [
    // Removed "Award Winning / Best Birria in Christchurch"
    {
      icon: <TrendingUp />,
      title: "Viral Sensation",
      description: "Social media's favorite tacos",
      color: "#FF1744"
    },
    {
      icon: <Heart />,
      title: "Made with Love",
      description: "Family recipes since day one",
      color: "#FFB4E1"
    },
    {
      icon: <Clock />,
      title: "Fresh Daily",
      description: "Prepared fresh every morning",
      color: "#4CAF50"
    }
  ];

  const bestSellers = [
    {
      name: "3 Birria Tacos",
      price: "$24.00",
      image: "/images/menu.jpg",
      description: "Our signature dish"
    },
    {
      name: "Birria Quesadilla",
      price: "$26.00",
      image: "/images/qass.jpg",
      description: "Customer favorite"
    },
    {
      name: "Birria Ramen",
      price: "$19.00",
      image: "/images/ramen.jpg",
      description: "Unique fusion"
    }
  ];

  return (
    <div className="birria-home">
      {/* Animated Background */}
      <div className="background-effects">
        <div className="floating-element el-1" style={{ transform: `translateY(${scrollY * 0.3}px)` }}>🌮</div>
        <div className="floating-element el-2" style={{ transform: `translateY(${scrollY * 0.5}px)` }}>🌶️</div>
        <div className="floating-element el-3" style={{ transform: `translateY(${scrollY * 0.2}px)` }}>🔥</div>
        <div className="pattern-overlay"></div>
      </div>

      {/* Navigation Bar */}
      <nav className={`navbar ${scrollY > 50 ? 'scrolled' : ''}`}>
        <div className="nav-container">
          <div className="logo" onClick={() => handleNavigation('/home')}>
            <img 
              src="/images/Birria_Boss_favicon_white.PNG" 
              alt="Birria Boss Logo" 
              className="logo-image"
            />
            <span className="logo-text">BIRRIA BOSS</span>
          </div>
          
          <div className={`nav-links ${mobileMenuOpen ? 'mobile-open' : ''}`}>
            <button onClick={() => handleNavigation('/home')} className="nav-link active">HOME</button>
            <button onClick={() => handleNavigation('/menu')} className="nav-link">MENU</button>
            <button onClick={() => handleNavigation('/hours')} className="nav-link">HOURS</button>
            <button onClick={() => handleNavigation('/reviews')} className="nav-link">REVIEWS</button>
            <button 
              onClick={() => handleNavigation('https://www.ubereats.com/nz/store/birria-boss/4xeB2_1fR0WuKM3mFMMbWw', true)} 
              className="nav-link order-btn"
            >
              ORDER NOW
            </button>
          </div>

          <button 
            className="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Hero Section with Slider */}
      <section className="hero-section">
        <div className="hero-slider">
          {heroSlides.map((slide, index) => (
            <div 
              key={index}
              className={`hero-slide ${currentSlide === index ? 'active' : ''}`}
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              <div className="hero-overlay"></div>
              <div className="hero-content">
                <h1 className="hero-title animate-in">{slide.title}</h1>
                <p className="hero-subtitle animate-in-delay">{slide.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="hero-main-content">
          <div className="hero-text">
            <h1 className="main-title">BIRRIA BOSS</h1>
            <p className="main-subtitle">
              CHRISTCHURCH'S<br/>
              VIRAL FOOD<br/>
              DESTINATION
            </p>
            <div className="hero-buttons">
              <button 
                className="cta-primary"
                onClick={() => handleNavigation('https://www.ubereats.com/nz/store/birria-boss/4xeB2_1fR0WuKM3mFMMbWw', true)}
              >
                <ShoppingBag /> Order Now
              </button>
              <button 
                className="cta-secondary"
                onClick={() => handleNavigation('/menu')}
              >
                View Menu <ChevronRight />
              </button>
            </div>
          </div>
        </div>

        <div className="slide-indicators">
          {heroSlides.map((_, index) => (
            <button 
              key={index}
              className={`indicator ${currentSlide === index ? 'active' : ''}`}
              onClick={() => setCurrentSlide(index)}
            />
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <h2 className="section-title">WHY CHOOSE BIRRIA BOSS</h2>
          <div className="features-grid">
            {features.map((feature, index) => (
              <div 
                key={index}
                className={`feature-card ${hoveredFeature === index ? 'hovered' : ''}`}
                onMouseEnter={() => setHoveredFeature(index)}
                onMouseLeave={() => setHoveredFeature(null)}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="feature-icon" style={{ color: feature.color }}>
                  {feature.icon}
                </div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Best Sellers Section */}
      <section className="bestsellers-section">
        <div className="container">
          <h2 className="section-title">CUSTOMER FAVORITES</h2>
          <div className="bestsellers-grid">
            {bestSellers.map((item, index) => (
              <div 
                key={index}
                className="bestseller-card"
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <div className="bestseller-image">
                  <img src={item.image} alt={item.name} />
                  <div className="image-overlay"></div>
                </div>
                <div className="bestseller-info">
                  <h3>{item.name}</h3>
                  <p>{item.description}</p>
                  <div className="price-order">
                    <span className="price">{item.price}</span>
                    <button 
                      className="order-item-btn"
                      onClick={() => handleNavigation('https://www.ubereats.com/nz/store/birria-boss/4xeB2_1fR0WuKM3mFMMbWw', true)}
                    >
                      Order
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button 
            className="view-menu-btn"
            onClick={() => handleNavigation('/menu')}
          >
            View Full Menu <ChevronRight />
          </button>
        </div>
      </section>

      {/* Story Section */}
      <section className="story-section">
        <div className="container">
          <div className="story-content">
            <div className="story-text">
              <h2>OUR STORY</h2>
              <p>
                Born from a passion for authentic Mexican flavors, Birria Boss brings 
                the traditional art of birria-making to Christchurch. Our secret family 
                recipes, slow-cooked meats, and handmade tortillas have made us the 
                city's most viral food destination.
              </p>
              <p>
                Every taco tells a story of tradition, innovation, and the pursuit of 
                the perfect bite. Join our birria family and taste the difference that 
                passion makes.
              </p>
              <div className="story-stats">
                <div className="stat">
                  <h3>10K+</h3>
                  <p>Tacos Served</p>
                </div>
                <div className="stat">
                  <h3>4.6★</h3>
                  <p>Google Rating</p>
                </div>
                <div className="stat">
                  <h3>Since 2024</h3>
                  <p>Serving Christchurch</p>
                </div>
              </div>
            </div>
            <div className="story-image">
              <img src="/images/birriabosshome.png" alt="Our Story" />
              <div className="image-decoration"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Location & Hours Preview */}
      <section className="location-hours-section">
        <div className="container">
          <div className="location-hours-grid">
            <div className="location-card">
              <h3><MapPin /> Find Us</h3>
              <p>The Colombo Christchurch</p>
              <p>363 Colombo Street, Sydenham</p>
              <p>Christchurch 8011</p>
              <button 
                className="direction-btn"
                onClick={() => window.open('https://www.google.com/maps/search/?api=1&query=363+Colombo+Street+Sydenham+Christchurch+8011', '_blank')}
              >
                Get Directions
              </button>
            </div>
            <div className="hours-card">
              <h3><Clock /> Opening Hours</h3>
              <div className="hours-preview">
                <p><strong>In-Store:</strong> 9:00 AM - 5:00 PM Daily</p>
                <p><strong>Uber Eats:</strong> 5:00 PM - 10:00 PM Daily</p>
              </div>
              <button 
                className="hours-btn"
                onClick={() => handleNavigation('/hours')}
              >
                View Full Hours
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Social Media Section */}
      <section className="social-section">
        <div className="container">
          <h2 className="section-title">FOLLOW THE BIRRIA JOURNEY</h2>
          <p className="social-subtitle">Join our community and stay updated with the latest!</p>
          <div className="social-buttons">
            <button 
              className="social-btn instagram"
              onClick={() => handleNavigation('https://www.instagram.com/birriabossnz/', true)}
            >
              <Instagram /> @birriabossnz
            </button>
            <button 
              className="social-btn facebook"
              onClick={() => handleNavigation('https://www.facebook.com/people/Birria-Boss-NZ/61559106840820/?_rdr', true)}
            >
              <Facebook /> Birria Boss NZ
            </button>
            {/* NEW: TikTok */}
            <button
  className="social-btn tiktok"
  onClick={() => handleNavigation('https://www.tiktok.com/@birriabossnz', true)}
>
  <TikTokIcon /> TikTok
</button>

          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="final-cta">
        <div className="container">
          <h2>READY TO BOSS UP YOUR BITE?</h2>
          <p>Order now and taste why we're Christchurch's viral food sensation!</p>
          <button 
            className="big-order-btn"
            onClick={() => handleNavigation('https://www.ubereats.com/nz/store/birria-boss/4xeB2_1fR0WuKM3mFMMbWw', true)}
          >
            ORDER ON UBER EATS
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-logo">
              <img src="/images/Birria_Boss_favicon_white.PNG" alt="Birria Boss" />
              <p>&copy; 2025 Birria Boss. All rights reserved.</p>
            </div>
            <div className="footer-links">
              <button onClick={() => handleNavigation('/menu')}>Menu</button>
              <button onClick={() => handleNavigation('/hours')}>Hours</button>
              <button onClick={() => handleNavigation('/reviews')}>Reviews</button>
              {/* 'Call Us' removed */}
            </div>
          </div>
        </div>
      </footer>

      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .birria-home {
          min-height: 100vh;
          background-color: #DB0B00;
          font-family: 'Open Sans', Arial, sans-serif;
          overflow-x: hidden;
          position: relative;
        }

        /* Background Effects */
        .background-effects {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          pointer-events: none;
          z-index: 1;
        }

        .floating-element {
          position: absolute;
          font-size: 4rem;
          opacity: 0.1;
          animation: float 20s ease-in-out infinite;
        }

        .el-1 { top: 20%; left: 10%; animation-duration: 25s; }
        .el-2 { top: 60%; right: 15%; animation-duration: 30s; animation-delay: 5s; }
        .el-3 { bottom: 30%; left: 50%; animation-duration: 22s; animation-delay: 10s; }

        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          25% { transform: translateY(-30px) rotate(10deg); }
          50% { transform: translateY(0) rotate(-5deg); }
          75% { transform: translateY(30px) rotate(5deg); }
        }

        .pattern-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="home-pattern" x="0" y="0" width="30" height="30" patternUnits="userSpaceOnUse"><circle cx="15" cy="15" r="10" fill="none" stroke="white" stroke-width="0.5" opacity="0.05"/></pattern></defs><rect width="100" height="100" fill="url(%23home-pattern)"/></svg>') repeat;
        }

        /* Navigation */
        .navbar {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          background: rgba(219, 11, 0, 0.95);
          backdrop-filter: blur(10px);
          padding: 1rem 0;
          z-index: 1000;
          transition: all 0.3s ease;
        }

        .navbar.scrolled {
          padding: 0.5rem 0;
          box-shadow: 0 5px 20px rgba(0,0,0,0.3);
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
          gap: 1rem;
          cursor: pointer;
        }

        .logo-image {
          height: 50px;
          transition: all 0.3s ease;
        }

        .navbar.scrolled .logo-image {
          height: 40px;
        }

        .logo-text {
          font-family: 'Bukhari Script', cursive;
          font-size: 1.5rem;
          color: #F0F2E4;
          font-weight: 700;
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
          position: relative;
        }

        .nav-link::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          right: 0;
          height: 2px;
          background: #FFD9F0;
          transform: scaleX(0);
          transition: transform 0.3s ease;
        }

        .nav-link:hover::after,
        .nav-link.active::after {
          transform: scaleX(1);
        }

        .nav-link:hover {
          color: #FFD9F0;
        }

        .nav-link.active {
          color: #FFD9F0;
        }

        .nav-link.order-btn {
          background: linear-gradient(45deg, #FFD700, #FFA000);
          color: #000;
          padding: 0.5rem 1.5rem;
          border-radius: 25px;
          font-weight: 700;
        }

        .nav-link.order-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(255,215,0,0.4);
        }

        .mobile-menu-toggle {
          display: none;
          background: none;
          border: none;
          color: #F0F2E4;
          font-size: 1.5rem;
          cursor: pointer;
          /* Ensure it sits above hero/overlays on small screens */
          z-index: 1100;
        }

        /* Hero Section */
        .hero-section {
          position: relative;
          height: 100vh;
          overflow: hidden;
          margin-top: 0;
        }

        .hero-slider {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
        }

        .hero-slide {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-size: cover;
          background-position: center;
          opacity: 0;
          transition: opacity 1.5s ease;
        }

        .hero-slide.active {
          opacity: 1;
        }

        .hero-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(180deg, rgba(219,11,0,0.8) 0%, rgba(179,10,0,0.9) 100%);
        }

        .hero-main-content {
          position: relative;
          z-index: 10;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
        }

        .main-title {
          font-family: 'Bukhari Script', cursive;
          font-size: clamp(4rem, 10vw, 8rem);
          color: #F0F2E4;
          margin-bottom: 1rem;
          text-shadow: 4px 4px 8px rgba(0,0,0,0.5);
          letter-spacing: 3px;
          animation: slideIn 1s ease-out;
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(50px);
          }
          to {
            opacity: 1);
            transform: translateY(0);
          }
        }

        .main-subtitle {
          font-size: clamp(1.5rem, 3vw, 2.5rem);
          color: #FFD9F0;
          font-weight: 700;
          line-height: 1.3;
          margin-bottom: 3rem;
          animation: slideIn 1s ease-out 0.3s backwards;
        }

        .hero-buttons {
          display: flex;
          gap: 1.5rem;
          justify-content: center;
          flex-wrap: wrap;
          animation: slideIn 1s ease-out 0.6s backwards;
        }

        .cta-primary, .cta-secondary {
          padding: 18px 40px;
          border: none;
          border-radius: 50px;
          font-size: 1.1rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.4s ease;
          text-transform: uppercase;
          letter-spacing: 1px;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
        }

        .cta-primary {
          background: linear-gradient(45deg, #FFD700, #FFA000);
          color: #000;
          box-shadow: 0 10px 30px rgba(255,215,0,0.4);
        }

        .cta-primary:hover {
          transform: translateY(-3px);
          box-shadow: 0 15px 40px rgba(255,215,0,0.5);
        }

        .cta-secondary {
          background: transparent;
          color: #F0F2E4;
          border: 3px solid #F0F2E4;
        }

        .cta-secondary:hover {
          background: #F0F2E4;
          color: #DB0B00;
        }

        .slide-indicators {
          position: absolute;
          bottom: 30px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          gap: 1rem;
          z-index: 10;
        }

        .indicator {
          width: 50px;
          height: 4px;
          background: rgba(240,242,228,0.3);
          border: none;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .indicator.active {
          background: #FFD9F0;
          transform: scaleX(1.5);
        }

        /* Container */
        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 2rem;
        }

        /* Section Title */
        .section-title {
          font-family: 'Bukhari Script', cursive;
          font-size: clamp(2.5rem, 5vw, 4rem);
          text-align: center;
          margin-bottom: 3rem;
          color: #F0F2E4;
        }

        /* Features Section */
        .features-section {
          padding: 5rem 0;
          position: relative;
          z-index: 2;
        }

        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 2rem;
        }

        .feature-card {
          background: rgba(240,242,228,0.95);
          border-radius: 20px;
          padding: 2.5rem;
          text-align: center;
          transition: all 0.4s ease;
          cursor: pointer;
          animation: fadeUp 0.8s ease-out forwards;
          opacity: 0;
          transform: translateY(30px);
        }

        @keyframes fadeUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .feature-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 20px 40px rgba(0,0,0,0.3);
        }

        .feature-icon {
          margin-bottom: 1.5rem;
        }

        .feature-icon svg {
          width: 60px;
          height: 60px;
          transition: transform 0.3s ease;
        }

        .feature-card:hover .feature-icon svg {
          transform: scale(1.2) rotate(5deg);
        }

        .feature-card h3 {
          font-size: 1.5rem;
          color: #DB0B00;
          margin-bottom: 1rem;
        }

        .feature-card p {
          color: #666;
          line-height: 1.6;
        }

        /* Best Sellers Section */
        .bestsellers-section {
          background: linear-gradient(135deg, #FFB4E1, #FFD9F0);
          padding: 5rem 0;
          position: relative;
          z-index: 2;
        }

        .bestsellers-section .section-title {
          color: #DB0B00;
        }

        .bestsellers-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
          margin-bottom: 3rem;
        }

        .bestseller-card {
          background: white;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 10px 30px rgba(0,0,0,0.2);
          transition: all 0.4s ease;
          animation: fadeUp 0.8s ease-out forwards;
          opacity: 0;
          transform: translateY(30px);
        }

        .bestseller-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 20px 40px rgba(0,0,0,0.3);
        }

        .bestseller-image {
          position: relative;
          height: 250px;
          overflow: hidden;
        }

        .bestseller-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s ease;
        }

        .bestseller-card:hover .bestseller-image img {
          transform: scale(1.1);
        }

        .image-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.3) 100%);
          opacity: 0;
          transition: opacity 0.4s ease;
        }

        .bestseller-card:hover .image-overlay {
          opacity: 1;
        }

        .bestseller-info {
          padding: 2rem;
        }

        .bestseller-info h3 {
          font-family: 'Bukhari Script', cursive;
          font-size: 1.8rem;
          color: #DB0B00;
          margin-bottom: 0.5rem;
        }

        .bestseller-info p {
          color: #666;
          margin-bottom: 1.5rem;
        }

        .price-order {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .price {
          font-size: 1.5rem;
          font-weight: 800;
          color: #DB0B00;
        }

        .order-item-btn {
          background: linear-gradient(45deg, #DB0B00, #FF1744);
          color: white;
          border: none;
          padding: 10px 25px;
          border-radius: 25px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .order-item-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(219,11,0,0.4);
        }

        .view-menu-btn {
          background: #DB0B00;
          color: #F0F2E4;
          border: none;
          padding: 15px 40px;
          border-radius: 50px;
          font-size: 1.1rem;
          font-weight: 700;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin: 0 auto;
          transition: all 0.3s ease;
        }

        .view-menu-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 25px rgba(219,11,0,0.4);
        }

        /* Story Section */
        .story-section {
          padding: 5rem 0;
          background: #DB0B00;
          position: relative;
          z-index: 2;
        }

        .story-content {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          align-items: center;
        }

        .story-text h2 {
          font-family: 'Bukhari Script', cursive;
          font-size: 3rem;
          color: #F0F2E4;
          margin-bottom: 2rem;
        }

        .story-text p {
          color: #FFD9F0;
          font-size: 1.1rem;
          line-height: 1.8;
          margin-bottom: 1.5rem;
        }

        .story-stats {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2rem;
          margin-top: 3rem;
        }

        .stat {
          text-align: center;
        }

        .stat h3 {
          font-size: 2.5rem;
          color: #FFD700;
          margin-bottom: 0.5rem;
        }

        .stat p {
          color: #F0F2E4;
          font-size: 0.9rem;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .story-image {
          position: relative;
        }

        .story-image img {
          width: 100%;
          border-radius: 20px;
          box-shadow: 0 20px 60px rgba(0,0,0,0.3);
        }

        .image-decoration {
          position: absolute;
          top: -20px;
          right: -20px;
          width: 100%;
          height: 100%;
          border: 3px solid #FFD9F0;
          border-radius: 20px;
          z-index: -1;
        }

        /* Location & Hours Section */
        .location-hours-section {
          background: linear-gradient(135deg, #F0F2E4, #FFD9F0);
          padding: 5rem 0;
          position: relative;
          z-index: 2;
        }

        .location-hours-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 3rem;
        }

        .location-card, .hours-card {
          background: white;
          border-radius: 20px;
          padding: 3rem;
          text-align: center;
          box-shadow: 0 10px 30px rgba(0,0,0,0.1);
          transition: all 0.3s ease;
        }

        .location-card:hover, .hours-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 15px 40px rgba(0,0,0,0.2);
        }

        .location-card h3, .hours-card h3 {
          font-size: 1.8rem;
          color: #DB0B00;
          margin-bottom: 1.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
        }

        .location-card p, .hours-card p {
          color: #666;
          margin-bottom: 0.5rem;
          line-height: 1.6;
        }

        .hours-preview {
          margin: 1.5rem 0;
        }

        .direction-btn, .hours-btn {
          background: linear-gradient(45deg, #DB0B00, #FF1744);
          color: white;
          border: none;
          padding: 12px 30px;
          border-radius: 25px;
          font-weight: 600;
          cursor: pointer;
          margin-top: 1.5rem;
          transition: all 0.3s ease;
        }

        .direction-btn:hover, .hours-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(219,11,0,0.4);
        }

        /* Social Section */
        .social-section {
          padding: 5rem 0;
          background: #DB0B00;
          text-align: center;
          position: relative;
          z-index: 2;
        }

        .social-subtitle {
          color: #FFD9F0;
          font-size: 1.2rem;
          margin-bottom: 2rem;
        }

        .social-buttons {
          display: flex;
          gap: 2rem;
          justify-content: center;
          flex-wrap: wrap;
        }

        .social-btn {
          background: rgba(255,255,255,0.1);
          color: #F0F2E4;
          border: 2px solid #F0F2E4;
          padding: 15px 30px;
          border-radius: 50px;
          font-size: 1.1rem;
          font-weight: 600;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          transition: all 0.3s ease;
        }

        .social-btn:hover {
          background: #F0F2E4;
          color: #DB0B00;
          transform: translateY(-2px);
        }

        .social-btn.instagram:hover {
          background: linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888);
          color: white;
          border-color: transparent;
        }

        .social-btn.facebook:hover {
          background: #1877f2;
          color: white;
          border-color: #1877f2;
        }

        /* NEW: TikTok hover */
  .social-btn.tiktok:hover {
  background: #000;
  color: #fff;
  border-color: #000;
}


        /* Final CTA */
        .final-cta {
          background: linear-gradient(135deg, #FFB4E1, #FFD9F0);
          padding: 5rem 0;
          text-align: center;
          position: relative;
          z-index: 2;
        }

        .final-cta h2 {
          font-family: 'Bukhari Script', cursive;
          font-size: 3.5rem;
          color: #DB0B00;
          margin-bottom: 1rem;
        }

        .final-cta p {
          font-size: 1.3rem;
          color: #666;
          margin-bottom: 2rem;
        }

        .big-order-btn {
          background: #DB0B00;
          color: #F0F2E4;
          border: none;
          padding: 20px 50px;
          border-radius: 50px;
          font-size: 1.3rem;
          font-weight: 700;
          cursor: pointer;
          text-transform: uppercase;
          letter-spacing: 2px;
          transition: all 0.4s ease;
          box-shadow: 0 10px 30px rgba(219,11,0,0.4);
          position: relative;
          overflow: hidden;
        }

        .big-order-btn::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
          transition: left 0.5s ease;
        }

        .big-order-btn:hover::before {
          left: 100%;
        }

        .big-order-btn:hover {
          transform: translateY(-3px);
          box-shadow: 0 15px 40px rgba(219,11,0,0.5);
        }

        /* Footer */
        .footer {
          background: #0a0a0a;
          padding: 3rem 0;
          position: relative;
          z-index: 2;
        }

        .footer-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 2rem;
        }

        .footer-logo img {
          height: 60px;
          margin-bottom: 1rem;
        }

        .footer-logo p {
          color: #666;
          font-size: 0.9rem;
        }

        .footer-links {
          display: flex;
          gap: 2rem;
          flex-wrap: wrap;
        }

        .footer-links button {
          background: none;
          border: none;
          color: #F0F2E4;
          font-size: 0.9rem;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .footer-links button:hover {
          color: #FFD9F0;
        }

        /* Mobile Responsive */
        @media (max-width: 768px) {
          .mobile-menu-toggle {
            display: block; /* show burger on small screens */
          }

          .nav-links {
            position: fixed;
            top: 70px;
            left: 0;
            right: 0;
            background: #DB0B00;
            flex-direction: column;
            padding: 2rem;
            transform: translateY(-100%);
            transition: transform 0.3s ease;
            box-shadow: 0 5px 20px rgba(0,0,0,0.3);
            z-index: 1000; /* sits under the toggle but above content */
          }

          .nav-links.mobile-open {
            transform: translateY(0);
          }

          .logo-text {
            display: none;
          }

          .main-title {
            font-size: 4rem;
          }

          .main-subtitle {
            font-size: 1.5rem;
          }

          .hero-buttons {
            flex-direction: column;
            align-items: center;
          }

          .cta-primary, .cta-secondary {
            width: 100%;
            max-width: 300px;
          }

          .features-grid {
            grid-template-columns: 1fr;
          }

          .story-content {
            grid-template-columns: 1fr;
            gap: 2rem;
          }

          .story-image {
            order: -1;
          }

          .story-stats {
            grid-template-columns: 1fr;
            gap: 1rem;
          }

          .location-hours-grid {
            grid-template-columns: 1fr;
          }

          .footer-content {
            flex-direction: column;
            text-align: center;
          }

          .footer-links {
            justify-content: center;
          }
        }

        @media (max-width: 480px) {
          .section-title {
            font-size: 2.5rem;
          }

          .floating-element {
            font-size: 3rem;
          }

          .main-title {
            font-size: 3rem;
          }

          .main-subtitle {
            font-size: 1.2rem;
          }

          .bestsellers-grid {
            grid-template-columns: 1fr;
          }

          .social-buttons {
            flex-direction: column;
            align-items: center;
          }

          .social-btn {
            width: 100%;
            max-width: 300px;
            justify-content: center;
          }
        }
      `}</style>
    </div>
  );
};

export default BrriaBossHome;
