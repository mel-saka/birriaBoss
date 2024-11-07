import React, { useState, useEffect } from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { ProgressSpinner } from 'primereact/progressspinner';
import { Clock, MapPin, Navigation, Calendar, AlertCircle } from 'lucide-react';

const OpeningHours = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isOpen, setIsOpen] = useState(false);
  const [nextOpeningTime, setNextOpeningTime] = useState(null);
  const [timeUntilOpen, setTimeUntilOpen] = useState('');
  const [timeUntilClose, setTimeUntilClose] = useState('');
  const [currentPeriod, setCurrentPeriod] = useState(null);

  const businessHours = {
    Sunday: [{ start: '10:30', end: '18:30' }],
    Monday: [], // Closed
    Tuesday: [], // Closed
    Wednesday: [
      { start: '11:30', end: '14:30' },
      { start: '15:00', end: '19:15' }
    ],
    Thursday: [
      { start: '11:30', end: '14:30' },
      { start: '15:00', end: '19:15' }
    ],
    Friday: [
      { start: '11:30', end: '14:30' },
      { start: '15:00', end: '19:15' }
    ],
    Saturday: [{ start: '10:30', end: '18:30' }]
  };

  const formatTimeRemaining = (timeDiff) => {
    const hours = Math.floor(timeDiff / (1000 * 60 * 60));
    const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);
    return `${hours}h ${minutes}m ${seconds}s`;
  };

  const checkIfOpen = () => {
    const now = new Date();
    const currentDay = now.toLocaleDateString('en-NZ', { weekday: 'long' });
    const currentHours = businessHours[currentDay];

    if (currentHours.length === 0) return false;

    const currentTime = now.getHours() + now.getMinutes() / 60;

    for (const period of currentHours) {
      const [startHour, startMinute] = period.start.split(':').map(Number);
      const [endHour, endMinute] = period.end.split(':').map(Number);
      const start = startHour + startMinute / 60;
      const end = endHour + endMinute / 60;
      
      if (currentTime >= start && currentTime <= end) {
        setCurrentPeriod({ start: period.start, end: period.end });
        return true;
      }
    }
    return false;
  };

  const calculateTimeUntilClose = () => {
    if (!currentPeriod) return '';
    
    const now = new Date();
    const [endHour, endMinute] = currentPeriod.end.split(':').map(Number);
    const closeTime = new Date(now);
    closeTime.setHours(endHour, endMinute, 0, 0);
    
    const timeDiff = closeTime - now;
    return formatTimeRemaining(timeDiff);
  };

  const calculateNextOpening = () => {
    const now = new Date();
    const currentDay = now.toLocaleDateString('en-NZ', { weekday: 'long' });
    const currentTime = now.getHours() + now.getMinutes() / 60;

    // Check remaining periods for current day
    const todayPeriods = businessHours[currentDay];
    for (const period of todayPeriods) {
      const [startHour, startMinute] = period.start.split(':').map(Number);
      const startTime = startHour + startMinute / 60;
      if (startTime > currentTime) {
        const nextOpen = new Date();
        nextOpen.setHours(startHour, startMinute, 0, 0);
        return nextOpen;
      }
    }

    // Check next days
    let daysToAdd = 1;
    while (daysToAdd <= 7) {
      const nextDate = new Date();
      nextDate.setDate(now.getDate() + daysToAdd);
      const nextDay = nextDate.toLocaleDateString('en-NZ', { weekday: 'long' });
      const periods = businessHours[nextDay];
      
      if (periods.length > 0) {
        const [startHour, startMinute] = periods[0].start.split(':').map(Number);
        const nextOpen = new Date();
        nextOpen.setDate(nextOpen.getDate() + daysToAdd);
        nextOpen.setHours(startHour, startMinute, 0, 0);
        return nextOpen;
      }
      daysToAdd++;
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setCurrentTime(now);
      const open = checkIfOpen();
      setIsOpen(open);
      
      if (!open) {
        const nextOpen = calculateNextOpening();
        setNextOpeningTime(nextOpen);
        if (nextOpen) {
          const timeDiff = nextOpen - now;
          setTimeUntilOpen(formatTimeRemaining(timeDiff));
        }
      } else {
        setTimeUntilClose(calculateTimeUntilClose());
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [currentPeriod]);

  return (
    <div className="opening-hours-page">
      <style>{`
        .opening-hours-page {
          max-width: 1200px;
          margin: 0 auto;
          padding: 2rem 1rem;
          background-color: #F0F2E4;
          min-height: 100vh;
        }

        .status-container {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
          margin-bottom: 3rem;
        }

        .status-card {
          background: white;
          border-radius: 24px;
          padding: 2rem;
          text-align: center;
          box-shadow: 0 8px 32px rgba(219, 11, 0, 0.1);
          transition: transform 0.3s ease;
          border: 2px solid transparent;
        }

        .status-card:hover {
          transform: translateY(-5px);
        }

        .status-open {
          border-color: #4CAF50;
        }

        .status-closed {
          border-color: #DB0B00;
        }

        .status-indicator {
          font-size: 2rem;
          font-weight: bold;
          margin: 1rem 0;
          padding: 1.5rem;
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1rem;
        }

        .status-open .status-indicator {
          background: linear-gradient(45deg, #4CAF50, #81C784);
          color: white;
        }

        .status-closed .status-indicator {
          background: linear-gradient(45deg, #DB0B00, #FFB4E1);
          color: white;
        }

        .countdown {
          font-size: 1.5rem;
          font-weight: bold;
          color: #333;
          margin-top: 1rem;
        }

        .hours-container {
          background: white;
          border-radius: 24px;
          padding: 2rem;
          margin-bottom: 2rem;
          box-shadow: 0 8px 32px rgba(219, 11, 0, 0.1);
        }

        .hours-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          gap: 1.5rem;
          margin-top: 2rem;
        }

        .day-card {
          background: linear-gradient(135deg, rgba(255,255,255,0.9), rgba(255,255,255,0.4));
          backdrop-filter: blur(10px);
          padding: 1.5rem;
          border-radius: 16px;
          transition: transform 0.3s ease;
          border: 2px solid #FFB4E1;
        }

        .day-card:hover {
          transform: translateY(-3px);
        }

        .day-card.today {
          border-color: #DB0B00;
          background: linear-gradient(135deg, #fff, #FFE4F3);
        }

        .day-header {
          font-size: 1.2rem;
          font-weight: bold;
          color: #DB0B00;
          margin-bottom: 1rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .time-slot {
          background: white;
          padding: 0.5rem;
          border-radius: 8px;
          margin-bottom: 0.5rem;
          font-size: 1rem;
          color: #333;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .closed-day {
          color: #DB0B00;
          font-style: italic;
        }

        .location-card {
          background: white;
          border-radius: 24px;
          padding: 2rem;
          margin-top: 2rem;
          box-shadow: 0 8px 32px rgba(219, 11, 0, 0.1);
        }

        .location-header {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1.5rem;
          color: #DB0B00;
          font-size: 1.5rem;
          font-weight: bold;
        }

        .address-button {
          background: linear-gradient(45deg, #DB0B00, #FFB4E1);
          color: white;
          border: none;
          padding: 1rem 2rem;
          border-radius: 12px;
          font-size: 1.1rem;
          cursor: pointer;
          transition: transform 0.2s ease;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-top: 1rem;
        }

        .address-button:hover {
          transform: translateY(-2px);
        }

        @media (max-width: 768px) {
          .status-container {
            grid-template-columns: 1fr;
          }
          
          .status-indicator {
            font-size: 1.5rem;
          }
          
          .countdown {
            font-size: 1.2rem;
          }
        }
      `}</style>

      <div className="status-container">
        <Card className={`status-card ${isOpen ? 'status-open' : 'status-closed'}`}>
          <h2>Current Status</h2>
          <div className="status-indicator">
            {isOpen ? (
              <>
                <Clock size={32} />
                <span>We're Open!</span>
              </>
            ) : (
              <>
                <AlertCircle size={32} />
                <span>Currently Closed</span>
              </>
            )}
          </div>
          {isOpen ? (
            <div className="countdown">
              Closing in: {timeUntilClose}
            </div>
          ) : (
            <div className="countdown">
              Opens in: {timeUntilOpen}
            </div>
          )}
        </Card>
      </div>

      <div className="hours-container">
        <h2>Opening Hours</h2>
        <div className="hours-grid">
          {Object.entries(businessHours).map(([day, periods]) => {
            const isToday = day === currentTime.toLocaleDateString('en-NZ', { weekday: 'long' });
            return (
              <div key={day} className={`day-card ${isToday ? 'today' : ''}`}>
                <div className="day-header">
                  <Calendar size={20} />
                  {day}
                  {isToday && <span>(Today)</span>}
                </div>
                {periods.length === 0 ? (
                  <div className="closed-day">Closed</div>
                ) : (
                  periods.map((period, index) => (
                    <div key={index} className="time-slot">
                      <Clock size={16} />
                      {period.start} - {period.end}
                    </div>
                  ))
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="location-card">
        <div className="location-header">
          <MapPin size={24} />
          <span>Find Us</span>
        </div>
        <p>The Arts Centre 17 Hereford Street, Christchurch Central City, Christchurch 8013</p>
        <Button 
          className="address-button"
          onClick={() => window.open('https://www.google.com/maps/place/Birria+Boss+NZ/@-43.5317432,172.6264813,17z/data=!3m1!4b1!4m6!3m5!1s0x6d318b5d703af845:0xd87a84a2e2e95096!8m2!3d-43.5317471!4d172.6290562!16s%2Fg%2F11y50bp1pl?entry=ttu&g_ep=EgoyMDI0MTAyOS4wIKXMDSoASAFQAw%3D%3D', '_blank')}
        >
          <Navigation size={20} />
          Get Directions
        </Button>
      </div>
    </div>
  );
};

export default OpeningHours;