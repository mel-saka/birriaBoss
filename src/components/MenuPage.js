import React, { useState } from 'react';
import { Card } from 'primereact/card';
import MenuItemDetail from './MenuItemDetail';

const MenuPage = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [dialogVisible, setDialogVisible] = useState(false);

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
      //
    },
    {
        category: "Beverages",
        description: "Refreshing drinks to complement your meal",
        items: [
          {
            name: "Fresh Iced Mint Limeade",
            price: 9.00,  // You'll need to set the actual price
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
            price: 40.00, // You'll need to set the actual price
            description: "taste both of best worlds from our italian and mexiacan infusion pizza filled with mozzarella",
            image: "/images/pizza.jpg",
            tag: "Popular"
          }
        ]
    }
  ];

  const handleItemClick = (item) => {
    setSelectedItem(item);
    setDialogVisible(true);
  };

  return (
    <div className="menu-showcase">
      <style>{`
        .menu-showcase {
          max-width: 1200px;
          margin: 0 auto;
          padding: 3rem 1rem;
          background-color: #F0F2E4;
        }

        .menu-header {
          text-align: center;
          margin-bottom: 4rem;
          padding: 2rem;
          background: linear-gradient(45deg, #DB0B00, #FFB4E1);
          color: white;
          border-radius: 12px;
        }

        .menu-header h1 {
          font-size: 2.45vw;
          margin-bottom: 1rem;
        }

        .menu-item-image-container {
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .menu-item-image {
          width: 500px; /* Reduced width */
          height: 500px; /* Reduced height */
          object-fit: cover;
          border-radius: 8px;
        }

        .tag {
          font-size: 0.85rem;
          font-weight: bold;
          position: absolute;
          top: 10px;
          right: 10px;
          background-color: rgba(255, 255, 255, 0.8);
          padding: 4px 8px;
          border-radius: 4px;
        }
      `}</style>

      <div className="menu-header">
        <h1>Our Menu</h1>
        <p>Discover our authentic Mexican birria dishes, made with love and tradition. Each item is carefully prepared using our secret family recipes.</p>
      </div>

      {menuItems.map((category, index) => (
        <div key={index} className="category-section">
          <div className="category-header">
            <h2 className="category-title">{category.category}</h2>
            <p className="category-description">{category.description}</p>
          </div>
          <div className="menu-grid">
            {category.items.map((item, itemIndex) => (
              <Card 
                key={itemIndex} 
                className="menu-item-card"
                onClick={() => handleItemClick(item)}
              >
                <div className="menu-item-image-container">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="menu-item-image"
                  />
                  {item.tag && <div className="tag">{item.tag}</div>}
                </div>
                <div className="menu-item-content">
                  <div className="menu-item-header">
                    <h3 className="menu-item-name">{item.name}</h3>
                    <span className="menu-item-price">${item.price.toFixed(2)}</span>
                  </div>
                  <p className="menu-item-description">{item.description}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      ))}

      <MenuItemDetail 
        item={selectedItem}
        visible={dialogVisible}
        onHide={() => setDialogVisible(false)}
      />
    </div>
  );
};

export default MenuPage;