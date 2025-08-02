import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Star, MessageSquare, Award, Heart, ExternalLink } from 'lucide-react';

const Reviews = () => {
  const [hoveredStat, setHoveredStat] = useState(null);
  const [showThankYou, setShowThankYou] = useState(false);
  const navigate = useNavigate();

  const handleReviewClick = () => {
    setShowThankYou(true);
    setTimeout(() => setShowThankYou(false), 3000);
    window.open(
      'https://www.google.com/search?q=birria+boss+christchurch+reviews#lrd=0x6d318b5d703af845:0xd87a84a2e2e95096,3',
      '_blank'
    );
  };

  // Update these with your actual Google review stats
  const reviewStats = [
    { 
      icon: <Star />, 
      value: '4.6', // Update with actual rating
      label: 'Average Rating',
      color: '#FFD700'
    },
    { 
      icon: <Award />, 
      value: 'Top Rated', // Update with actual achievement
      label: 'Birria in Christchurch',
      color: '#EDBE4C'
    }
  ];

  return (
    <div className="reviews-container">
      {/* Back to Home (top-right) - identical to MenuPage */}
      <button className="back-home-btn" onClick={() => navigate('/home')}>
        Back to Home
      </button>

      {/* Thank You Popup */}
      {showThankYou && (
        <div className="thank-you-popup">
          <Heart className="thank-you-icon" />
          <p>Thank you for supporting us!</p>
        </div>
      )}

      {/* Animated Background */}
      <div className="background-elements">
        <div className="floating-element element-1">⭐</div>
        <div className="floating-element element-2">💬</div>
        <div className="floating-element element-3">❤️</div>
        <div className="floating-element element-4">👍</div>
        <div className="pattern-overlay"></div>
      </div>

      {/* Header */}
      <header className="reviews-header">
        <img src="/images/Birria_Boss_favicon_white.PNG" alt="Birria Boss" className="header-logo" />
        <h1 className="main-title">CUSTOMER REVIEWS</h1>
        <p className="subtitle">SEE WHAT OUR BIRRIA FAMILY IS SAYING</p>
        
        {/* Review CTA Button */}
        <button className="leave-review-btn" onClick={handleReviewClick}>
          <Star className="btn-icon" />
          LEAVE A GOOGLE REVIEW
          <ExternalLink className="btn-icon-right" size={18} />
        </button>
      </header>

      {/* Stats Section */}
      <div className="stats-section">
        {reviewStats.map((stat, index) => (
          <div 
            key={index}
            className={`stat-card ${hoveredStat === index ? 'hovered' : ''}`}
            onMouseEnter={() => setHoveredStat(index)}
            onMouseLeave={() => setHoveredStat(null)}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="stat-icon" style={{ color: stat.color }}>
              {stat.icon}
            </div>
            <div className="stat-value">{stat.value}</div>
            <div className="stat-label">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Reviews Widget Section */}
      <div className="widget-section">
        <h2 className="section-title">
          <MessageSquare className="title-icon" />
          Customer Reviews
        </h2>
        
        <div className="widget-container">
          <iframe
            className="review-iframe"
            src="https://5221a677f2bd42f9b892373c56aa70ca.elf.site"
            frameBorder="0"
            title="Birria Boss Reviews"
            onLoad={(e) => {
              try {
                const style = document.createElement('style');
                style.textContent = `
                  ::-webkit-scrollbar { width: 8px; background: transparent; }
                  ::-webkit-scrollbar-track { background: transparent; border-radius: 4px; }
                  ::-webkit-scrollbar-thumb { background: #DB0B00; border-radius: 4px; opacity: 0.7; transition: all 0.3s ease; }
                  ::-webkit-scrollbar-thumb:hover { background: #FF1A1A; }
                  * { scrollbar-width: thin; scrollbar-color: #DB0B00 transparent; }
                `;
                e.target.contentDocument.head.appendChild(style);
              } catch (error) {
                console.log('Cannot access iframe content');
              }
            }}
          />
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="bottom-cta">
        <h2>ENJOYED YOUR EXPERIENCE?</h2>
        <p>Your feedback helps us serve you better and helps others discover our delicious birria!</p>
        <div className="cta-buttons">
          <button className="cta-btn primary" onClick={handleReviewClick}>
            <Star /> Write a Review
          </button>
          <button 
            className="cta-btn secondary"
            onClick={() => window.open('https://www.ubereats.com/nz/store/birria-boss/4xeB2_1fR0WuKM3mFMMbWw', '_blank')}
          >
            Order Again
          </button>
        </div>
      </div>

      <style>{`
        * { margin: 0; padding: 0; box-sizing: border-box; }

        .reviews-container {
          min-height: 100vh;
          background-color: #DB0B00;
          font-family: 'Open Sans', Arial, sans-serif;
          position: relative;
          overflow-x: hidden;
        }

        /* Back Home Button (same as MenuPage) */
        .back-home-btn {
          position: fixed;
          top: 16px;
          right: 20px;
          z-index: 2000;
          background: #F0F2E4;
          color: #DB0B00;
          border: 2px solid #F0F2E4;
          padding: 10px 18px;
          border-radius: 9999px;
          font-weight: 800;
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

        /* Thank You Popup */
        .thank-you-popup {
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background: white;
          padding: 2rem 3rem;
          border-radius: 20px;
          box-shadow: 0 20px 60px rgba(0,0,0,0.3);
          z-index: 1000;
          text-align: center;
          animation: popIn 0.5s ease;
        }
        @keyframes popIn { 0% { transform: translate(-50%, -50%) scale(0); opacity: 0; } 100% { transform: translate(-50%, -50%) scale(1); opacity: 1; } }
        .thank-you-icon { width: 50px; height: 50px; color: #DB0B00; margin-bottom: 1rem; animation: heartBeat 1s ease infinite; }
        @keyframes heartBeat { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.1); } }
        .thank-you-popup p { font-size: 1.2rem; color: #333; font-weight: 600; }

        /* Background Elements */
        .background-elements { position: fixed; top: 0; left: 0; right: 0; bottom: 0; pointer-events: none; z-index: 1; }
        .floating-element { position: absolute; font-size: 3rem; opacity: 0.1; animation: float 20s ease-in-out infinite; }
        .element-1 { top: 15%; left: 10%; animation-duration: 22s; }
        .element-2 { top: 45%; right: 20%; animation-duration: 25s; animation-delay: 5s; }
        .element-3 { bottom: 25%; left: 25%; animation-duration: 20s; animation-delay: 10s; }
        .element-4 { top: 70%; right: 15%; animation-duration: 28s; animation-delay: 15s; }
        @keyframes float { 0%, 100% { transform: translateY(0) rotate(0deg); } 25% { transform: translateY(-20px) rotate(10deg); } 50% { transform: translateY(0) rotate(-5deg); } 75% { transform: translateY(20px) rotate(5deg); } }
        .pattern-overlay {
          position: absolute; top: 0; left: 0; right: 0; bottom: 0;
          background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="review-pattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse"><circle cx="20" cy="20" r="10" fill="none" stroke="white" stroke-width="0.5" opacity="0.05"/><path d="M15,20 L25,20 M20,15 L20,25" stroke="white" stroke-width="0.5" opacity="0.03"/></pattern></defs><rect width="100" height="100" fill="url(%23review-pattern)"/></svg>') repeat;
        }

        /* Header */
        .reviews-header {
          text-align: center;
          padding: 4rem 2rem 3rem;
          position: relative;
          z-index: 2;
          background: linear-gradient(180deg, rgba(219,11,0,1) 0%, rgba(179,10,0,1) 100%);
        }
        .header-logo {
          width: 100px; height: 100px; margin-bottom: 2rem;
          filter: drop-shadow(0 5px 15px rgba(0,0,0,0.3));
          animation: logoFloat 3s ease-in-out infinite;
        }
        @keyframes logoFloat { 0%, 100% { transform: translateY(0) rotate(0deg); } 50% { transform: translateY(-10px) rotate(5deg); } }
        .main-title {
          font-family: 'Bukhari Script', cursive;
          font-size: clamp(3rem, 8vw, 5rem);
          color: #F0F2E4; margin-bottom: 1rem;
          text-shadow: 3px 3px 6px rgba(0,0,0,0.3); letter-spacing: 3px;
        }
        .subtitle { font-size: 1.2rem; color: #FFD9F0; font-weight: 600; letter-spacing: 1px; margin-bottom: 2rem; }

        .leave-review-btn {
          background: linear-gradient(45deg, #FFD700, #FFA000);
          color: #000; border: none; padding: 18px 35px; border-radius: 50px;
          font-size: 1.1rem; font-weight: 700; cursor: pointer; transition: all 0.4s ease;
          text-transform: uppercase; letter-spacing: 1px; display: inline-flex; align-items: center; gap: 0.8rem;
          box-shadow: 0 10px 30px rgba(255,215,0,0.4); position: relative; overflow: hidden;
        }
        .leave-review-btn::before {
          content: ''; position: absolute; top: 0; left: -100%; width: 100%; height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
          transition: left 0.5s ease;
        }
        .leave-review-btn:hover::before { left: 100%; }
        .leave-review-btn:hover { transform: translateY(-3px); box-shadow: 0 15px 40px rgba(255,215,0,0.5); }
        .btn-icon { width: 20px; height: 20px; }
        .btn-icon-right { margin-left: 0.5rem; }

        /* Stats Section */
        .stats-section {
          display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 3rem; max-width: 600px; margin: -50px auto 4rem; padding: 0 2rem; position: relative; z-index: 3;
        }
        .stat-card {
          background: #F0F2E4; border-radius: 20px; padding: 2rem; text-align: center;
          box-shadow: 0 10px 30px rgba(0,0,0,0.2); transition: all 0.4s ease; border: 3px solid transparent;
          animation: slideUp 0.6s ease-out forwards; opacity: 0; transform: translateY(30px);
        }
        @keyframes slideUp { to { opacity: 1; transform: translateY(0); } }
        .stat-card:hover { transform: translateY(-10px); border-color: #FFB4E1; box-shadow: 0 20px 40px rgba(0,0,0,0.3); }
        .stat-icon { margin-bottom: 1rem; display: flex; justify-content: center; }
        .stat-icon svg { width: 40px; height: 40px; transition: transform 0.3s ease; }
        .stat-card:hover .stat-icon svg { transform: scale(1.2) rotate(5deg); }
        .stat-value { font-size: 2.5rem; font-weight: 800; color: #DB0B00; margin-bottom: 0.5rem; }
        .stat-label { color: #666; font-size: 0.9rem; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; }

        /* Widget Section */
        .widget-section { background: linear-gradient(135deg, #FFB4E1, #FFD9F0); padding: 4rem 2rem; position: relative; z-index: 2; }
        .widget-section .section-title {
          color: #DB0B00; font-family: 'Bukhari Script', cursive; font-size: 3rem; text-align: center; margin-bottom: 3rem;
          display: flex; align-items: center; justify-content: center; gap: 1rem;
        }
        .title-icon { width: 40px; height: 40px; color: #DB0B00; }
        .widget-container { max-width: 1200px; margin: 0 auto; }
        .review-iframe {
          border: none; width: 100%; min-height: 800px; border-radius: 30px; box-shadow: 0 20px 60px rgba(0,0,0,0.2); background: white;
        }

        /* Bottom CTA */
        .bottom-cta { background: #DB0B00; padding: 5rem 2rem; text-align: center; position: relative; z-index: 2; }
        .bottom-cta h2 { font-family: 'Bukhari Script', cursive; font-size: 3.5rem; color: #F0F2E4; margin-bottom: 1rem; }
        .bottom-cta p { font-size: 1.3rem; color: #FFD9F0; margin-bottom: 2rem; max-width: 600px; margin-left: auto; margin-right: auto; }
        .cta-buttons { display: flex; gap: 1.5rem; justify-content: center; flex-wrap: wrap; }
        .cta-btn {
          padding: 18px 40px; border: none; border-radius: 50px; font-size: 1.1rem; font-weight: 700; cursor: pointer;
          transition: all 0.4s ease; text-transform: uppercase; letter-spacing: 1px; display: inline-flex; align-items: center; gap: 0.5rem;
        }
        .cta-btn.primary { background: linear-gradient(45deg, #FFD700, #FFA000); color: #000; box-shadow: 0 10px 30px rgba(255,215,0,0.4); }
        .cta-btn.secondary { background: transparent; color: #F0F2E4; border: 3px solid #F0F2E4; }
        .cta-btn:hover { transform: translateY(-3px); box-shadow: 0 15px 40px rgba(0,0,0,0.2); }

        /* Mobile Responsive */
        @media (max-width: 768px) {
          .main-title { font-size: 3rem; }
          .stats-section { grid-template-columns: 1fr; gap: 1.5rem; margin-top: 2rem; }
          .stat-value { font-size: 2rem; }
          .section-title { font-size: 2.5rem; }
          .leave-review-btn { padding: 15px 30px; font-size: 1rem; }
          .cta-buttons { flex-direction: column; align-items: center; }
          .cta-btn { width: 100%; max-width: 300px; }
        }

        @media (max-width: 480px) {
          .header-logo { width: 80px; height: 80px; }
          .main-title { font-size: 2.5rem; }
          .subtitle { font-size: 1rem; }
          .stats-section { grid-template-columns: 1fr; }
          .stat-card { padding: 1.5rem; }
          .floating-element { font-size: 2rem; }
          .review-iframe { min-height: 600px; border-radius: 20px; }
          .bottom-cta h2 { font-size: 2.5rem; }
          .bottom-cta p { font-size: 1.1rem; }
          .back-home-btn { top: 12px; right: 12px; padding: 8px 14px; }
        }
      `}</style>
    </div>
  );
};

export default Reviews;
