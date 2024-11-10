import React from 'react';
import { Card } from 'primereact/card';
import { useNavigate } from 'react-router-dom';
import { Utensils, Clock, Star, Car, Instagram, Phone, Trophy } from 'lucide-react';

const BrriaBossHome = () => {
  const navigate = useNavigate();

  const colors = {
    yellow: '#EDBE4C',
    white: '#F0F2E4',
    pink: '#FFD9F0',
    hotPink: '#FFB4E1',
    red: '#DB0B00',
    gray: '#808080',
  };

  const navigationCards = [
    {
      title: 'Menu',
      description: 'Explore our delicious offerings',
      icon: <Utensils size={48} />, // Reduced icon size for mobile
      link: '/menu'
    },
    {
      title: 'Opening Hours',
      description: 'Plan your visit',
      icon: <Clock size={48} />,
      link: '/hours'
    },
    {
      title: 'Reviews',
      description: 'See what our customers say',
      icon: <Star size={48} />,
      link: '/reviews'
    },
    {
      title: 'Order on Uber',
      description: 'Get delivery to your door',
      icon: <Car size={48} />,
      link: 'https://www.ubereats.com/nz/store/birria-boss/4xeB2_1fR0WuKM3mFMMbWw?utm_campaign=CM2508147-search-free-nonbrand-google-pas_e_all_acq_Global&utm_medium=search-free-nonbrand&utm_source=google-pas',
      external: true
    },
    {
      title: 'Instagram',
      description: 'Follow us for updates',
      icon: <Instagram size={48} />,
      link: 'https://www.instagram.com/birriabossnz/',
      external: true
    },
    {
      title: 'Contact',
      description: 'Get in touch with us',
      icon: <Phone size={48} />,
      link: '/contact'
    },
    
    {
      title: 'Play and Win',
      description: 'Win up to $1000',
      icon: <Trophy size={48} />,
      link: '/win'
    }
  ];

  const handleCardClick = (link, external) => {
    if (external) {
      window.open(link, '_blank');
    } else {
      navigate(link);
    }
  };

  return (
    <div className="brria-boss-home">
      {/* Header */}
      <div className="header">
        <h1>Brria Boss</h1>
        <p>Authentic Mexican Cuisine</p>
      </div>

      {/* Navigation Cards Grid */}
      <div className="container">
        <div className="card-grid">
          {navigationCards.map((card, index) => (
            <Card
              key={index}
              onClick={() => handleCardClick(card.link, card.external)}
              className="navigation-card"
            >
              <div className="card-content">
                <div className="card-icon">
                  {card.icon}
                </div>
                <h2 className="card-title">
                  {card.title}
                </h2>
                <p className="card-description">
                  {card.description}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Styles */}
      <style>{`
        .brria-boss-home {
          min-height: 100vh;
          background-color: ${colors.white};
          overflow-x: hidden;
        }

        .header {
          background: linear-gradient(45deg, ${colors.red}, ${colors.hotPink});
          padding: 1.5rem;
          text-align: center;
          color: ${colors.white};
          margin-bottom: 1rem;
        }

        .header h1 {
          font-size: clamp(2rem, 5vw, 2.5rem);
          font-weight: bold;
          margin-bottom: 0.5rem;
        }

        .header p {
          font-size: clamp(1rem, 3vw, 1.25rem);
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0.5rem;
        }

        .card-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(min(100%, 300px), 1fr));
          gap: 1rem;
          padding: 0.5rem;
        }

        .navigation-card {
          cursor: pointer;
          transition: all 0.3s ease;
          border: 2px solid ${colors.pink};
          height: 100%;
          background: ${colors.white};
        }

        .navigation-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
          border-color: ${colors.red};
        }

        .card-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          padding: clamp(1rem, 3vw, 1.5rem);
        }

        .card-icon {
          color: ${colors.red};
          margin-bottom: 1rem;
        }

        .card-title {
          font-size: clamp(1.25rem, 4vw, 1.5rem);
          font-weight: bold;
          color: ${colors.red};
          margin-bottom: 0.5rem;
        }

        .card-description {
          color: ${colors.gray};
          font-size: clamp(0.875rem, 2.5vw, 1rem);
        }

        /* Mobile-specific styles */
        @media (max-width: 768px) {
          .container {
            padding: 0.5rem;
          }

          .card-grid {
            gap: 0.75rem;
          }

          .navigation-card {
            margin-bottom: 0.5rem;
          }

          .card-content {
            padding: 1rem;
          }

          /* Disable hover effect on mobile */
          .navigation-card:hover {
            transform: none;
          }

          /* Add touch feedback instead */
          .navigation-card:active {
            transform: scale(0.98);
            background-color: ${colors.pink};
          }
        }

        /* Small screen optimizations */
        @media (max-width: 360px) {
          .header h1 {
            font-size: 1.75rem;
          }

          .header p {
            font-size: 0.9rem;
          }

          .card-title {
            font-size: 1.2rem;
          }

          .card-description {
            font-size: 0.8rem;
          }
        }
      `}</style>
    </div>
  );
};

export default BrriaBossHome;