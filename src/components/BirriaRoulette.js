import React, { useState, useCallback, useEffect, useRef } from 'react';
import { Wheel } from 'react-custom-roulette';
import { Button } from 'primereact/button';
import { Sidebar } from 'primereact/sidebar';
import { Toast } from 'primereact/toast';
import { Trophy, Star, Camera, X } from 'lucide-react';

const BirriaRoulette = () => {
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);
  const [points, setPoints] = useState(100);
  const [visibleInventory, setVisibleInventory] = useState(false);
  const spinCost = 25;
  const toastRef = useRef(null); // Reference for toast notifications
  const [wonPrize, setWonPrize] = useState(null); // Track the latest prize won to trigger inventory update toast

  const colors = {
    yellow: '#EDBE4C',
    white: '#F0F2E4',
    pink: '#FFD9F0',
    hotPink: '#FFB4E1',
    red: '#DB0B00',
    gray: '#808080',
  };

  const prizes = [
    { name: "$100 Voucher", color: colors.yellow, textColor: colors.red, icon: <Trophy />, weight: 10, value: "$100" },
    { name: "Unlucky", color: colors.gray, textColor: colors.white, icon: <X />, weight: 500, value: "Try Again" },
    { name: "$1000 Cash Prize", color: colors.yellow, textColor: colors.red, icon: <Star />, weight: 1, value: "$1000" },
    
    { name: "100 Boss Points", color: colors.red, textColor: colors.white, icon: <Star />, points: 100, value: "Points", weight: 250 },
    { name: "25 Boss Points", color: colors.red, textColor: colors.white, icon: <Star />, points: 25, value: "Points", weight: 333 },
    
    { name: "Mint Limeade", color: colors.hotPink, textColor: colors.red, icon: <Camera />, weight: 20, value: "$12.00" },
    { name: "Birria Ramen", color: colors.hotPink, textColor: colors.red, icon: <Camera />, weight: 20, value: "$24.70" },
    { name: "Birria Quesadilla", color: colors.hotPink, textColor: colors.red, icon: <Trophy />, weight: 20, value: "$29.90" },
    { name: "3 Tacos + Consomme", color: colors.hotPink, textColor: colors.red, icon: <Trophy />, weight: 20, value: "$28.90" },
    
    { name: "10 Giveaways Entries", color: colors.pink, textColor: colors.red, icon: <Star />, weight: 500, value: "Giveaway" },
    { name: "Royalty Stamp", color: colors.pink, textColor: colors.red, icon: <Star />, weight: 167, value: "Stamp" },
    { name: "15% Off Voucher", color: colors.pink, textColor: colors.red, icon: <Star />, weight: 200, value: "Discount" }
  ];
  const [inventory, setInventory] = useState({});
  const toastQueue = useRef([]); // Queue to store toast messages

  const showToast = (message) => {
    toastRef.current.show(message);
  };

  const processToastQueue = () => {
    if (toastQueue.current.length > 0) {
      const nextToast = toastQueue.current.shift();
      showToast({
        ...nextToast,
        onHide: processToastQueue, // Process the next toast after the current one hides
      });
    }
  };

  const addToToastQueue = (message) => {
    toastQueue.current.push(message);
    if (toastQueue.current.length === 1) {
      processToastQueue();
    }
  };

  const addToInventory = (prize) => {
    if (prize.points) {
      setPoints(prev => prev + prize.points);
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
  }, [prizes]);

  const handleSpinClick = () => {
    if (points >= spinCost) {
      setPoints(points - spinCost);
      const prizeIndex = getWeightedPrize();
      setPrizeNumber(prizeIndex);
      setMustSpin(true);
    } else {
      addToToastQueue({
        severity: 'warn',
        summary: 'Not enough points',
        detail: 'You need more points to spin.',
      });
    }
  };

  const handleSpinEnd = () => {
    setMustSpin(false);
    const selectedPrize = prizes[prizeNumber];

    if (selectedPrize.name !== "Unlucky") {
      addToInventory(selectedPrize);
      setWonPrize(selectedPrize); // Set wonPrize to trigger inventory update toast

      addToToastQueue({
        severity: 'success',
        summary: 'Congratulations!',
        detail: `You won: ${selectedPrize.name} (${selectedPrize.value})`,
        life: 3000,
      });
    } else {
      addToToastQueue({
        severity: 'info',
        summary: 'Spin Result',
        detail: 'Better luck next time!',
        life: 3000,
      });
    }
  };

  useEffect(() => {
    if (wonPrize) {
      const inventoryDetails = Object.values(inventory)
        .map(prize => `${prize.name} x${prize.count}`)
        .join(', ');
      addToToastQueue({
        severity: 'info',
        summary: 'Current Inventory',
        detail: inventoryDetails || 'No prizes won yet.',
        life: 3000,
      });
      setWonPrize(null); // Reset wonPrize after showing the inventory toast
    }
  }, [inventory, wonPrize]);

  return (
    <div style={{ backgroundColor: colors.white, minHeight: "100vh", padding: "2rem", display: "flex", flexDirection: "column", alignItems: "center" }}>
      <Toast ref={toastRef} /> {/* Toast for notifications */}

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', maxWidth: '600px', marginBottom: '1rem', padding: '1rem', background: colors.pink, borderRadius: '8px' }}>
        <h1 style={{ color: colors.red, fontWeight: 'bold' }}>Spin & Win!</h1>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Trophy className="w-6 h-6" style={{ color: colors.red, marginRight: '0.5rem' }} />
          <span style={{ fontSize: '1.5rem', color: colors.red, fontWeight: 'bold' }}>{points} Points</span>
          <Button icon="pi pi-list" onClick={() => setVisibleInventory(true)} className="p-button-rounded p-button-outlined" style={{ color: colors.red, borderColor: colors.red, marginLeft: '1rem' }} />
        </div>
      </div>

      <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
      <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', backgroundColor: colors.white }}>
      <Wheel
  mustStartSpinning={mustSpin}
  prizeNumber={prizeNumber}
  data={prizes.map((prize) => ({
    option: prize.name,
    style: {
      backgroundColor: prize.color,
      textColor: prize.textColor,
      fontSize: prize.name.length > 10 ? 10 : 12, // Adjust font size for long names
    },
  }))}
  onStopSpinning={handleSpinEnd}
  outerBorderColor={colors.red}
  outerBorderWidth={15}
  radiusLineColor={colors.white}
  radiusLineWidth={3}
  fontSize={12} // This sets the default, overridden by `data` fontSiz
  textDistance={60}
/>



</div>

      </div>

      <div style={{ position: 'fixed', bottom: '2rem', left: '50%', transform: 'translateX(-50%)', textAlign: 'center' }}>
        <Button
          label={mustSpin ? "Spinning..." : "Spin Now!"}
          onClick={handleSpinClick}
          disabled={mustSpin || points < spinCost}
          className="p-button-lg"
          style={{ background: `linear-gradient(45deg, ${colors.red}, ${colors.hotPink})`, color: colors.white, fontWeight: 'bold', padding: '1rem', width: '200px' }}
        />
        <p style={{ color: colors.red, marginTop: '0.5rem' }}>Each spin costs {spinCost} points</p>
      </div>

      <Sidebar visible={visibleInventory} onHide={() => setVisibleInventory(false)} fullScreen style={{ backgroundColor: colors.white }}>
        <h3 style={{ color: colors.red }}>My Prizes</h3>
        <ul>
          {Object.values(inventory).map((prize, index) => (
            <li key={index} style={{ color: colors.red, margin: '1rem 0', display: 'flex', alignItems: 'center' }}>
              {prize.icon}
              <span style={{ marginLeft: '0.5rem' }}>{prize.name}</span>
              {prize.count > 1 && <span style={{ marginLeft: '0.5rem' }}>x{prize.count}</span>}
            </li>
          ))}
        </ul>
      </Sidebar>
    </div>
  );
};

export default BirriaRoulette;