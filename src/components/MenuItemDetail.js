import React from 'react';
import { Dialog } from 'primereact/dialog';
import { Divider } from 'primereact/divider';
import { Clock, AlertTriangle, Info, Salad, ChefHat, Star, Flame } from 'lucide-react';

const MenuItemDetail = ({ item, visible, onHide }) => {
  // Detailed information for each menu item
  const menuDetails = {
    "3 Birria Tacos with Consomme": {
      longDescription: "Experience the ultimate comfort food with our signature birria tacos. Each taco is stuffed with tender, slow-cooked beef that's been marinated in a blend of chiles and spices for hours. We grill them to perfection until the cheese is melted and the tortillas are crispy, creating that perfect contrast of textures in every bite.",
      ingredients: [
        "Corn tortillas",
        "Slow-cooked birria beef",
        "Melted Oaxaca cheese",
        "Fresh white onions",
        "Cilantro",
        "House-made consomme",
        "Lime wedges"
      ],
      preparationTime: "15-20 minutes",
      spiceLevel: "Medium",
      servingInfo: "Serves 1-2 people",
      dietaryInfo: "Contains dairy, gluten-free corn tortillas available"
    },
    "Single Birria Taco": {
      longDescription: "Our single birria taco is perfect for first-time tasters or as a quick snack. The tortilla is dipped in our rich consomme before being grilled until crispy, creating a perfect harmony of flavors in every bite.",
      ingredients: [
        "Corn tortilla",
        "Slow-cooked birria beef",
        "Melted Oaxaca cheese",
        "Fresh white onions",
        "Cilantro",
        "House-made consomme",
        "Lime wedge"
      ],
      preparationTime: "10-15 minutes",
      spiceLevel: "Medium",
      servingInfo: "Perfect for sampling",
      dietaryInfo: "Contains dairy, gluten-free corn tortillas available"
    },
    "Birria Quesadilla": {
      longDescription: "Our Birria Quesadilla takes the classic Mexican favorite to new heights. We stuff a large flour tortilla with our signature slow-cooked birria beef and a generous amount of melted cheese, then grill it until golden and crispy. The result is a perfect fusion of textures and flavors.",
      ingredients: [
        "12\" flour tortilla",
        "Slow-cooked birria beef",
        "Melted Oaxaca & Monterey Jack cheese blend",
        "Fresh white onions",
        "Cilantro",
        "House-made consomme",
        "Lime wedges"
      ],
      preparationTime: "15-20 minutes",
      spiceLevel: "Medium",
      servingInfo: "Serves 1-2 people",
      dietaryInfo: "Contains dairy and gluten"
    },
    "Birria Ramen": {
      longDescription: "A unique fusion dish that marries the rich flavors of Mexican birria with Japanese-style ramen. Our spicy Buldak noodles are cooked in our signature consomme broth, then topped with tender birria beef, creating an unforgettable cross-cultural dining experience.",
      ingredients: [
        "Buldak ramen noodles",
        "Slow-cooked birria beef",
        "House-made consomme broth",
        "Green onions",
        "Cilantro",
        "Lime wedge",
        "Special chili oil"
      ],
      preparationTime: "12-15 minutes",
      spiceLevel: "Hot",
      servingInfo: "Serves 1 person",
      dietaryInfo: "Contains gluten"
    },
    "Consomme Cup": {
      longDescription: "Our signature consomme is the heart of our birria dishes. This rich, flavorful broth is made by slow-cooking beef with a special blend of Mexican chiles and spices for hours until it develops its characteristic deep red color and complex flavor profile.",
      ingredients: [
        "Beef broth",
        "Guajillo chiles",
        "Ancho chiles",
        "Mexican spices",
        "Aromatics",
        "Fresh lime juice"
      ],
      preparationTime: "5 minutes",
      spiceLevel: "Mild",
      servingInfo: "8 oz serving",
      dietaryInfo: "Gluten-free"
    },
    "Fresh Iced Mint Limeade": {
    longDescription: "Our signature refreshing beverage combines freshly squeezed lime juice with hand-muddled mint leaves, lightly sweetened and served over ice. Perfect for cooling down with your spicy birria dishes.",
    ingredients: [
      "Fresh lime juice",
      "Mint leaves",
      "Simple syrup",
      "Filtered water",
      "Ice"
    ],
    preparationTime: "5 minutes",
    spiceLevel: "N/A",
    servingInfo: "16 oz serving",
    dietaryInfo: "Vegan, Gluten-free"
  },
  "BIRRIA PIZZA (Feeds 3)": {
    longDescription: "A creative fusion dish that combines our famous birria with Italian pizza traditions. We top our house-made pizza crust with birria meat, melted cheese, and traditional Mexican toppings for a unique and delicious experience.",
    ingredients: [
      "House-made pizza dough",
      "Slow-cooked birria beef",
      "Melted cheese blend",
      "Fresh onions",
      "Cilantro",
      "Special pizza sauce",
      "Choice of additional toppings"
    ],
    preparationTime: "20-25 minutes",
    spiceLevel: "Medium",
    servingInfo: "Serves 3 people",
    dietaryInfo: "Contains dairy and gluten"
  }
  };

  if (!item) return null;

  const details = menuDetails[item.name] || {};

  return (
    <Dialog 
      visible={visible} 
      onHide={onHide}
      header={item.name}
      style={{ width: '90vw', maxWidth: '1000px' }}
      className="menu-item-detail-dialog"
    >
      <style>{`
        .menu-item-detail-dialog .p-dialog-header {
          background: linear-gradient(45deg, #DB0B00, #FFB4E1);
          color: white;
        }

        .menu-item-detail-dialog .p-dialog-title {
          color: white;
          font-size: 1.8rem !important;
          font-weight: bold !important;
        }

        .dialog-content {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2rem;
          padding: 2rem;
        }

        .dialog-image-section {
          position: relative;
        }

        .dialog-image {
          width: 100%;
          height: 400px;
          object-fit: cover;
          border-radius: 12px;
          box-shadow: 0 4px 8px rgba(0,0,0,0.1);
        }

        .price-tag {
          position: absolute;
          top: 1rem;
          right: 1rem;
          background: linear-gradient(45deg, #DB0B00, #FFB4E1);
          color: white;
          padding: 0.5rem 1.5rem;
          border-radius: 20px;
          font-size: 1.2rem;
          font-weight: bold;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }

        .detail-section {
          background: #F8F8F8;
          padding: 1.5rem;
          border-radius: 8px;
          border-left: 4px solid #DB0B00;
          margin-bottom: 1rem;
        }

        .detail-section h4 {
          color: #DB0B00;
          margin-bottom: 0.5rem;
          font-size: 1.2rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .ingredients-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
          gap: 0.5rem;
          margin-top: 1rem;
        }

        .ingredient-item {
          background: white;
          padding: 0.5rem;
          border-radius: 8px;
          font-size: 0.9rem;
          text-align: center;
          box-shadow: 0 2px 4px rgba(0,0,0,0.05);
        }

        .info-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1rem;
          margin-top: 1rem;
        }

        .info-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: #666;
        }

        @media (max-width: 768px) {
          .dialog-content {
            grid-template-columns: 1fr;
          }

          .dialog-image {
            height: 300px;
          }

          .ingredients-grid {
            grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
          }
        }
      `}</style>

      <div className="dialog-content">
        <div className="dialog-image-section">
          <img src={item.image} alt={item.name} className="dialog-image" />
          <div className="price-tag">${item.price.toFixed(2)}</div>
        </div>

        <div className="dialog-details">
          <div className="detail-section">
            <h4><Info size={20} /> Description</h4>
            <p>{details.longDescription || item.description}</p>
          </div>

          {details.ingredients && (
            <div className="detail-section">
              <h4><Salad size={20} /> Ingredients</h4>
              <div className="ingredients-grid">
                {details.ingredients.map((ingredient, index) => (
                  <div key={index} className="ingredient-item">
                    {ingredient}
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="detail-section">
            <h4><Info size={20} /> Additional Information</h4>
            <div className="info-grid">
              {details.preparationTime && (
                <div className="info-item">
                  <Clock size={18} />
                  <span>Prep Time: {details.preparationTime}</span>
                </div>
              )}
              {details.spiceLevel && (
                <div className="info-item">
                  <Flame size={18} />
                  <span>Spice Level: {details.spiceLevel}</span>
                </div>
              )}
              {details.servingInfo && (
                <div className="info-item">
                  <ChefHat size={18} />
                  <span>{details.servingInfo}</span>
                </div>
              )}
              {details.dietaryInfo && (
                <div className="info-item">
                  <Info size={18} />
                  <span>{details.dietaryInfo}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default MenuItemDetail;