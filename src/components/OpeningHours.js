import React, { useState, useEffect } from 'react';
import { Clock, MapPin, Navigation, ShoppingBag, Store, ChevronRight, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const OpeningHours = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isStoreOpen, setIsStoreOpen] = useState(false);
  const [isUberOpen, setIsUberOpen] = useState(false);
  const [currentDay, setCurrentDay] = useState('');
  const [timeUntilChange, setTimeUntilChange] = useState('');
  const [hoveredDay, setHoveredDay] = useState(null);
  const [showUberAnimation, setShowUberAnimation] = useState(false);
  const navigate = useNavigate();

  // Displayed schedule (strings)
  const storeHours = {
    Sunday:    { open: '9:00 AM', close: '5:00 PM' },
    Monday:    { open: '9:00 AM', close: '5:00 PM' },
    Tuesday:   { open: '9:00 AM', close: '5:00 PM' },
    Wednesday: { open: '9:00 AM', close: '5:00 PM' },
    Thursday:  { open: '9:00 AM', close: '5:00 PM' },
    Friday:    { open: '9:00 AM', close: '5:00 PM' },
    Saturday:  { open: '9:00 AM', close: '5:00 PM' }
  };

  const uberEatsHours = { open: '9:00 AM', close: '10:00 PM' };

  // Internal numeric schedule (minutes since midnight)
  const STORE_OPEN_MIN = 9 * 60;
  const STORE_CLOSE_MIN = 17 * 60;
  const UBER_OPEN_MIN  = 9 * 60;
  const UBER_CLOSE_MIN = 22 * 60;

  const msUntil = (targetH, targetM, from = new Date()) => {
    const target = new Date(from.getFullYear(), from.getMonth(), from.getDate(), targetH, targetM, 0, 0);
    if (target <= from) target.setDate(target.getDate() + 1);
    return target - from;
  };

  const formatDuration = (ms) => {
    if (ms <= 0 || Number.isNaN(ms)) return '0h 0m 0s';
    const totalSec = Math.floor(ms / 1000);
    const h = Math.floor(totalSec / 3600);
    const m = Math.floor((totalSec % 3600) / 60);
    const s = totalSec % 60;
    return `${h}h ${m}m ${s}s`;
  };

  const checkIfOpen = () => {
    const now = new Date();
    const dayName = now.toLocaleDateString('en-NZ', { weekday: 'long' });
    setCurrentDay(dayName);

    const currentMinutes = now.getHours() * 60 + now.getMinutes();

    const storeOpen = currentMinutes >= STORE_OPEN_MIN && currentMinutes < STORE_CLOSE_MIN;
    const uberOpen  = currentMinutes >= UBER_OPEN_MIN  && currentMinutes < UBER_CLOSE_MIN;
    setIsStoreOpen(storeOpen);
    setIsUberOpen(uberOpen);

    let msg = '';
    let ms = 0;

    if (currentMinutes < STORE_OPEN_MIN) {
      ms = msUntil(9, 0, now);
      msg = 'Store opens in';
    } else if (currentMinutes < STORE_CLOSE_MIN) {
      ms = msUntil(17, 0, now);
      msg = 'Store closes in';
    } else if (currentMinutes < UBER_CLOSE_MIN) {
      ms = msUntil(22, 0, now);
      msg = 'Uber Eats closes in';
    } else {
      ms = msUntil(9, 0, now);
      msg = 'Store opens in';
    }

    setTimeUntilChange(`${msg}: ${formatDuration(ms)}`);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
      checkIfOpen();
    }, 1000);

    const animTimer = setInterval(() => {
      setShowUberAnimation(true);
      setTimeout(() => setShowUberAnimation(false), 3000);
    }, 10000);

    checkIfOpen();

    return () => {
      clearInterval(timer);
      clearInterval(animTimer);
    };
  }, []);

  return (
    <div className="hours-container">
      {/* Background */}
      <div className="background-elements">
        <div className="floating-icon icon-1">⏰</div>
        <div className="floating-icon icon-2">🌮</div>
        <div className="floating-icon icon-3">📍</div>
        <div className="floating-icon icon-4">🛵</div>
        <div className="pattern-bg"></div>
      </div>

      {/* Header */}
      <header className="hours-header">
        {/* Back to Home (smaller) */}
        <button className="back-home-btn" onClick={() => navigate('/home')}>
          Back to Home
        </button>

        <img src="/images/Birria_Boss_favicon_white.PNG" alt="Birria Boss" className="header-logo" />
        <h1 className="main-title">OPENING HOURS</h1>
        <p className="subtitle">FIND OUT WHEN WE'RE SERVING OUR LEGENDARY BIRRIA</p>
      </header>

      {/* Live Status Cards */}
      <div className="status-section">
        <div className={`status-card store-status ${isStoreOpen ? 'open' : 'closed'}`}>
          <div className="status-icon"><Store size={40} /></div>
          <h3>In-Store Dining</h3>
          <div className="status-indicator">
            <span className="status-dot"></span>
            {isStoreOpen ? 'OPEN NOW' : 'CLOSED'}
          </div>
          <p className="status-hours">9:00 AM - 5:00 PM Daily</p>
        </div>

        <div className={`status-card uber-status ${isUberOpen ? 'open' : 'closed'} ${showUberAnimation ? 'pulse' : ''}`}>
          <div className="status-icon"><ShoppingBag size={40} /></div>
          <h3>Uber Eats Delivery</h3>
          <div className="status-indicator">
            <span className="status-dot"></span>
            {isUberOpen ? 'AVAILABLE NOW' : 'NOT AVAILABLE'}
          </div>
          <p className="status-hours">9:00 AM - 10:00 PM Daily</p>
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

      {/* Countdown */}
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
                <div className="store-hours"><Store size={16} /><span>{hours.open} - {hours.close}</span></div>
                <div className="uber-hours"><ShoppingBag size={16} /><span>{uberEatsHours.open} - {uberEatsHours.close}</span></div>
              </div>
            </div>
          ))}
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
          </div>

        <div className="map-container">
            <div className="map-embed">
              <iframe
                title="Birria Boss Location"
                src="https://www.google.com/maps?q=363+Colombo+Street,+Sydenham,+Christchurch+8011&output=embed"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
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

      {/* CTA */}
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
        </div>
      </div>

      <style>{`
        * { margin: 0; padding: 0; box-sizing: border-box; }

        .hours-container {
          min-height: 100vh;
          background-color: #DB0B00;
          font-family: 'Open Sans', Arial, sans-serif;
          color: #F0F2E4;
          position: relative;
          overflow-x: hidden;
        }

        /* Back Home Button — smaller */
        .back-home-btn {
          position: fixed;
          top: 14px;
          right: 16px;
          z-index: 2000;
          background: #F0F2E4;
          color: #DB0B00;
          border: 1.5px solid #F0F2E4;
          padding: 8px 14px;
          border-radius: 9999px;
          font-weight: 800;
          font-size: 0.85rem;
          letter-spacing: 0.5px;
          cursor: pointer;
          transition: all 0.25s ease;
          text-transform: uppercase;
        }
        .back-home-btn:hover {
          background: #FFD9F0;
          border-color: #FFD9F0;
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(219,11,0,0.25);
        }

        /* Background Elements */
        .background-elements { position: fixed; inset: 0; pointer-events: none; z-index: 1; }
        .floating-icon { position: absolute; font-size: 3rem; opacity: 0.15; animation: float 25s ease-in-out infinite; }
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
          position: absolute; inset: 0;
          background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="time-pattern" x="0" y="0" width="30" height="30" patternUnits="userSpaceOnUse"><circle cx="15" cy="15" r="8" fill="none" stroke="white" stroke-width="0.5" opacity="0.05"/></pattern></defs><rect width="100" height="100" fill="url(%23time-pattern)"/></svg>') repeat;
        }

        /* Header visuals */
        .hours-header {
          text-align: center;
          padding: 4rem 2rem;
          position: relative;
          z-index: 2;
          background: linear-gradient(180deg, rgba(219,11,0,1) 0%, rgba(179,10,0,1) 100%);
        }
        .header-logo { width: 100px; height: 100px; margin-bottom: 2rem; animation: logoRotate 20s linear infinite; }
        @keyframes logoRotate { 0% { transform: rotate(0deg) scale(1); } 50% { transform: rotate(180deg) scale(1.1); } 100% { transform: rotate(360deg) scale(1); }
        }
        .main-title { font-family: 'Bukhari Script', cursive; font-size: clamp(3rem, 8vw, 5rem); margin-bottom: 1rem; text-shadow: 3px 3px 6px rgba(0,0,0,0.3); letter-spacing: 3px; }
        .subtitle { font-size: 1.2rem; color: #FFD9F0; font-weight: 600; letter-spacing: 1px; }

        /* Status Section */
        .status-section { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem; max-width: 800px; margin: -50px auto 3rem; padding: 0 2rem; position: relative; z-index: 3; }
        .status-card { background: #F0F2E4; color: #333; border-radius: 20px; padding: 2.5rem; text-align: center; box-shadow: 0 10px 30px rgba(0,0,0,0.2); transition: all 0.4s ease; position: relative; overflow: hidden; }
        .status-card::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 5px; background: linear-gradient(90deg, #FFB4E1, #FFD9F0); transition: height 0.3s ease; }
        .status-card:hover::before { height: 10px; }
        .status-card.open::before { background: linear-gradient(90deg, #4CAF50, #81C784); }
        .status-card.closed::before { background: linear-gradient(90deg, #DB0B00, #FF1744); }
        .status-icon { margin-bottom: 1rem; color: #DB0B00; }
        .status-card h3 { font-size: 1.5rem; margin-bottom: 1rem; color: #DB0B00; }
        .status-indicator { display: flex; align-items: center; justify-content: center; gap: 0.5rem; font-size: 1.2rem; font-weight: 700; margin-bottom: 1rem; }
        .status-dot { width: 12px; height: 12px; border-radius: 50%; animation: blink 2s ease-in-out infinite; }
        .open .status-dot { background: #4CAF50; box-shadow: 0 0 10px #4CAF50; }
        .closed .status-dot { background: #DB0B00; box-shadow: 0 0 10px #DB0B00; }
        @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }
        .status-hours { color: #666; font-size: 0.9rem; }
        .uber-order-btn { background: linear-gradient(45deg, #4CAF50, #81C784); color: white; border: none; padding: 12px 24px; border-radius: 25px; font-weight: 600; cursor: pointer; display: inline-flex; align-items: center; gap: 0.5rem; margin-top: 1rem; transition: all 0.3s ease; }
        .uber-order-btn:hover { transform: translateY(-2px); box-shadow: 0 5px 15px rgba(76,175,80,0.4); }
        .uber-status.pulse { animation: pulse 0.5s ease-in-out; }
        @keyframes pulse { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.05); } }

        /* Countdown */
        .countdown-section { text-align: center; padding: 2rem; margin-bottom: 3rem; position: relative; z-index: 2; }
        .countdown-icon { width: 40px; height: 40px; margin-bottom: 1rem; color: #FFD9F0; }
        .countdown-text { font-size: 1.8rem; font-weight: 700; color: #F0F2E4; text-shadow: 2px 2px 4px rgba(0,0,0,0.3); }

        /* Schedule */
        .schedule-section { max-width: 1200px; margin: 0 auto; padding: 0 2rem 4rem; position: relative; z-index: 2; }
        .section-title { font-family: 'Bukhari Script', cursive; font-size: 3rem; text-align: center; margin-bottom: 3rem; color: #F0F2E4; display: flex; align-items: center; justify-content: center; gap: 1rem; }
        .title-icon { width: 40px; height: 40px; color: #FFD9F0; }
        .schedule-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1.5rem; margin-bottom: 2rem; }
        .day-card { background: rgba(240,242,228,0.95); color: #333; border-radius: 20px; padding: 1.5rem; text-align: center; transition: all 0.3s ease; position: relative; cursor: pointer; border: 3px solid transparent; }
        .day-card:hover { transform: translateY(-5px); box-shadow: 0 10px 30px rgba(0,0,0,0.3); border-color: #FFB4E1; }
        .day-card.today { background: linear-gradient(135deg, #FFD9F0, #FFB4E1); border-color: #EDBE4C; }
        .day-name { font-size: 1.3rem; font-weight: 700; color: #DB0B00; margin-bottom: 0.5rem; }
        .today-badge { position: absolute; top: -10px; right: -10px; background: #EDBE4C; color: #DB0B00; padding: 5px 15px; border-radius: 20px; font-size: 0.8rem; font-weight: 700; transform: rotate(15deg); box-shadow: 0 3px 10px rgba(0,0,0,0.2); }
        .hours-info { margin-top: 1rem; }
        .store-hours, .uber-hours { display: flex; align-items: center; justify-content: center; gap: 0.5rem; margin: 0.5rem 0; font-size: 0.9rem; }
        .store-hours { color: #333; font-weight: 600; }
        .uber-hours { color: #666; }

        /* Location */
        .location-section { background: linear-gradient(135deg, #FFB4E1, #FFD9F0); padding: 4rem 2rem; position: relative; z-index: 2; }
        .location-section .section-title { color: #DB0B00; }
        .location-card { background: white; border-radius: 30px; padding: 3rem; max-width: 800px; margin: 0 auto; display: grid; grid-template-columns: 1fr 1fr; gap: 3rem; box-shadow: 0 15px 40px rgba(0,0,0,0.2); }
        .location-info h3 { font-family: 'Bukhari Script', cursive; font-size: 2rem; color: #DB0B00; margin-bottom: 1rem; }
        .address { font-size: 1.2rem; color: #333; margin-bottom: 0.5rem; }
        .city { font-size: 1.1rem; color: #666; margin-bottom: 2rem; }
        .map-container { display: flex; flex-direction: column; gap: 1.5rem; }
        .map-embed { border-radius: 20px; overflow: hidden; border: 2px solid #DB0B00; height: 220px; background: #fff; }
        .map-embed iframe { width: 100%; height: 100%; border: 0; }
        .directions-btn { background: linear-gradient(45deg, #DB0B00, #FF1744); color: white; border: none; padding: 15px 30px; border-radius: 30px; font-size: 1.1rem; font-weight: 700; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 0.5rem; transition: all 0.3s ease; }
        .directions-btn:hover { transform: translateY(-2px); box-shadow: 0 10px 25px rgba(219,11,0,0.4); }

        /* CTA */
        .cta-section { background: #DB0B00; padding: 5rem 2rem; text-align: center; position: relative; z-index: 2; }
        .cta-section h2 { font-family: 'Bukhari Script', cursive; font-size: 3.5rem; color: #F0F2E4; margin-bottom: 1rem; }
        .cta-section p { font-size: 1.3rem; color: #FFD9F0; margin-bottom: 2rem; }
        .cta-buttons { display: flex; gap: 1.5rem; justify-content: center; flex-wrap: wrap; }
        .cta-btn { padding: 18px 40px; border: none; border-radius: 50px; font-size: 1.1rem; font-weight: 700; cursor: pointer; transition: all 0.4s ease; text-transform: uppercase; letter-spacing: 1px; }
        .cta-btn.primary { background: linear-gradient(45deg, #FFD9F0, #FFB4E1); color: #DB0B00; box-shadow: 0 10px 30px rgba(255,180,225,0.4); }

        /* Mobile */
        @media (max-width: 768px) {
          .status-section { grid-template-columns: 1fr; margin-top: 2rem; }
          .countdown-text { font-size: 1.4rem; }
          .schedule-grid { grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 1rem; }
          .day-card { padding: 1rem; }
          .location-card { grid-template-columns: 1fr; gap: 2rem; padding: 2rem; }
          .cta-buttons { flex-direction: column; align-items: center; }
          .cta-btn { width: 100%; max-width: 300px; }
        }

        @media (max-width: 480px) {
          .header-logo { width: 80px; height: 80px; }
          .main-title { font-size: 2.5rem; }
          .subtitle { font-size: 1rem; }
          .section-title { font-size: 2rem; }
          .floating-icon { font-size: 2rem; }
          .day-name { font-size: 1.1rem; }
          .hours-info { font-size: 0.8rem; }
          .back-home-btn { top: 10px; right: 10px; padding: 6px 12px; font-size: 0.8rem; }
        }
      `}</style>
    </div>
  );
};

export default OpeningHours;
