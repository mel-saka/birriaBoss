import React, { useState, useEffect } from 'react';

const MenuPage = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [focusedItemIndex, setFocusedItemIndex] = useState(0);

  const menuItems = [
    {
      category: "Birria Tacos",
      description: "Our signature dish - slow-cooked beef birria tacos served with rich consomme",
      items: [
        {
          name: "3 Birria Tacos with Consomme",
          price: 24.00,
          description: "3 delicious tacos, crisped on the grill with melted cheese and slow-cooked birria beef served with consomme for dipping. Topped with fresh onions and cilantro.",
          image: "/images/menu.jpg",
          tag: "Chef's Choice"
        },
        {
          name: "Single Birria Taco",
          price: 11.70,
          description: "Single birria beef taco grilled to perfection with cheese and onion & cilantro, served with consomme. Perfect for first-time tasters!",
          image: "/images/taco.jpg"
        }
      ]
    },
    {
      category: "Birria Quesadilla",
      description: "A Mexican classic reinvented with our signature birria beef",
      items: [
        {
          name: "Birria Quesadilla",
          price: 26.00,
          description: "Our delicious birria beef served in a 12\" tortilla and grilled to crispy perfection with melted cheese. A hearty meal that serves 1-2 people.",
          image: "/images/qass.jpg",
          tag: "Customer Favorite"
        }
      ]
    },
    {
      category: "Birria Ramen",
      description: "A unique fusion dish that combines Mexican and Asian flavors",
      items: [
        {
          name: "Birria Ramen",
          price: 19.00,
          description: "Buldak ramen, cooked in our mouthwatering birria consomme broth, topped with tender birria beef. A perfect blend of cultures in every bowl.",
          image: "/images/ramen.jpg",
          tag: "Must Try!"
        }
      ]
    },
    {
      category: "Consomme Cup",
      description: "The heart and soul of our birria dishes",
      items: [
        {
          name: "Consomme Cup",
          price: 5.00,
          description: "Our signature beef broth, slow-cooked for hours with a blend of Mexican spices and chiles. Perfect for dipping or sipping!",
          image: "/images/taco.jpg",
          tag: "Essential"
        }
      ]
    },
    {
      category: "Beverages",
      description: "Refreshing drinks to complement your meal",
      items: [
        {
          name: "Fresh Iced Mint Limeade",
          price: 9.00,
          description: "A refreshing blend of fresh lime juice and mint leaves over ice.",
          image: "/images/limeade.jpg",
          tag: "Popular"
        }
      ]
    },
    {
      category: "Birria Pizza",
      description: "Our unique Mexican-Italian fusion creation",
      items: [
        {
          name: "BIRRIA PIZZA",
          price: 40.00,
          description: "Taste both of best worlds from our Italian and Mexican infusion pizza filled with mozzarella",
          image: "/images/pizza.jpg",
          tag: "Popular"
        }
      ]
    }
  ];

  // Flatten all menu items for easier tracking
  const allMenuItems = menuItems.reduce((acc, category, categoryIndex) => {
    category.items.forEach((item, itemIndex) => {
      acc.push({
        ...item,
        categoryIndex,
        itemIndex,
        globalIndex: acc.length,
        category: category.category
      });
    });
    return acc;
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrollY(currentScrollY);
      
      // Calculate which item should be in focus based on scroll position
      const viewportHeight = window.innerHeight;
      const headerHeight = 600; // Approximate header height
      const itemTransitionHeight = 400; // Height per item transition (shorter for smoother transitions)
      
      const scrollFromContent = Math.max(0, currentScrollY - headerHeight);
      const newFocusIndex = Math.min(
        Math.floor(scrollFromContent / itemTransitionHeight),
        allMenuItems.length - 1
      );
      
      setFocusedItemIndex(Math.max(0, newFocusIndex));
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [allMenuItems.length]);

  const handleItemClick = (item) => {
    setSelectedItem(item);
    setDialogVisible(true);
  };

  const closeDialog = () => {
    setDialogVisible(false);
    setSelectedItem(null);
  };

  return (
    <div className="menu-showcase">
      {/* Parallax Background Elements */}
      <div className="parallax-bg">
        <div 
          className="floating-element element-1"
          style={{ transform: `translateY(${scrollY * 0.3}px) rotate(${scrollY * 0.1}deg)` }}
        >
          🌮
        </div>
        <div 
          className="floating-element element-2"
          style={{ transform: `translateY(${scrollY * 0.5}px) rotate(${-scrollY * 0.15}deg)` }}
        >
          🔥
        </div>
        <div 
          className="floating-element element-3"
          style={{ transform: `translateY(${scrollY * 0.2}px) rotate(${scrollY * 0.05}deg)` }}
        >
          🌶️
        </div>
        <div 
          className="floating-element element-4"
          style={{ transform: `translateY(${scrollY * 0.4}px) rotate(${-scrollY * 0.1}deg)` }}
        >
          🧀
        </div>
        <div 
          className="floating-element element-5"
          style={{ transform: `translateY(${scrollY * 0.6}px) rotate(${scrollY * 0.08}deg)` }}
        >
          🥄
        </div>
        <div 
          className="floating-element element-6"
          style={{ transform: `translateY(${scrollY * 0.25}px) rotate(${-scrollY * 0.12}deg)` }}
        >
          🌮
        </div>
      </div>
      {/* Header */}
      <div className="menu-header">
        <div 
          className="header-content"
          style={{ transform: `translateY(${scrollY * 0.2}px)` }}
        >
          <img 
            src="/images/Birria_Boss_favicon_white.PNG" 
            alt="Birria Boss Logo" 
            className="header-logo"
            style={{ transform: `translateY(${scrollY * 0.1}px) scale(${1 + scrollY * 0.0005})` }}
          />
          <h1 style={{ transform: `translateY(${scrollY * 0.15}px)` }}>Our Menu</h1>
          <p style={{ transform: `translateY(${scrollY * 0.25}px)` }}>Discover our authentic Mexican birria dishes, made with love and tradition. Each item is carefully prepared using our secret family recipes.</p>
        </div>
        <div 
          className="header-pattern"
          style={{ transform: `translateY(${scrollY * 0.5}px)` }}
        ></div>
      </div>

      {/* Menu Categories - Now organized for scroll focus */}
      <div className="menu-container">
        {/* Focused Item Display */}
        <div className="focused-item-section">
          {allMenuItems.map((item, globalIndex) => (
            <div
              key={globalIndex}
              className={`focus-menu-item ${globalIndex === focusedItemIndex ? 'focused' : ''}`}
              style={{
                opacity: globalIndex === focusedItemIndex ? 1 : 0,
                transform: `translate(-50%, -50%) scale(${globalIndex === focusedItemIndex ? 1 : 0.9})`,
                zIndex: globalIndex === focusedItemIndex ? 10 : 1
              }}
              onClick={() => handleItemClick(item)}
            >
              <div className="focus-item-content">
                <div className="focus-item-left">
                  <div className="category-badge">{item.category}</div>
                  <h2 className="focus-item-title">{item.name}</h2>
                  <p className="focus-item-description">{item.description}</p>
                  <div className="focus-item-price">${item.price.toFixed(2)}</div>
                  {item.tag && <div className="focus-tag">{item.tag}</div>}
                  <button 
                    className="focus-order-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      window.open('https://www.ubereats.com/nz/store/birria-boss/4xeB2_1fR0WuKM3mFMMbWw', '_blank');
                    }}
                  >
                    Order Now
                  </button>
                </div>
                <div className="focus-item-right">
                  <div className="focus-image-container">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="focus-item-image"
                      style={{ 
                        transform: `scale(${globalIndex === focusedItemIndex ? 1.1 : 1}) rotate(${scrollY * 0.01}deg)`,
                        filter: globalIndex === focusedItemIndex ? 'brightness(1.1) contrast(1.1)' : 'brightness(0.8)'
                      }}
                    />
                    <div className="focus-image-overlay"></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Scroll indicators */}
        <div className="scroll-indicators">
          {allMenuItems.map((_, index) => (
            <div
              key={index}
              className={`scroll-dot ${index === focusedItemIndex ? 'active' : ''}`}
              onClick={() => {
                const targetScroll = 600 + (index * 400); // Match the new itemTransitionHeight
                window.scrollTo({ top: targetScroll, behavior: 'smooth' });
              }}
            ></div>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div className="cta-section">
        <h2>Ready to Order?</h2>
        <p>Get your birria fix delivered straight to your door!</p>
        <button 
          onClick={() => window.open('https://www.ubereats.com/nz/store/birria-boss/4xeB2_1fR0WuKM3mFMMbWw', '_blank')}
          className="order-button"
        >
          Order on Uber Eats
        </button>
      </div>

      {/* Item Detail Modal */}
      {dialogVisible && selectedItem && (
        <div className="modal-overlay" onClick={closeDialog}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-button" onClick={closeDialog}>×</button>
            <div className="modal-body">
              <div className="modal-image-container">
                <img 
                  src={selectedItem.image} 
                  alt={selectedItem.name} 
                  className="modal-image"
                />
                {selectedItem.tag && <div className="modal-tag">{selectedItem.tag}</div>}
              </div>
              <div className="modal-details">
                <h2 className="modal-title">{selectedItem.name}</h2>
                <p className="modal-price">${selectedItem.price.toFixed(2)}</p>
                <p className="modal-description">{selectedItem.description}</p>
                <button 
                  onClick={() => window.open('https://www.ubereats.com/nz/store/birria-boss/4xeB2_1fR0WuKM3mFMMbWw', '_blank')}
                  className="order-button"
                >
                  Order Now
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .menu-showcase {
          min-height: 100vh;
          background-color: #DB0B00;
          font-family: 'Open Sans', Arial, sans-serif;
          position: relative;
          overflow-x: hidden;
        }

        /* Parallax Background */
        .parallax-bg {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 1;
        }

        .floating-element {
          position: absolute;
          font-size: 3rem;
          opacity: 0.3;
          pointer-events: none;
          filter: drop-shadow(2px 2px 4px rgba(0,0,0,0.3));
          animation: float 6s ease-in-out infinite;
        }

        .element-1 {
          top: 20%;
          left: 10%;
          animation-delay: 0s;
        }

        .element-2 {
          top: 40%;
          right: 15%;
          animation-delay: 1s;
        }

        .element-3 {
          top: 60%;
          left: 20%;
          animation-delay: 2s;
        }

        .element-4 {
          top: 80%;
          right: 25%;
          animation-delay: 3s;
        }

        .element-5 {
          top: 30%;
          left: 60%;
          animation-delay: 4s;
        }

        .element-6 {
          top: 70%;
          right: 40%;
          animation-delay: 5s;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }

        .menu-header {
          background: linear-gradient(135deg, #DB0B00 0%, #B30A00 100%);
          color: white;
          padding: 4rem 2rem;
          text-align: center;
          position: relative;
          overflow: hidden;
          z-index: 2;
          min-height: 60vh;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .menu-header::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="menu-pattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse"><circle cx="10" cy="10" r="6" fill="none" stroke="white" stroke-width="0.5" opacity="0.1"/></pattern></defs><rect width="100" height="100" fill="url(%23menu-pattern)"/></svg>') repeat;
          z-index: 1;
          animation: patternMove 20s linear infinite;
        }

        .header-pattern {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: radial-gradient(circle at 30% 70%, rgba(255, 180, 225, 0.2) 0%, transparent 50%),
                      radial-gradient(circle at 70% 30%, rgba(255, 217, 240, 0.2) 0%, transparent 50%);
          z-index: 1;
        }

        @keyframes patternMove {
          0% { transform: translateX(0px) translateY(0px); }
          100% { transform: translateX(100px) translateY(100px); }
        }

        .header-content {
          position: relative;
          z-index: 2;
          max-width: 800px;
          margin: 0 auto;
        }

        .header-logo {
          height: 80px;
          margin-bottom: 1rem;
        }

        .menu-header h1 {
          font-family: 'Bukhari Script', cursive;
          font-size: clamp(2.5rem, 5vw, 4rem);
          margin-bottom: 1rem;
          text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
        }

        .menu-header p {
          font-size: clamp(1rem, 2.5vw, 1.25rem);
          line-height: 1.6;
          font-weight: 400;
        }

        .menu-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 3rem 1rem;
          position: relative;
          z-index: 2;
          background: linear-gradient(180deg, transparent 0%, rgba(219, 11, 0, 0.95) 10%, rgba(219, 11, 0, 0.95) 90%, transparent 100%);
          min-height: 300vh; /* Reduced height for smoother scrolling */
        }

        /* Focused Item Styles */
        .focused-item-section {
          position: relative;
          height: auto;
          overflow: visible;
        }

        .focus-menu-item {
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 100%;
          max-width: 1200px;
          height: auto;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
          cursor: pointer;
          pointer-events: none;
        }

        .focus-menu-item.focused {
          opacity: 1 !important;
          transform: translate(-50%, -50%) scale(1) !important;
          pointer-events: all;
          z-index: 10;
        }

        .focus-item-content {
          display: grid;
          grid-template-columns: 1fr 1.2fr;
          gap: 4rem;
          align-items: center;
          width: 100%;
          max-width: 1100px;
          padding: 2rem;
        }

        .focus-item-left {
          color: white;
          position: relative;
          z-index: 5;
        }

        .category-badge {
          background: #FFB4E1;
          color: #DB0B00;
          padding: 8px 16px;
          border-radius: 20px;
          font-size: 0.9rem;
          font-weight: 700;
          display: inline-block;
          margin-bottom: 1rem;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .focus-item-title {
          font-family: 'Bukhari Script', cursive;
          font-size: clamp(2.5rem, 5vw, 4rem);
          color: white;
          margin-bottom: 1.5rem;
          text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
          line-height: 1.2;
        }

        .focus-item-description {
          font-size: clamp(1rem, 2vw, 1.3rem);
          line-height: 1.6;
          margin-bottom: 2rem;
          color: rgba(255, 255, 255, 0.9);
        }

        .focus-item-price {
          font-size: clamp(2rem, 4vw, 3rem);
          font-weight: 900;
          color: #FFD9F0;
          margin-bottom: 1.5rem;
          text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
        }

        .focus-tag {
          background: linear-gradient(45deg, #FFB4E1, #FFD9F0);
          color: #DB0B00;
          padding: 12px 20px;
          border-radius: 25px;
          font-size: 1rem;
          font-weight: 700;
          display: inline-block;
          margin-bottom: 2rem;
          text-transform: uppercase;
          letter-spacing: 1px;
          box-shadow: 0 4px 15px rgba(255, 180, 225, 0.4);
        }

        .focus-order-btn {
          background: linear-gradient(45deg, #FFB4E1, #FFD9F0);
          color: #DB0B00;
          border: none;
          padding: 18px 35px;
          font-size: 1.2rem;
          font-weight: 700;
          border-radius: 50px;
          cursor: pointer;
          transition: all 0.3s ease;
          text-transform: uppercase;
          letter-spacing: 1px;
          box-shadow: 0 6px 20px rgba(0,0,0,0.3);
          margin-top: 1rem;
        }

        .focus-order-btn:hover {
          transform: translateY(-3px) scale(1.05);
          box-shadow: 0 8px 25px rgba(0,0,0,0.4);
        }

        .focus-order-btn:active {
          transform: translateY(-1px) scale(1.02);
        }

        .focus-item-right {
          position: relative;
        }

        .focus-image-container {
          position: relative;
          height: 500px;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 10px 40px rgba(0,0,0,0.4);
        }

        .focus-item-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: all 0.6s ease;
        }

        .focus-image-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(45deg, rgba(255, 180, 225, 0.2), rgba(255, 217, 240, 0.2));
          opacity: 0.7;
        }

        /* Scroll Indicators */
        .scroll-indicators {
          position: fixed;
          right: 30px;
          top: 50%;
          transform: translateY(-50%);
          z-index: 100;
          display: flex;
          flex-direction: column;
          gap: 15px;
        }

        .scroll-dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.5);
          cursor: pointer;
          transition: all 0.3s ease;
          border: 2px solid transparent;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .scroll-dot::before {
          content: '';
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.5);
          transition: all 0.3s ease;
        }

        .scroll-dot.active::before {
          background: #FFB4E1;
          transform: scale(1.5);
          box-shadow: 0 0 15px rgba(255, 180, 225, 0.6);
        }

        .scroll-dot:hover::before {
          background: rgba(255, 255, 255, 0.8);
          transform: scale(1.2);
        }

        .category-section {
          margin-bottom: 4rem;
        }

        .category-header {
          text-align: center;
          margin-bottom: 2rem;
          padding: 2rem;
          background: linear-gradient(45deg, #FFD9F0, #FFB4E1);
          border-radius: 15px;
          box-shadow: 0 4px 15px rgba(219, 11, 0, 0.1);
        }

        .category-title {
          font-family: 'Bukhari Script', cursive;
          font-size: clamp(1.8rem, 4vw, 2.5rem);
          color: #DB0B00;
          margin-bottom: 0.5rem;
          text-shadow: 1px 1px 2px rgba(0,0,0,0.1);
        }

        .category-description {
          font-size: clamp(0.9rem, 2vw, 1.1rem);
          color: #666;
          font-weight: 500;
          line-height: 1.5;
        }

        .cta-section {
          background: linear-gradient(45deg, #DB0B00, #FFB4E1);
          color: white;
          text-align: center;
          padding: 3rem 2rem;
          margin: 2rem 0;
          position: relative;
          z-index: 2;
          overflow: hidden;
        }

        .cta-section::before {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          right: -50%;
          bottom: -50%;
          background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 60"><circle cx="30" cy="30" r="20" fill="none" stroke="white" stroke-width="1" opacity="0.1"/><circle cx="30" cy="30" r="10" fill="white" opacity="0.05"/></svg>') repeat;
          animation: rotatePattern 30s linear infinite;
          z-index: -1;
        }

        @keyframes rotatePattern {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .cta-section h2 {
          font-family: 'Bukhari Script', cursive;
          font-size: 2.5rem;
          margin-bottom: 1rem;
        }

        .cta-section p {
          font-size: 1.2rem;
          margin-bottom: 2rem;
        }

        .order-button {
          background: #FFB4E1;
          color: #DB0B00;
          border: none;
          padding: 15px 30px;
          font-size: 1.1rem;
          font-weight: 700;
          border-radius: 50px;
          cursor: pointer;
          transition: all 0.3s ease;
          text-transform: uppercase;
          letter-spacing: 1px;
          box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        }

        .order-button:hover {
          background: #FFD9F0;
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(0,0,0,0.3);
        }

        /* Modal Styles */
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0,0,0,0.8);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          padding: 2rem;
        }

        .modal-content {
          background: white;
          border-radius: 20px;
          max-width: 800px;
          width: 100%;
          max-height: 90vh;
          overflow-y: auto;
          position: relative;
        }

        .close-button {
          position: absolute;
          top: 15px;
          right: 20px;
          background: #DB0B00;
          color: white;
          border: none;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          font-size: 1.5rem;
          cursor: pointer;
          z-index: 1001;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .modal-body {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0;
        }

        .modal-image-container {
          position: relative;
          height: 400px;
        }

        .modal-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 20px 0 0 20px;
        }

        .modal-tag {
          position: absolute;
          top: 15px;
          left: 15px;
          background: #FFB4E1;
          color: #DB0B00;
          padding: 8px 12px;
          border-radius: 20px;
          font-size: 0.8rem;
          font-weight: 700;
        }

        .modal-details {
          padding: 2rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .modal-title {
          font-family: 'Bukhari Script', cursive;
          font-size: 2rem;
          color: #DB0B00;
          margin-bottom: 1rem;
        }

        .modal-price {
          font-size: 1.8rem;
          font-weight: 800;
          color: white;
          background: #DB0B00;
          padding: 10px 15px;
          border-radius: 10px;
          display: inline-block;
          margin-bottom: 1.5rem;
          width: fit-content;
        }

        .modal-description {
          color: #666;
          line-height: 1.6;
          margin-bottom: 2rem;
          font-size: 1.1rem;
        }

        /* Mobile Responsive */
        @media (max-width: 768px) {
          .modal-body {
            grid-template-columns: 1fr;
          }

          .modal-image {
            border-radius: 20px 20px 0 0;
          }

          .modal-image-container {
            height: 250px;
          }

          .header-logo {
            height: 60px;
          }

          /* Reduce parallax effects on mobile for better performance */
          .floating-element {
            font-size: 2rem;
            opacity: 0.2;
          }

          .menu-header {
            min-height: 50vh;
            padding: 2rem 1rem;
          }

          .menu-header h1 {
            font-size: 2.5rem;
          }

          .menu-header p {
            font-size: 1rem;
          }

          /* Mobile focused item layout */
          .focus-item-content {
            grid-template-columns: 1fr;
            gap: 1.5rem;
            text-align: center;
            padding: 1rem;
            max-width: 95vw;
          }

          .focus-menu-item {
            position: fixed;
            top: 55%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 100%;
            padding: 0.5rem;
          }

          .focus-image-container {
            height: 280px;
            order: -1;
            margin-bottom: 1rem;
            border-radius: 15px;
            box-shadow: 0 8px 25px rgba(0,0,0,0.3);
          }

          .focus-item-image {
            border-radius: 15px;
          }

          .focus-image-overlay {
            border-radius: 15px;
          }

          .focus-item-title {
            font-size: 2.2rem;
            margin-bottom: 1rem;
            line-height: 1.1;
          }

          .focus-item-description {
            font-size: 1rem;
            margin-bottom: 1.5rem;
            padding: 0 1rem;
            line-height: 1.5;
          }

          .focus-item-price {
            font-size: 2.2rem;
            margin-bottom: 1rem;
          }

          .category-badge {
            font-size: 0.8rem;
            padding: 6px 12px;
            margin-bottom: 0.5rem;
          }

          .focus-tag {
            font-size: 0.9rem;
            padding: 8px 16px;
            margin-bottom: 1rem;
          }

          .focus-order-btn {
            padding: 16px 28px;
            font-size: 1.1rem;
            margin-top: 0.5rem;
            box-shadow: 0 4px 20px rgba(255, 180, 225, 0.4);
          }

          .scroll-indicators {
            right: 15px;
            gap: 8px;
            bottom: 10%;
            top: auto;
            transform: none;
          }

          .scroll-dot {
            width: 8px;
            height: 8px;
          }

          .scroll-dot.active {
            transform: scale(1.8);
          }

          /* Adjust CTA section for mobile */
          .cta-section {
            padding: 2rem 1rem;
            margin: 1rem 0;
          }

          .cta-section h2 {
            font-size: 2rem;
          }

          .cta-section p {
            font-size: 1rem;
          }

          /* Better mobile menu container */
          .menu-container {
            padding: 2rem 0;
            min-height: 400vh;
          }
        }

        @media (max-width: 480px) {
          .menu-container {
            padding: 1rem 0;
            min-height: 350vh;
          }

          .menu-header {
            min-height: 45vh;
            padding: 1.5rem 0.5rem;
          }

          .menu-header h1 {
            font-size: 2rem;
            margin-bottom: 0.5rem;
          }

          .menu-header p {
            font-size: 0.9rem;
            padding: 0 1rem;
          }

          .header-logo {
            height: 50px;
            margin-bottom: 0.5rem;
          }

          .focus-item-content {
            padding: 0.5rem;
            gap: 1rem;
            max-width: 98vw;
          }

          .focus-menu-item {
            top: 60%;
            width: 100%;
            padding: 0.25rem;
          }

          .focus-item-title {
            font-size: 1.8rem;
            margin-bottom: 0.8rem;
          }

          .focus-item-description {
            font-size: 0.95rem;
            margin-bottom: 1rem;
            padding: 0 0.5rem;
          }

          .focus-item-price {
            font-size: 2rem;
            margin-bottom: 0.8rem;
          }

          .focus-order-btn {
            padding: 14px 24px;
            font-size: 1rem;
          }

          .focus-image-container {
            height: 240px;
            margin-bottom: 0.8rem;
            border-radius: 12px;
          }

          .focus-item-image {
            border-radius: 12px;
          }

          .focus-image-overlay {
            border-radius: 12px;
          }

          .category-badge {
            font-size: 0.75rem;
            padding: 5px 10px;
          }

          .focus-tag {
            font-size: 0.8rem;
            padding: 6px 12px;
            margin-bottom: 0.8rem;
          }

          .scroll-indicators {
            right: 10px;
            bottom: 8%;
            gap: 6px;
          }

          .scroll-dot {
            width: 6px;
            height: 6px;
            min-width: 44px; /* Touch-friendly tap area */
            min-height: 44px;
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .scroll-dot::before {
            content: '';
            width: 6px;
            height: 6px;
            border-radius: 50%;
            background: inherit;
            border: inherit;
            box-shadow: inherit;
          }

          .scroll-dot.active::before {
            transform: scale(2);
          }

          /* Floating elements for mobile */
          .floating-element {
            font-size: 1.5rem;
            opacity: 0.15;
          }

          /* Better CTA section */
          .cta-section {
            padding: 1.5rem 0.5rem;
          }

          .cta-section h2 {
            font-size: 1.8rem;
            margin-bottom: 0.5rem;
          }

          .cta-section p {
            font-size: 0.9rem;
            margin-bottom: 1.5rem;
          }

          .order-button {
            padding: 12px 24px;
            font-size: 1rem;
          }
        }

        @media (max-width: 480px) {
          .menu-container {
            padding: 2rem 0.5rem;
          }

          .category-header {
            padding: 1.5rem;
            margin: 0 0.5rem 2rem;
          }

          .menu-grid {
            padding: 0 0.5rem;
          }
        }
      `}</style>
    </div>
  );
};

export default MenuPage;