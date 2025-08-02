import React, { useState, useCallback, useEffect, useRef } from 'react';
import { Wheel } from 'react-custom-roulette';
import { Trophy, Star, Gift, X, Sparkles, Coins, ShoppingBag, Percent, Ticket, Crown } from 'lucide-react';

const BirriaRoulette = () => {
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);
  const [points, setPoints] = useState(100);
  const [showInventory, setShowInventory] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showConfetti, setShowConfetti] = useState(false);
  const [wonPrize, setWonPrize] = useState(null);
  const [showPrizeModal, setShowPrizeModal] = useState(false);
  const spinCost = 25;

  const colors = {
    yellow: '#EDBE4C',
    white: '#F0F2E4',
    pink: '#FFD9F0',
    hotPink: '#FFB4E1',
    red: '#DB0B00',
    gray: '#808080',
  };

  const prizes = [
    { name: "$100 Voucher", color: colors.yellow, textColor: colors.red, icon: <Trophy />, weight: 10, value: "$100", rarity: "legendary" },
    { name: "Try Again", color: colors.gray, textColor: colors.white, icon: <X />, weight: 500, value: "Better luck next time", rarity: "common" },
    { name: "$1000 Cash", color: colors.yellow, textColor: colors.red, icon: <Crown />, weight: 1, value: "$1000", rarity: "mythic" },
    
    { name: "100 Points", color: colors.red, textColor: colors.white, icon: <Coins />, points: 100, value: "+100 Points", weight: 250, rarity: "rare" },
    { name: "25 Points", color: colors.red, textColor: colors.white, icon: <Star />, points: 25, value: "+25 Points", weight: 333, rarity: "common" },
    
    { name: "Mint Limeade", color: colors.hotPink, textColor: colors.red, icon: <Gift />, weight: 20, value: "$12.00", rarity: "rare" },
    { name: "Birria Ramen", color: colors.hotPink, textColor: colors.red, icon: <Gift />, weight: 20, value: "$24.70", rarity: "epic" },
    { name: "Quesadilla", color: colors.hotPink, textColor: colors.red, icon: <Gift />, weight: 20, value: "$29.90", rarity: "epic" },
    { name: "3 Tacos Set", color: colors.hotPink, textColor: colors.red, icon: <Gift />, weight: 20, value: "$28.90", rarity: "epic" },
    
    { name: "10 Entries", color: colors.pink, textColor: colors.red, icon: <Ticket />, weight: 500, value: "Giveaway", rarity: "common" },
    { name: "Loyalty Stamp", color: colors.pink, textColor: colors.red, icon: <Star />, weight: 167, value: "1 Stamp", rarity: "rare" },
    { name: "15% Off", color: colors.pink, textColor: colors.red, icon: <Percent />, weight: 200, value: "Discount", rarity: "rare" }
  ];

  const [inventory, setInventory] = useState({});
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Simulate loading
    setTimeout(() => setIsLoading(false), 2000);
  }, []);

  const addNotification = (message, type = 'info') => {
    const id = Date.now();
    setNotifications(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }, 3000);
  };

  const addToInventory = (prize) => {
    if (prize.points) {
      setPoints(prev => prev + prize.points);
      addNotification(`+${prize.points} Boss Points added!`, 'success');
    } else {
      setInventory((prev) => ({
        ...prev,
        [prize.name]: {
          ...prize,
          count: prev[prize.name] ? prev[prize.name].count + 1 : 1,
        },
      }));
    }
  };

  const getWeightedPrize = useCallback(() => {
    const totalWeight = prizes.reduce((sum, prize) => sum + prize.weight, 0);
    let random = Math.random() * totalWeight;
    for (let i = 0; i < prizes.length; i++) {
      if (random < prizes[i].weight) return i;
      random -= prizes[i].weight;
    }
    return 0;
  }, []);

  const handleSpinClick = () => {
    if (points >= spinCost) {
      setPoints(points - spinCost);
      const prizeIndex = getWeightedPrize();
      setPrizeNumber(prizeIndex);
      setMustSpin(true);
    } else {
      addNotification('Not enough points to spin!', 'error');
    }
  };

  const handleSpinEnd = () => {
    setMustSpin(false);
    const selectedPrize = prizes[prizeNumber];
    setWonPrize(selectedPrize);
    
    if (selectedPrize.name !== "Try Again") {
      addToInventory(selectedPrize);
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
    }
    
    setShowPrizeModal(true);
  };

  const closePrizeModal = () => {
    setShowPrizeModal(false);
    setWonPrize(null);
  };

  if (isLoading) {
    return (
      <div className="loading-screen">
        <div className="loading-content">
          <img src="/images/Birria_Boss_favicon_white.PNG" alt="Birria Boss" className="loading-logo" />
          <h2 className="loading-text">SPIN & WIN</h2>
          <div className="loading-bar">
            <div className="loading-progress"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="roulette-container">
      {/* Confetti Animation */}
      {showConfetti && (
        <div className="confetti-container">
          {[...Array(50)].map((_, i) => (
            <div key={i} className="confetti" style={{ left: `${Math.random() * 100}%`, animationDelay: `${Math.random() * 3}s` }}></div>
          ))}
        </div>
      )}

      {/* Background Elements */}
      <div className="background-elements">
        <div className="floating-icon icon-1">🎰</div>
        <div className="floating-icon icon-2">🎯</div>
        <div className="floating-icon icon-3">🎁</div>
        <div className="floating-icon icon-4">⭐</div>
        <div className="pattern-bg"></div>
      </div>

      {/* Header */}
      <header className="roulette-header">
        <div className="header-content">
          <img src="/images/Birria_Boss_favicon_white.PNG" alt="Birria Boss" className="header-logo" />
          <h1 className="header-title">SPIN & WIN</h1>
          <p className="header-subtitle">Try your luck and win amazing prizes!</p>
        </div>
      </header>

      {/* Points & Inventory Bar */}
      <div className="info-bar">
        <div className="points-display">
          <Coins className="points-icon" />
          <span className="points-value">{points}</span>
          <span className="points-label">Boss Points</span>
        </div>
        <button className="inventory-btn" onClick={() => setShowInventory(true)}>
          <ShoppingBag />
          <span>My Prizes ({Object.keys(inventory).length})</span>
        </button>
      </div>

      {/* Wheel Container */}
      <div className="wheel-section">
        <div className="wheel-container">
          <div className="wheel-glow"></div>
          <div className="wheel-wrapper">
            <Wheel
              mustStartSpinning={mustSpin}
              prizeNumber={prizeNumber}
              data={prizes.map((prize) => ({
                option: prize.name,
                style: {
                  backgroundColor: prize.color,
                  textColor: prize.textColor,
                  fontSize: prize.name.length > 10 ? 10 : 12,
                },
              }))}
              onStopSpinning={handleSpinEnd}
              outerBorderColor={colors.red}
              outerBorderWidth={15}
              innerBorderColor={colors.white}
              innerBorderWidth={5}
              radiusLineColor={colors.white}
              radiusLineWidth={3}
              fontSize={12}
              textDistance={60}
              spinDuration={0.5}
            />
          </div>
          <div className="wheel-center">
            <Sparkles className="center-icon" />
          </div>
        </div>
      </div>

      {/* Spin Button */}
      <div className="spin-section">
        <button
          className={`spin-button ${mustSpin ? 'spinning' : ''}`}
          onClick={handleSpinClick}
          disabled={mustSpin || points < spinCost}
        >
          <span className="spin-text">{mustSpin ? "SPINNING..." : "SPIN NOW!"}</span>
          <span className="spin-cost">{spinCost} Points</span>
        </button>
        <p className="spin-info">Each spin costs {spinCost} Boss Points</p>
      </div>

      {/* Prize Modal */}
      {showPrizeModal && wonPrize && (
        <div className="prize-modal-overlay" onClick={closePrizeModal}>
          <div className="prize-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closePrizeModal}>×</button>
            <div className={`prize-content ${wonPrize.rarity}`}>
              <div className="prize-icon">{wonPrize.icon}</div>
              <h2 className="prize-name">{wonPrize.name === "Try Again" ? "Better Luck Next Time!" : "Congratulations!"}</h2>
              <p className="prize-value">{wonPrize.name}</p>
              <p className="prize-details">{wonPrize.value}</p>
              <div className={`rarity-badge ${wonPrize.rarity}`}>{wonPrize.rarity.toUpperCase()}</div>
              <button className="claim-btn" onClick={closePrizeModal}>
                {wonPrize.name === "Try Again" ? "Try Again" : "Claim Prize"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Inventory Sidebar */}
      {showInventory && (
        <div className="inventory-overlay" onClick={() => setShowInventory(false)}>
          <div className="inventory-sidebar" onClick={(e) => e.stopPropagation()}>
            <div className="inventory-header">
              <h2>My Prizes</h2>
              <button className="close-inventory" onClick={() => setShowInventory(false)}>
                <X />
              </button>
            </div>
            <div className="inventory-content">
              {Object.keys(inventory).length === 0 ? (
                <p className="empty-inventory">No prizes yet. Keep spinning!</p>
              ) : (
                <div className="prize-list">
                  {Object.values(inventory).map((prize, index) => (
                    <div key={index} className={`prize-item ${prize.rarity}`}>
                      <div className="prize-item-icon">{prize.icon}</div>
                      <div className="prize-item-info">
                        <h4>{prize.name}</h4>
                        <p>{prize.value}</p>
                      </div>
                      {prize.count > 1 && <span className="prize-count">×{prize.count}</span>}
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="inventory-footer">
              <button className="redeem-btn">Redeem Prizes</button>
            </div>
          </div>
        </div>
      )}

      {/* Notifications */}
      <div className="notifications">
        {notifications.map(notification => (
          <div key={notification.id} className={`notification ${notification.type}`}>
            {notification.message}
          </div>
        ))}
      </div>

      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .roulette-container {
          min-height: 100vh;
          background: #DB0B00;
          font-family: 'Open Sans', Arial, sans-serif;
          position: relative;
          overflow-x: hidden;
        }

        /* Loading Screen */
        .loading-screen {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: #DB0B00;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
        }

        .loading-content {
          text-align: center;
        }

        .loading-logo {
          width: 120px;
          height: 120px;
          animation: spinLogo 2s linear infinite;
          margin-bottom: 2rem;
        }

        @keyframes spinLogo {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .loading-text {
          font-family: 'Bukhari Script', cursive;
          font-size: 3rem;
          color: #F0F2E4;
          margin-bottom: 2rem;
          letter-spacing: 3px;
        }

        .loading-bar {
          width: 300px;
          height: 8px;
          background: rgba(240, 242, 228, 0.2);
          border-radius: 4px;
          overflow: hidden;
          margin: 0 auto;
        }

        .loading-progress {
          height: 100%;
          background: linear-gradient(90deg, #FFB4E1, #FFD9F0);
          animation: loadProgress 2s ease-in-out forwards;
        }

        @keyframes loadProgress {
          0% { width: 0; }
          100% { width: 100%; }
        }

        /* Confetti */
        .confetti-container {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          pointer-events: none;
          z-index: 1000;
        }

        .confetti {
          position: absolute;
          width: 10px;
          height: 10px;
          background: #FFD700;
          animation: confettiFall 3s ease-out forwards;
        }

        @keyframes confettiFall {
          0% {
            transform: translateY(-100vh) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
          }
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
          font-size: 4rem;
          opacity: 0.1;
          animation: float 20s ease-in-out infinite;
        }

        .icon-1 { top: 10%; left: 10%; animation-duration: 22s; }
        .icon-2 { top: 40%; right: 15%; animation-duration: 25s; animation-delay: 5s; }
        .icon-3 { bottom: 20%; left: 20%; animation-duration: 20s; animation-delay: 10s; }
        .icon-4 { top: 70%; right: 25%; animation-duration: 28s; animation-delay: 15s; }

        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          25% { transform: translateY(-30px) rotate(10deg); }
          50% { transform: translateY(0) rotate(-5deg); }
          75% { transform: translateY(30px) rotate(5deg); }
        }

        .pattern-bg {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="spin-pattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse"><circle cx="20" cy="20" r="15" fill="none" stroke="white" stroke-width="0.5" opacity="0.05"/><path d="M10,20 L30,20 M20,10 L20,30" stroke="white" stroke-width="0.5" opacity="0.03"/></pattern></defs><rect width="100" height="100" fill="url(%23spin-pattern)"/></svg>') repeat;
        }

        /* Header */
        .roulette-header {
          text-align: center;
          padding: 3rem 2rem;
          position: relative;
          z-index: 2;
          background: linear-gradient(180deg, rgba(219,11,0,1) 0%, rgba(179,10,0,1) 100%);
        }

        .header-logo {
          width: 100px;
          height: 100px;
          margin-bottom: 1.5rem;
          filter: drop-shadow(0 5px 15px rgba(0,0,0,0.3));
          animation: pulse 3s ease-in-out infinite;
        }

        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }

        .header-title {
          font-family: 'Bukhari Script', cursive;
          font-size: clamp(3rem, 8vw, 5rem);
          color: #F0F2E4;
          margin-bottom: 0.5rem;
          text-shadow: 3px 3px 6px rgba(0,0,0,0.3);
          letter-spacing: 3px;
        }

        .header-subtitle {
          font-size: 1.2rem;
          color: #FFD9F0;
          font-weight: 600;
          letter-spacing: 1px;
        }

        /* Info Bar */
        .info-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          max-width: 800px;
          margin: -30px auto 3rem;
          padding: 1.5rem 2rem;
          background: #F0F2E4;
          border-radius: 20px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.2);
          position: relative;
          z-index: 3;
        }

        .points-display {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .points-icon {
          width: 30px;
          height: 30px;
          color: #EDBE4C;
        }

        .points-value {
          font-size: 2rem;
          font-weight: 800;
          color: #DB0B00;
        }

        .points-label {
          color: #666;
          font-weight: 600;
        }

        .inventory-btn {
          background: linear-gradient(45deg, #DB0B00, #FF1744);
          color: white;
          border: none;
          padding: 12px 25px;
          border-radius: 25px;
          font-weight: 600;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          transition: all 0.3s ease;
        }

        .inventory-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(219,11,0,0.4);
        }

        /* Wheel Section */
        .wheel-section {
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 2rem;
          position: relative;
          z-index: 2;
        }

        .wheel-container {
          position: relative;
          max-width: 500px;
          width: 100%;
        }

        .wheel-glow {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 120%;
          height: 120%;
          background: radial-gradient(circle, rgba(255,215,0,0.3), transparent 70%);
          filter: blur(30px);
          animation: glowPulse 3s ease-in-out infinite;
        }

        @keyframes glowPulse {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }

        .wheel-wrapper {
          position: relative;
          border-radius: 50%;
          box-shadow: 0 20px 60px rgba(0,0,0,0.4);
        }

        .wheel-center {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 80px;
          height: 80px;
          background: linear-gradient(135deg, #FFD700, #FFA000);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 5px 20px rgba(0,0,0,0.3);
          z-index: 10;
          pointer-events: none;
        }

        .center-icon {
          width: 40px;
          height: 40px;
          color: #DB0B00;
          animation: sparkle 2s ease-in-out infinite;
        }

        @keyframes sparkle {
          0%, 100% { transform: scale(1) rotate(0deg); }
          50% { transform: scale(1.2) rotate(180deg); }
        }

        /* Spin Section */
        .spin-section {
          text-align: center;
          padding: 2rem;
          position: relative;
          z-index: 2;
        }

        .spin-button {
          background: linear-gradient(45deg, #FFD700, #FFA000);
          color: #000;
          border: none;
          padding: 1.5rem 4rem;
          border-radius: 50px;
          font-size: 1.3rem;
          font-weight: 900;
          cursor: pointer;
          transition: all 0.4s ease;
          text-transform: uppercase;
          letter-spacing: 2px;
          box-shadow: 0 10px 30px rgba(255,215,0,0.4);
          position: relative;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
          margin: 0 auto;
        }

        .spin-button::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
          transition: left 0.5s ease;
        }

        .spin-button:hover::before {
          left: 100%;
        }

        .spin-button:hover:not(:disabled) {
          transform: translateY(-3px);
          box-shadow: 0 15px 40px rgba(255,215,0,0.5);
        }

        .spin-button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .spin-button.spinning {
          animation: buttonPulse 0.5s ease-in-out infinite;
        }

        @keyframes buttonPulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(0.95); }
        }

        .spin-text {
          font-size: 1.3rem;
        }

        .spin-cost {
          font-size: 0.9rem;
          opacity: 0.8;
        }

        .spin-info {
          color: #FFD9F0;
          margin-top: 1rem;
          font-size: 0.9rem;
        }

        /* Prize Modal */
        .prize-modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0,0,0,0.85);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          animation: fadeIn 0.3s ease;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .prize-modal {
          background: #F0F2E4;
          border-radius: 30px;
          padding: 3rem;
          max-width: 500px;
          width: 90%;
          position: relative;
          box-shadow: 0 30px 80px rgba(0,0,0,0.5);
          animation: slideIn 0.5s ease;
        }

        @keyframes slideIn {
          from { transform: translateY(50px) scale(0.9); opacity: 0; }
          to { transform: translateY(0) scale(1); opacity: 1; }
        }

        .modal-close {
          position: absolute;
          top: 20px;
          right: 20px;
          background: #DB0B00;
          color: white;
          border: none;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          font-size: 1.5rem;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .modal-close:hover {
          transform: rotate(90deg);
        }

        .prize-content {
          text-align: center;
        }

        .prize-icon {
          font-size: 5rem;
          margin-bottom: 1rem;
          animation: bounceIn 0.8s ease;
        }

        @keyframes bounceIn {
          0% { transform: scale(0); }
          50% { transform: scale(1.2); }
          100% { transform: scale(1); }
        }

        .prize-name {
          font-family: 'Bukhari Script', cursive;
          font-size: 2.5rem;
          color: #DB0B00;
          margin-bottom: 1rem;
        }

        .prize-value {
          font-size: 1.8rem;
          font-weight: 800;
          color: #333;
          margin-bottom: 0.5rem;
        }

        .prize-details {
          color: #666;
          font-size: 1.1rem;
          margin-bottom: 1.5rem;
        }

        .rarity-badge {
          display: inline-block;
          padding: 8px 20px;
          border-radius: 20px;
          font-size: 0.8rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-bottom: 2rem;
        }

        .rarity-badge.common {
          background: #808080;
          color: white;
        }

        .rarity-badge.rare {
          background: #4169E1;
          color: white;
        }

        .rarity-badge.epic {
          background: #9400D3;
          color: white;
        }

        .rarity-badge.legendary {
          background: #FFD700;
          color: #333;
        }

        .rarity-badge.mythic {
          background: linear-gradient(45deg, #FF1744, #FFD700);
          color: white;
        }

        .claim-btn {
          background: linear-gradient(45deg, #DB0B00, #FF1744);
          color: white;
          border: none;
          padding: 15px 40px;
          border-radius: 30px;
          font-size: 1.1rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s ease;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .claim-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 25px rgba(219,11,0,0.4);
        }

        /* Inventory Sidebar */
        .inventory-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0,0,0,0.8);
          z-index: 1000;
          animation: fadeIn 0.3s ease;
        }

        .inventory-sidebar {
          position: fixed;
          right: 0;
          top: 0;
          bottom: 0;
          width: 400px;
          max-width: 90%;
          background: #F0F2E4;
          box-shadow: -10px 0 40px rgba(0,0,0,0.3);
          animation: slideInRight 0.3s ease;
          display: flex;
          flex-direction: column;
        }

        @keyframes slideInRight {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }

        .inventory-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 2rem;
          border-bottom: 2px solid #FFD9F0;
        }

        .inventory-header h2 {
          font-family: 'Bukhari Script', cursive;
          font-size: 2rem;
          color: #DB0B00;
        }

        .close-inventory {
          background: none;
          border: none;
          color: #DB0B00;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .close-inventory:hover {
          transform: rotate(90deg);
        }

        .inventory-content {
          flex: 1;
          overflow-y: auto;
          padding: 2rem;
        }

        .empty-inventory {
          text-align: center;
          color: #666;
          font-size: 1.1rem;
          margin-top: 3rem;
        }

        .prize-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .prize-item {
          background: white;
          border-radius: 15px;
          padding: 1.5rem;
          display: flex;
          align-items: center;
          gap: 1rem;
          box-shadow: 0 5px 15px rgba(0,0,0,0.1);
          transition: all 0.3s ease;
          border-left: 5px solid #DB0B00;
        }

        .prize-item:hover {
          transform: translateX(-5px);
          box-shadow: 0 8px 20px rgba(0,0,0,0.2);
        }

        .prize-item.rare {
          border-left-color: #4169E1;
        }

        .prize-item.epic {
          border-left-color: #9400D3;
        }

        .prize-item.legendary {
          border-left-color: #FFD700;
        }

        .prize-item.mythic {
          border-left-color: #FF1744;
        }

        .prize-item-icon {
          font-size: 2rem;
        }

        .prize-item-info h4 {
          font-size: 1.1rem;
          color: #333;
          margin-bottom: 0.3rem;
        }

        .prize-item-info p {
          color: #666;
          font-size: 0.9rem;
        }

        .prize-count {
          margin-left: auto;
          background: #DB0B00;
          color: white;
          padding: 5px 15px;
          border-radius: 20px;
          font-weight: 700;
        }

        .inventory-footer {
          padding: 2rem;
          border-top: 2px solid #FFD9F0;
        }

        .redeem-btn {
          width: 100%;
          background: linear-gradient(45deg, #FFD700, #FFA000);
          color: #000;
          border: none;
          padding: 15px;
          border-radius: 25px;
          font-size: 1.1rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s ease;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .redeem-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(255,215,0,0.4);
        }

        /* Notifications */
        .notifications {
          position: fixed;
          top: 20px;
          right: 20px;
          z-index: 1001;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .notification {
          background: white;
          padding: 1rem 2rem;
          border-radius: 10px;
          box-shadow: 0 5px 20px rgba(0,0,0,0.2);
          animation: slideInNotification 0.3s ease;
          min-width: 250px;
        }

        @keyframes slideInNotification {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }

        .notification.success {
          border-left: 5px solid #4CAF50;
        }

        .notification.error {
          border-left: 5px solid #DB0B00;
        }

        .notification.info {
          border-left: 5px solid #2196F3;
        }

        /* Mobile Responsive */
        @media (max-width: 768px) {
          .header-title {
            font-size: 3rem;
          }

          .info-bar {
            flex-direction: column;
            gap: 1rem;
            margin: -20px 1rem 2rem;
          }

          .points-display {
            width: 100%;
            justify-content: center;
          }

          .inventory-btn {
            width: 100%;
            justify-content: center;
          }

          .wheel-container {
            max-width: 350px;
          }

          .spin-button {
            padding: 1.2rem 3rem;
            font-size: 1.1rem;
          }

          .prize-modal {
            padding: 2rem;
          }

          .prize-icon {
            font-size: 4rem;
          }

          .prize-name {
            font-size: 2rem;
          }

          .inventory-sidebar {
            width: 100%;
          }
        }

        @media (max-width: 480px) {
          .header-logo {
            width: 80px;
            height: 80px;
          }

          .header-title {
            font-size: 2.5rem;
          }

          .wheel-container {
            max-width: 300px;
          }

          .floating-icon {
            font-size: 3rem;
          }

          .notifications {
            left: 20px;
            right: 20px;
          }

          .notification {
            min-width: auto;
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
};

export default BirriaRoulette;