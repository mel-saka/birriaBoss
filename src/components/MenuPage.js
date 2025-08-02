import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const MenuPage = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [isApple, setIsApple] = useState(false);
  const navigate = useNavigate();

  // Detect Apple device (same as Home)
  useEffect(() => {
    const ua = navigator.userAgent || navigator.vendor || window.opera;
    const isiOS = /iPad|iPhone|iPod/.test(ua);
    const isMacTouch = /Macintosh/.test(ua) && navigator.maxTouchPoints > 0;
    const isMac = /Macintosh/.test(ua) && !isMacTouch;
    const apple = isiOS || isMac || isMacTouch;
    setIsApple(apple);
    console.log(`[BirriaBoss] Apple device detected (menu): ${apple}`, { isiOS, isMac, isMacTouch, ua });
  }, []);

  // Apple-only: register self-hosted Bukhari font (same as Home)
  useEffect(() => {
    if (!isApple) return;
    const style = document.createElement('style');
    style.setAttribute('data-bukhari-local', '');
    style.textContent = `
      @font-face {
        font-family: 'BukhariLocal';
        src: url('/fonts/bukhari-script.woff2') format('woff2'),
             url('/fonts/bukhari-script.woff') format('woff');
        font-weight: 400;
        font-style: normal;
        font-display: swap;
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, [isApple]);

  // Optional: log when the non-Apple face loads (helps verify)
  useEffect(() => {
    if (!('fonts' in document)) return;
    document.fonts.load('400 1em "Bukhari Script"').then(() => {
      console.log('[Fonts] "Bukhari Script" loaded (menu)');
    });
  }, []);

  const menuItems = [
    {
      id: 1,
      name: "3 Birria Tacos",
      price: 24.0,
      description:
        "3 delicious tacos, crisped on the grill with melted cheese and slow-cooked birria beef. Topped with fresh onions and cilantro. Served with consomme for dipping.",
      image: "/images/menu.jpg",
      tag: "CUSTOMER FAVORITE",
      category: "Tacos",
    },
    {
      id: 2,
      name: "Single Birria Taco",
      price: 11.7,
      description:
        "Single birria beef taco grilled to perfection with cheese, onion & cilantro. Served with consomme.",
      image: "/images/taco.jpg",
      category: "Tacos",
    },
    {
      id: 3,
      name: "Birria Quesadilla",
      price: 26.0,
      description:
        'Our delicious birria beef served in a 12" tortilla and grilled to crispy perfection with melted cheese.',
      image: "/images/qass.jpg",
      category: "Quesadillas",
    },
    {
      id: 4,
      name: "Birria Ramen",
      price: 19.0,
      description:
        "Buldak ramen cooked in our mouthwatering birria consomme broth, topped with tender birria beef.",
      image: "/images/ramen.jpg",
      tag: "CUSTOMER FAVORITE",
      category: "Fusion",
    },
    // Removed Birria Pizza
    {
      id: 6,
      name: "Consomme Cup",
      price: 5.0,
      description:
        "Our signature beef broth, slow-cooked for hours with Mexican spices and chiles.",
      image: "/images/taco.jpg",
      tag: "ESSENTIAL",
      category: "Sides",
    },
    {
      id: 7,
      name: "Fresh Iced Mint Limeade",
      price: 9.0,
      description:
        "A refreshing blend of fresh lime juice and mint leaves over ice.",
      image: "/images/limeade.jpg",
      category: "Beverages",
    },
  ];

  const handleCardClick = (item) => setSelectedItem(item);
  const closeModal = () => setSelectedItem(null);

  return (
    <div className={`birria-menu-container ${isApple ? 'apple-device' : ''}`}>
      {/* Back to Home (top-right) */}
      <button className="back-home-btn" onClick={() => navigate("/home")}>
        Back to Home
      </button>

      {/* Animated Background Elements */}
      <div className="background-elements">
        <div className="floating-taco taco-1">🌮</div>
        <div className="floating-taco taco-2">🌶️</div>
        <div className="floating-taco taco-3">🔥</div>
        <div className="pattern-overlay"></div>
      </div>

      {/* Header */}
      <header className="menu-header">
        <div className="header-content">
          <img
            src="/images/Birria_Boss_favicon_white.PNG"
            alt="Birria Boss"
            className="header-logo"
          />
          <h1 className="menu-title">OUR MENU</h1>
          <p className="menu-subtitle">CHRISTCHURCH'S VIRAL FOOD DESTINATION</p>
        </div>
      </header>

      {/* Menu Grid */}
      <div className="menu-grid-container">
        <div className="menu-grid">
          {menuItems.map((item, index) => (
            <div
              key={item.id}
              className={`menu-card ${hoveredCard === item.id ? "hovered" : ""}`}
              onClick={() => handleCardClick(item)}
              onMouseEnter={() => setHoveredCard(item.id)}
              onMouseLeave={() => setHoveredCard(null)}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="card-image-container">
                <img src={item.image} alt={item.name} className="card-image" />
                {item.tag && <div className="card-tag">{item.tag}</div>}
                <div className="card-overlay"></div>
              </div>
              <div className="card-content">
                <h3 className="card-title">{item.name}</h3>
                <p className="card-description">{item.description}</p>
                <div className="card-footer">
                  <span className="card-price">${item.price.toFixed(2)}</span>
                  <button
                    className="order-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      window.open(
                        "https://www.ubereats.com/nz/store/birria-boss/4xeB2_1fR0WuKM3mFMMbWw",
                        "_blank"
                      );
                    }}
                  >
                    ORDER NOW
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div className="cta-section">
        <h2>READY TO BOSS UP YOUR BITE?</h2>
        <p>Order now on Uber Eats for delivery straight to your door!</p>
        <button
          className="main-order-btn"
          onClick={() =>
            window.open(
              "https://www.ubereats.com/nz/store/birria-boss/4xeB2_1fR0WuKM3mFMMbWw",
              "_blank"
            )
          }
        >
          ORDER ON UBER EATS
        </button>
      </div>

      {/* Modal */}
      {selectedItem && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-modal" onClick={closeModal}>×</button>
            <div className="modal-image-section">
              <img src={selectedItem.image} alt={selectedItem.name} className="modal-image" />
              {selectedItem.tag && <div className="modal-tag">{selectedItem.tag}</div>}
            </div>
            <div className="modal-info">
              <h2 className="modal-title">{selectedItem.name}</h2>
              <p className="modal-description">{selectedItem.description}</p>
              <div className="modal-price">${selectedItem.price.toFixed(2)}</div>
              <button
                className="modal-order-btn"
                onClick={() =>
                  window.open(
                    "https://www.ubereats.com/nz/store/birria-boss/4xeB2_1fR0WuKM3mFMMbWw",
                    "_blank"
                  )
                }
              >
                ORDER THIS ITEM
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        /* GLOBAL: Match Home's file names exactly for non-Apple */
        @font-face {
          font-family: 'Bukhari Script';
          src: url('/fonts/bukhari-script.woff2') format('woff2'),
               url('/fonts/bukhari-script.woff') format('woff');
          font-weight: 400;
          font-style: normal;
          font-display: swap;
        }

        * { margin: 0; padding: 0; box-sizing: border-box; }

        .birria-menu-container {
          min-height: 100vh;
          background-color: #DB0B00;
          font-family: 'Open Sans', Arial, sans-serif;
          position: relative;
          overflow-x: hidden;
        }

        /* Back Home Button */
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

        /* Background Elements */
        .background-elements { position: fixed; top: 0; left: 0; right: 0; bottom: 0; pointer-events: none; z-index: 1; }
        .floating-taco { position: absolute; font-size: 4rem; opacity: 0.1; animation: float 20s ease-in-out infinite; }
        .taco-1 { top: 20%; left: 10%; animation-duration: 25s; }
        .taco-2 { top: 60%; right: 15%; animation-duration: 30s; animation-delay: 5s; }
        .taco-3 { bottom: 20%; left: 50%; animation-duration: 22s; animation-delay: 10s; }

        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          25% { transform: translateY(-30px) rotate(10deg); }
          50% { transform: translateY(0) rotate(-5deg); }
          75% { transform: translateY(30px) rotate(5deg); }
        }

        .pattern-overlay {
          position: absolute; inset: 0;
          background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="taco-pattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse"><circle cx="20" cy="20" r="12" fill="none" stroke="white" stroke-width="1" opacity="0.05"/><circle cx="20" cy="20" r="5" fill="white" opacity="0.03"/></pattern></defs><rect width="100" height="100" fill="url(%23taco-pattern)"/></svg>') repeat;
          opacity: 0.5;
        }

        /* Header */
        .menu-header {
          background: linear-gradient(180deg, #DB0B00 0%, #B30A00 100%);
          padding: 4rem 2rem;
          text-align: center;
          position: relative;
          z-index: 2;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        }

        .header-content { max-width: 800px; margin: 0 auto; }
        .header-logo { width: 100px; height: 100px; margin-bottom: 2rem; filter: drop-shadow(0 5px 15px rgba(0, 0, 0, 0.3)); animation: logoFloat 3s ease-in-out infinite; }
        @keyframes logoFloat { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }

        .menu-title {
          font-family: 'Bukhari Script', cursive;
          font-weight: 400;
          font-size: clamp(3rem, 8vw, 5rem);
          color: #F0F2E4;
          margin-bottom: 1rem;
          text-shadow: 3px 3px 6px rgba(0, 0, 0, 0.3);
          letter-spacing: 3px;
          font-synthesis-weight: none;
        }

        .menu-subtitle {
          font-size: 1.2rem;
          color: #FFD9F0;
          font-weight: 600;
          letter-spacing: 2px;
          text-transform: uppercase;
        }

        /* Menu Grid */
        .menu-grid-container { max-width: 1400px; margin: -50px auto 0; padding: 0 2rem 4rem; position: relative; z-index: 3; }
        .menu-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(350px, 1fr)); gap: 2.5rem; padding-top: 2rem; }

        .menu-card {
          background: #F0F2E4; border-radius: 20px; overflow: hidden; cursor: pointer; transition: all 0.4s ease;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2); position: relative; animation: slideUp 0.6s ease-out forwards;
          opacity: 0; transform: translateY(30px);
        }
        @keyframes slideUp { to { opacity: 1; transform: translateY(0); } }

        .menu-card:hover { transform: translateY(-10px) scale(1.02); box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3); }

        .card-image-container { position: relative; height: 250px; overflow: hidden; background: linear-gradient(45deg, #FFB4E1, #FFD9F0); }
        .card-image { width: 100%; height: 100%; object-fit: cover; transition: transform 0.6s ease; }
        .menu-card:hover .card-image { transform: scale(1.1) rotate(2deg); }

        .card-overlay { position: absolute; inset: 0; background: linear-gradient(to bottom, transparent 0%, rgba(219, 11, 0, 0.2) 100%); opacity: 0; transition: opacity 0.4s ease; }
        .menu-card:hover .card-overlay { opacity: 1; }

        .card-tag {
          position: absolute; top: 15px; right: 15px; background: #EDBE4C; color: #DB0B00; padding: 8px 16px; border-radius: 25px;
          font-size: 0.8rem; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
          animation: tagPulse 2s ease-in-out infinite;
        }
        @keyframes tagPulse { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.05); } }

        .card-content { padding: 2rem; }

        .card-title {
          font-family: 'Bukhari Script', cursive;
          font-weight: 400;
          font-size: 1.8rem; color: #DB0B00; margin-bottom: 1rem; line-height: 1.2;
          font-synthesis-weight: none;
        }

        .card-description {
          color: #666; font-size: 0.95rem; line-height: 1.6; margin-bottom: 1.5rem;
          height: 3.6em; overflow: hidden; display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical;
        }

        .card-footer { display: flex; justify-content: space-between; align-items: center; }
        .card-price { font-size: 1.8rem; font-weight: 800; color: #DB0B00; text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1); }

        .order-btn {
          background: linear-gradient(45deg, #DB0B00, #FF1744); color: #F0F2E4; border: none; padding: 12px 24px; border-radius: 25px;
          font-weight: 700; font-size: 0.9rem; cursor: pointer; transition: all 0.3s ease; text-transform: uppercase; letter-spacing: 1px;
          box-shadow: 0 5px 15px rgba(219, 11, 0, 0.3);
        }
        .order-btn:hover { transform: translateY(-2px); box-shadow: 0 8px 20px rgba(219, 11, 0, 0.4); background: linear-gradient(45deg, #FF1744, #DB0B00); }

        /* CTA Section */
        .cta-section {
          background: linear-gradient(135deg, #FFB4E1 0%, #FFD9F0 100%);
          padding: 5rem 2rem; text-align: center; margin-top: 4rem; position: relative; overflow: hidden;
        }
        .cta-section::before { content: ''; position: absolute; top: -50px; left: 0; right: 0; height: 100px; background: #DB0B00; transform: skewY(-3deg); }

        .cta-section h2 {
          font-family: 'Bukhari Script', cursive;
          font-weight: 400;
          font-size: 3rem; color: #DB0B00; margin-bottom: 1rem; text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
          font-synthesis-weight: none;
        }

        .cta-section p { font-size: 1.2rem; color: #666; margin-bottom: 2rem; }

        .main-order-btn {
          background: #DB0B00; color: #F0F2E4; border: none; padding: 18px 40px; border-radius: 50px; font-size: 1.1rem; font-weight: 700;
          cursor: pointer; transition: all 0.4s ease; text-transform: uppercase; letter-spacing: 2px; box-shadow: 0 10px 30px rgba(219, 11, 0, 0.4);
          position: relative; overflow: hidden;
        }
        .main-order-btn::before { content: ''; position: absolute; top: 0; left: -100%; width: 100%; height: 100%; background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent); transition: left 0.5s ease; }
        .main-order-btn:hover::before { left: 100%; }
        .main-order-btn:hover { transform: translateY(-3px); box-shadow: 0 15px 40px rgba(219, 11, 0, 0.5); }

        /* Modal */
        .modal-overlay { position: fixed; inset: 0; background: rgba(0, 0, 0, 0.85); display: flex; align-items: center; justify-content: center; z-index: 1000; padding: 2rem; animation: fadeIn 0.3s ease; }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }

        .modal-content {
          background: #F0F2E4; border-radius: 30px; max-width: 800px; width: 100%; overflow: hidden; position: relative; box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
          animation: slideIn 0.4s ease; display: grid; grid-template-columns: 1fr 1fr;
        }
        @keyframes slideIn { from { transform: translateY(50px) scale(0.9); opacity: 0; } to { transform: translateY(0) scale(1); opacity: 1; } }

        .close-modal { position: absolute; top: 20px; right: 20px; background: #DB0B00; color: #F0F2E4; border: none; width: 40px; height: 40px; border-radius: 50%; font-size: 1.5rem; cursor: pointer; transition: all 0.3s ease; z-index: 10; display: flex; align-items: center; justify-content: center; }
        .close-modal:hover { transform: rotate(90deg); background: #FF1744; }

        .modal-image-section { position: relative; height: 400px; background: linear-gradient(45deg, #FFB4E1, #FFD9F0); }
        .modal-image { width: 100%; height: 100%; object-fit: cover; }
        .modal-tag { position: absolute; top: 20px; left: 20px; background: #EDBE4C; color: #DB0B00; padding: 10px 20px; border-radius: 25px; font-size: 0.9rem; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; }

        .modal-info { padding: 3rem; display: flex; flex-direction: column; justify-content: center; }
        .modal-title {
          font-family: 'Bukhari Script', cursive;
          font-weight: 400;
          font-size: 2.5rem; color: #DB0B00; margin-bottom: 1.5rem; line-height: 1.2;
          font-synthesis-weight: none;
        }
        .modal-description { color: #666; font-size: 1.1rem; line-height: 1.6; margin-bottom: 2rem; }
        .modal-price { font-size: 2.5rem; font-weight: 800; color: #DB0B00; margin-bottom: 2rem; text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1); }

        .modal-order-btn {
          background: linear-gradient(45deg, #DB0B00, #FF1744); color: #F0F2E4; border: none; padding: 15px 30px; border-radius: 30px;
          font-size: 1rem; font-weight: 700; cursor: pointer; transition: all 0.3s ease; text-transform: uppercase; letter-spacing: 1px;
          box-shadow: 0 8px 25px rgba(219, 11, 0, 0.4); width: 100%;
        }
        .modal-order-btn:hover { transform: translateY(-2px); box-shadow: 0 10px 30px rgba(219, 11, 0, 0.5); }

        /* Mobile Responsive */
        @media (max-width: 1024px) {
          .menu-grid { grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem; }
        }

        @media (max-width: 768px) {
          .menu-header { padding: 3rem 1.5rem; }
          .menu-title { font-size: 3rem; }
          .menu-subtitle { font-size: 1rem; }
          .menu-grid-container { padding: 0 1rem 3rem; }
          .menu-grid { grid-template-columns: 1fr; gap: 1.5rem; }
          .card-content { padding: 1.5rem; }
          .modal-content { grid-template-columns: 1fr; max-height: 90vh; overflow-y: auto; }
          .modal-image-section { height: 250px; }
          .modal-info { padding: 2rem; }
          .modal-title { font-size: 2rem; }
          .cta-section h2 { font-size: 2rem; }
          .cta-section p { font-size: 1rem; }
        }

        @media (max-width: 480px) {
          .header-logo { width: 80px; height: 80px; }
          .menu-title { font-size: 2.5rem; }
          .card-title { font-size: 1.5rem; }
          .card-price { font-size: 1.5rem; }
          .order-btn { padding: 10px 20px; font-size: 0.8rem; }
          .floating-taco { font-size: 3rem; }
          .back-home-btn { top: 12px; right: 12px; padding: 8px 14px; }
        }

        /* ---- Apple-only: use self-hosted Bukhari (same as Home) ---- */
        .apple-device .menu-title,
        .apple-device .card-title,
        .apple-device .modal-title,
        .apple-device .cta-section h2 {
          font-family: 'BukhariLocal','Bukhari Script','Open Sans', Arial, sans-serif !important;
          font-weight: 400 !important;
          letter-spacing: 0.5px;
          font-synthesis-weight: none;
        }
        /* ---- End Apple-only overrides ---- */
      `}</style>
    </div>
  );
};

export default MenuPage;
