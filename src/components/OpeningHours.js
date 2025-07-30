import React, { useState, useEffect } from 'react';
import { Clock, MapPin, Navigation, Phone, ShoppingBag, Store, ChevronRight, Sparkles } from 'lucide-react';

const OpeningHours = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isStoreOpen, setIsStoreOpen] = useState(false);
  const [isUberOpen, setIsUberOpen] = useState(false);
  const [currentDay, setCurrentDay] = useState('');
  const [timeUntilChange, setTimeUntilChange] = useState('');
  const [hoveredDay, setHoveredDay] = useState(null);
  const [showUberAnimation, setShowUberAnimation] = useState(false);

  const storeHours = {
    Sunday: { open: '9:00 AM', close: '4:45 PM' },
    Monday: { open: '9:00 AM', close: '4:45 PM' },
    Tuesday: { open: '9:00 AM', close: '4:45 PM' },
    Wednesday: { open: '9:00 AM', close: '4:45 PM' },
    Thursday: { open: '9:00 AM', close: '4:45 PM' },
    Friday: { open: '9:00 AM', close: '4:45 PM' },
    Saturday: { open: '9:00 AM', close: '4:45 PM' }
  };

  const uberEatsHours = {
    open: '5:00 PM',
    close: '10:00 PM'
  };

  const parseTime = (timeStr) => {
    const [time, period] = timeStr.split(' ');
    let [hours, minutes] = time.split(':').map(Number);
    if (period === 'PM' && hours !== 12) hours += 12;
    if (period === 'AM' && hours === 12) hours = 0;
    return hours + minutes / 60;
  };

  const checkIfOpen = () => {
    const now = new Date();
    const dayName = now.toLocaleDateString('en-NZ', { weekday: 'long' });
    const currentTimeVal = now.getHours() + now.getMinutes() / 60;
    
    setCurrentDay(dayName);

    // Check store hours
    const todayHours = storeHours[dayName];
    const storeOpenTime = parseTime(todayHours.open);
    const storeCloseTime = parseTime(todayHours.close);
    const storeOpen = currentTimeVal >= storeOpenTime && currentTimeVal < storeCloseTime;
    setIsStoreOpen(storeOpen);

    // Check Uber Eats hours (5 PM - 10 PM every day)
    const uberOpenTime = parseTime(uberEatsHours.open);
    const uberCloseTime = parseTime(uberEatsHours.close);
    const uberOpen = currentTimeVal >= uberOpenTime && currentTimeVal < uberCloseTime;
    setIsUberOpen(uberOpen);

    // Calculate time until next change
    let nextChangeTime;
    let changeMessage;

    if (storeOpen) {
      const closeTime = new Date(now);
      const [h, m] = todayHours.close.split(':')[0].split(' ')[0].split(':').map(Number);
      closeTime.setHours(storeCloseTime < 12 ? h + 12 : h, m, 0);
      nextChangeTime = closeTime;
      changeMessage = 'Store closes in';
    } else if (uberOpen) {
      const closeTime = new Date(now);
      closeTime.setHours(22, 0, 0); // 10 PM
      nextChangeTime = closeTime;
      changeMessage = 'Uber Eats closes in';
    } else {
      // Find next opening
      const tomorrow = new Date(now);
      tomorrow.setDate(tomorrow.getDate() + 1);
      tomorrow.setHours(9, 0, 0); // 9 AM tomorrow
      
      if (currentTimeVal < storeOpenTime) {
        const openTime = new Date(now);
        openTime.setHours(9, 0, 0);
        nextChangeTime = openTime;
      } else if (currentTimeVal < uberOpenTime) {
        const openTime = new Date(now);
        openTime.setHours(17, 0, 0); // 5 PM
        nextChangeTime = openTime;
        changeMessage = 'Uber Eats opens in';
      } else {
        nextChangeTime = tomorrow;
      }
      changeMessage = changeMessage || 'Store opens in';
    }

    const timeDiff = nextChangeTime - now;
    const hours = Math.floor(timeDiff / (1000 * 60 * 60));
    const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);
    
    setTimeUntilChange(`${changeMessage}: ${hours}h ${minutes}m ${seconds}s`);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
      checkIfOpen();
    }, 1000);

    // Trigger Uber animation periodically
    const animTimer = setInterval(() => {
      setShowUberAnimation(true);
      setTimeout(() => setShowUberAnimation(false), 3000);
    }, 10000);

    return () => {
      clearInterval(timer);
      clearInterval(animTimer);
    };
  }, []);

  return (
    <div className="hours-container">
      {/* Animated Background */}
      <div className="background-elements">
        <div className="floating-icon icon-1">⏰</div>
        <div className="floating-icon icon-2">🌮</div>
        <div className="floating-icon icon-3">📍</div>
        <div className="floating-icon icon-4">🛵</div>
        <div className="pattern-bg"></div>
      </div>

      {/* Header */}
      <header className="hours-header">
        <img src="/images/Birria_Boss_favicon_white.PNG" alt="Birria Boss" className="header-logo" />
        <h1 className="main-title">OPENING HOURS</h1>
        <p className="subtitle">FIND OUT WHEN WE'RE SERVING OUR LEGENDARY BIRRIA</p>
      </header>

      {/* Live Status Cards */}
      <div className="status-section">
        <div className={`status-card store-status ${isStoreOpen ? 'open' : 'closed'}`}>
          <div className="status-icon">
            <Store size={40} />
          </div>
          <h3>In-Store Dining</h3>
          <div className="status-indicator">
            <span className="status-dot"></span>
            {isStoreOpen ? 'OPEN NOW' : 'CLOSED'}
          </div>
          <p className="status-hours">9:00 AM - 4:45 PM Daily</p>
        </div>

        <div className={`status-card uber-status ${isUberOpen ? 'open' : 'closed'} ${showUberAnimation ? 'pulse' : ''}`}>
          <div className="status-icon">
            <ShoppingBag size={40} />
          </div>
          <h3>Uber Eats Delivery</h3>
          <div className="status-indicator">
            <span className="status-dot"></span>
            {isUberOpen ? 'AVAILABLE NOW' : 'NOT AVAILABLE'}
          </div>
          <p className="status-hours">5:00 PM - 10:00 PM Daily</p>
          {isUberOpen && (
            <button 
              className="uber-order-btn"
              onClick={() => window.open('https://www.ubereats.com/nz/store/birria-boss/4xeB2_1fR0WuKM3mFMMbWw', '_blank')}
            >
              Order Now <ChevronRight size={18} />
            </button>
          )}
        </div>
      </div>

      {/* Countdown Timer */}
      <div className="countdown-section">
        <Clock className="countdown-icon" />
        <p className="countdown-text">{timeUntilChange}</p>
      </div>

      {/* Weekly Schedule */}
      <div className="schedule-section">
        <h2 className="section-title">
          <Sparkles className="title-icon" />
          Weekly Schedule
        </h2>
        
        <div className="schedule-grid">
          {Object.entries(storeHours).map(([day, hours]) => (
            <div 
              key={day}
              className={`day-card ${currentDay === day ? 'today' : ''} ${hoveredDay === day ? 'hovered' : ''}`}
              onMouseEnter={() => setHoveredDay(day)}
              onMouseLeave={() => setHoveredDay(null)}
            >
              <h4 className="day-name">{day}</h4>
              {currentDay === day && <span className="today-badge">TODAY</span>}
              
              <div className="hours-info">
                <div className="store-hours">
                  <Store size={16} />
                  <span>{hours.open} - {hours.close}</span>
                </div>
                <div className="uber-hours">
                  <ShoppingBag size={16} />
                  <span>{uberEatsHours.open} - {uberEatsHours.close}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="hours-note">
          <p>🏪 <strong>In-Store:</strong> Enjoy our full menu at our location</p>
          <p>🛵 <strong>Uber Eats:</strong> Limited delivery menu available evenings</p>
        </div>
      </div>

      {/* Location Section */}
      <div className="location-section">
        <h2 className="section-title">
          <MapPin className="title-icon" />
          Find Us
        </h2>
        
        <div className="location-card">
          <div className="location-info">
            <h3>The Colombo Christchurch</h3>
            <p className="address">363 Colombo Street, Sydenham</p>
            <p className="city">Christchurch 8011</p>
            
            <div className="contact-info">
              <Phone size={18} />
              <span>Call for reservations</span>
            </div>
          </div>
          
          <div className="map-container">
            <div className="map-placeholder">
              <MapPin size={60} className="map-icon" />
              <p>Interactive Map</p>
            </div>
            
            <button 
              className="directions-btn"
              onClick={() => window.open('https://www.google.com/maps/search/?api=1&query=363+Colombo+Street+Sydenham+Christchurch+8011', '_blank')}
            >
              <Navigation size={20} />
              Get Directions
            </button>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="cta-section">
        <h2>HUNGRY NOW?</h2>
        <p>Check if we're open and order your favorite birria!</p>
        <div className="cta-buttons">
          <button 
            className="cta-btn primary"
            onClick={() => window.open('https://www.ubereats.com/nz/store/birria-boss/4xeB2_1fR0WuKM3mFMMbWw', '_blank')}
          >
            Order on Uber Eats
          </button>
          <button 
            className="cta-btn secondary"
            onClick={() => window.open('tel:+64123456789', '_blank')}
          >
            Call Us
          </button>
        </div>
      </div>

      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .hours-container {
          min-height: 100vh;
          background-color: #DB0B00;
          font-family: 'Open Sans', Arial, sans-serif;
          color: #F0F2E4;
          position: relative;
          overflow-x: hidden;
        }

        /* Background Elements */
        .background-elements {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          pointer-events: none;
          z-index: 1;
        }

        .floating-icon {
          position: absolute;
          font-size: 3rem;
          opacity: 0.15;
          animation: float 25s ease-in-out infinite;
        }

        .icon-1 { top: 15%; left: 10%; animation-duration: 20s; }
        .icon-2 { top: 45%; right: 15%; animation-duration: 25s; animation-delay: 5s; }
        .icon-3 { bottom: 25%; left: 20%; animation-duration: 22s; animation-delay: 10s; }
        .icon-4 { top: 70%; right: 25%; animation-duration: 28s; animation-delay: 15s; }

        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          25% { transform: translateY(-20px) rotate(10deg); }
          50% { transform: translateY(0) rotate(-5deg); }
          75% { transform: translateY(20px) rotate(5deg); }
        }

        .pattern-bg {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="time-pattern" x="0" y="0" width="30" height="30" patternUnits="userSpaceOnUse"><circle cx="15" cy="15" r="8" fill="none" stroke="white" stroke-width="0.5" opacity="0.05"/></pattern></defs><rect width="100" height="100" fill="url(%23time-pattern)"/></svg>') repeat;
        }

        /* Header */
        .hours-header {
          text-align: center;
          padding: 4rem 2rem;
          position: relative;
          z-index: 2;
          background: linear-gradient(180deg, rgba(219,11,0,1) 0%, rgba(179,10,0,1) 100%);
        }

        .header-logo {
          width: 100px;
          height: 100px;
          margin-bottom: 2rem;
          animation: logoRotate 20s linear infinite;
        }

        @keyframes logoRotate {
          0% { transform: rotate(0deg) scale(1); }
          50% { transform: rotate(180deg) scale(1.1); }
          100% { transform: rotate(360deg) scale(1); }
        }

        .main-title {
          font-family: 'Bukhari Script', cursive;
          font-size: clamp(3rem, 8vw, 5rem);
          margin-bottom: 1rem;
          text-shadow: 3px 3px 6px rgba(0,0,0,0.3);
          letter-spacing: 3px;
        }

        .subtitle {
          font-size: 1.2rem;
          color: #FFD9F0;
          font-weight: 600;
          letter-spacing: 1px;
        }

        /* Status Section */
        .status-section {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
          max-width: 800px;
          margin: -50px auto 3rem;
          padding: 0 2rem;
          position: relative;
          z-index: 3;
        }

        .status-card {
          background: #F0F2E4;
          color: #333;
          border-radius: 20px;
          padding: 2.5rem;
          text-align: center;
          box-shadow: 0 10px 30px rgba(0,0,0,0.2);
          transition: all 0.4s ease;
          position: relative;
          overflow: hidden;
        }

        .status-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 5px;
          background: linear-gradient(90deg, #FFB4E1, #FFD9F0);
          transition: height 0.3s ease;
        }

        .status-card:hover::before {
          height: 10px;
        }

        .status-card.open::before {
          background: linear-gradient(90deg, #4CAF50, #81C784);
        }

        .status-card.closed::before {
          background: linear-gradient(90deg, #DB0B00, #FF1744);
        }

        .status-icon {
          margin-bottom: 1rem;
          color: #DB0B00;
        }

        .status-card h3 {
          font-size: 1.5rem;
          margin-bottom: 1rem;
          color: #DB0B00;
        }

        .status-indicator {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          font-size: 1.2rem;
          font-weight: 700;
          margin-bottom: 1rem;
        }

        .status-dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          animation: blink 2s ease-in-out infinite;
        }

        .open .status-dot {
          background: #4CAF50;
          box-shadow: 0 0 10px #4CAF50;
        }

        .closed .status-dot {
          background: #DB0B00;
          box-shadow: 0 0 10px #DB0B00;
        }

        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }

        .status-hours {
          color: #666;
          font-size: 0.9rem;
        }

        .uber-order-btn {
          background: linear-gradient(45deg, #4CAF50, #81C784);
          color: white;
          border: none;
          padding: 12px 24px;
          border-radius: 25px;
          font-weight: 600;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          margin-top: 1rem;
          transition: all 0.3s ease;
        }

        .uber-order-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(76,175,80,0.4);
        }

        .uber-status.pulse {
          animation: pulse 0.5s ease-in-out;
        }

        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }

        /* Countdown Section */
        .countdown-section {
          text-align: center;
          padding: 2rem;
          margin-bottom: 3rem;
          position: relative;
          z-index: 2;
        }

        .countdown-icon {
          width: 40px;
          height: 40px;
          margin-bottom: 1rem;
          color: #FFD9F0;
        }

        .countdown-text {
          font-size: 1.8rem;
          font-weight: 700;
          color: #F0F2E4;
          text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
        }

        /* Schedule Section */
        .schedule-section {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 2rem 4rem;
          position: relative;
          z-index: 2;
        }

        .section-title {
          font-family: 'Bukhari Script', cursive;
          font-size: 3rem;
          text-align: center;
          margin-bottom: 3rem;
          color: #F0F2E4;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1rem;
        }

        .title-icon {
          width: 40px;
          height: 40px;
          color: #FFD9F0;
        }

        .schedule-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1.5rem;
          margin-bottom: 2rem;
        }

        .day-card {
          background: rgba(240,242,228,0.95);
          color: #333;
          border-radius: 20px;
          padding: 1.5rem;
          text-align: center;
          transition: all 0.3s ease;
          position: relative;
          cursor: pointer;
          border: 3px solid transparent;
        }

        .day-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 30px rgba(0,0,0,0.3);
          border-color: #FFB4E1;
        }

        .day-card.today {
          background: linear-gradient(135deg, #FFD9F0, #FFB4E1);
          border-color: #EDBE4C;
        }

        .day-name {
          font-size: 1.3rem;
          font-weight: 700;
          color: #DB0B00;
          margin-bottom: 0.5rem;
        }

        .today-badge {
          position: absolute;
          top: -10px;
          right: -10px;
          background: #EDBE4C;
          color: #DB0B00;
          padding: 5px 15px;
          border-radius: 20px;
          font-size: 0.8rem;
          font-weight: 700;
          transform: rotate(15deg);
          box-shadow: 0 3px 10px rgba(0,0,0,0.2);
        }

        .hours-info {
          margin-top: 1rem;
        }

        .store-hours, .uber-hours {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          margin: 0.5rem 0;
          font-size: 0.9rem;
        }

        .store-hours {
          color: #333;
          font-weight: 600;
        }

        .uber-hours {
          color: #666;
        }

        .hours-note {
          background: rgba(255,255,255,0.1);
          border-radius: 15px;
          padding: 1.5rem;
          margin-top: 2rem;
        }

        .hours-note p {
          margin: 0.5rem 0;
          font-size: 1rem;
        }

        /* Location Section */
        .location-section {
          background: linear-gradient(135deg, #FFB4E1, #FFD9F0);
          padding: 4rem 2rem;
          position: relative;
          z-index: 2;
        }

        .location-section .section-title {
          color: #DB0B00;
        }

        .location-card {
          background: white;
          border-radius: 30px;
          padding: 3rem;
          max-width: 800px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 3rem;
          box-shadow: 0 15px 40px rgba(0,0,0,0.2);
        }

        .location-info h3 {
          font-family: 'Bukhari Script', cursive;
          font-size: 2rem;
          color: #DB0B00;
          margin-bottom: 1rem;
        }

        .address {
          font-size: 1.2rem;
          color: #333;
          margin-bottom: 0.5rem;
        }

        .city {
          font-size: 1.1rem;
          color: #666;
          margin-bottom: 2rem;
        }

        .contact-info {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: #DB0B00;
          font-weight: 600;
        }

        .map-container {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .map-placeholder {
          background: linear-gradient(135deg, #F0F2E4, #FFD9F0);
          border-radius: 20px;
          height: 200px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          border: 2px dashed #DB0B00;
        }

        .map-icon {
          color: #DB0B00;
          margin-bottom: 1rem;
        }

        .directions-btn {
          background: linear-gradient(45deg, #DB0B00, #FF1744);
          color: white;
          border: none;
          padding: 15px 30px;
          border-radius: 30px;
          font-size: 1.1rem;
          font-weight: 700;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          transition: all 0.3s ease;
        }

        .directions-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 25px rgba(219,11,0,0.4);
        }

        /* CTA Section */
        .cta-section {
          background: #DB0B00;
          padding: 5rem 2rem;
          text-align: center;
          position: relative;
          z-index: 2;
        }

        .cta-section h2 {
          font-family: 'Bukhari Script', cursive;
          font-size: 3.5rem;
          color: #F0F2E4;
          margin-bottom: 1rem;
        }

        .cta-section p {
          font-size: 1.3rem;
          color: #FFD9F0;
          margin-bottom: 2rem;
        }

        .cta-buttons {
          display: flex;
          gap: 1.5rem;
          justify-content: center;
          flex-wrap: wrap;
        }

        .cta-btn {
          padding: 18px 40px;
          border: none;
          border-radius: 50px;
          font-size: 1.1rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.4s ease;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .cta-btn.primary {
          background: linear-gradient(45deg, #FFD9F0, #FFB4E1);
          color: #DB0B00;
          box-shadow: 0 10px 30px rgba(255,180,225,0.4);
        }

        .cta-btn.secondary {
          background: transparent;
          color: #F0F2E4;
          border: 3px solid #F0F2E4;
        }

        .cta-btn:hover {
          transform: translateY(-3px);
          box-shadow: 0 15px 40px rgba(0,0,0,0.2);
        }

        /* Mobile Responsive */
        @media (max-width: 768px) {
          .main-title {
            font-size: 3rem;
          }

          .status-section {
            grid-template-columns: 1fr;
            margin-top: 2rem;
          }

          .countdown-text {
            font-size: 1.4rem;
          }

          .schedule-grid {
            grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
            gap: 1rem;
          }

          .day-card {
            padding: 1rem;
          }

          .location-card {
            grid-template-columns: 1fr;
            gap: 2rem;
            padding: 2rem;
          }

          .cta-buttons {
            flex-direction: column;
            align-items: center;
          }

          .cta-btn {
            width: 100%;
            max-width: 300px;
          }
        }

        @media (max-width: 480px) {
          .header-logo {
            width: 80px;
            height: 80px;
          }

          .main-title {
            font-size: 2.5rem;
          }

          .subtitle {
            font-size: 1rem;
          }

          .section-title {
            font-size: 2rem;
          }

          .floating-icon {
            font-size: 2rem;
          }

          .day-name {
            font-size: 1.1rem;
          }

          .hours-info {
            font-size: 0.8rem;
          }
        }
      `}</style>
    </div>
  );
};

export default OpeningHours;