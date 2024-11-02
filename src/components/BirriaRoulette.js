import React, { useState, useCallback, useEffect } from 'react';
import { Wheel } from 'react-custom-roulette';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Sidebar } from 'primereact/sidebar';
import { Trophy, Star, Camera, X } from 'lucide-react';

const BirriaRoulette = () => {
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);
  const [points, setPoints] = useState(125);
  const [visibleInventory, setVisibleInventory] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [dialogMessage, setDialogMessage] = useState('');
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
    { name: "3 Tacos + Consomme", color: colors.red, icon: <Trophy />, weight: 20, value: "$28.90" },
    { name: "10 Giveaways Entries", color: colors.yellow, icon: <Star />, weight: 500, value: "Giveaway" },
    { name: "Birria Ramen", color: colors.pink, icon: <Camera />, weight: 20, value: "$24.70" },
    { name: "100 Boss Points", color: colors.hotPink, icon: <Star />, points: 100, value: "Points", weight: 250 },
    { name: "Unlucky", color: colors.gray, icon: <X />, weight: 500, value: "Try Again" },
    { name: "Birria Quesadilla", color: colors.red, icon: <Trophy />, weight: 20, value: "$29.90" },
    { name: "25 Boss Points", color: colors.yellow, icon: <Star />, points: 25, value: "Points", weight: 333 },
    { name: "Mint Limeade", color: colors.pink, icon: <Camera />, weight: 20, value: "$12.00" },
    { name: "15% Off Voucher", color: colors.hotPink, icon: <Star />, weight: 200, value: "Discount" },
    { name: "$100 Voucher", color: colors.red, icon: <Trophy />, weight: 10, value: "$100" },
    { name: "$1000 Cash Prize", color: colors.yellow, icon: <Star />, weight: 1, value: "$1000" },
    { name: "Royalty Stamp", color: colors.yellow, icon: <Star />, weight: 167, value: "Stamp" },
  ];

  const [inventory, setInventory] = useState({});

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
      setDialogMessage("Not enough points to spin.");
      setShowDialog(true);
    }
  };

  const handleSpinEnd = () => {
    setMustSpin(false);
    const selectedPrize = prizes[prizeNumber];
    setDialogMessage(selectedPrize.name === "Unlucky" ? "Better luck next time!" : `Congratulations! You won: ${selectedPrize.name}`);
    setShowDialog(true);

    if (selectedPrize.name !== "Unlucky") {
      addToInventory(selectedPrize);
    }
  };

  return (
    <div style={{ backgroundColor: colors.white, minHeight: "100vh", padding: "2rem", display: "flex", flexDirection: "column", alignItems: "center" }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', maxWidth: '600px', marginBottom: '1rem', padding: '1rem', background: colors.pink, borderRadius: '8px' }}>
        <h1 style={{ color: colors.red, fontWeight: 'bold' }}>Spin & Win!</h1>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Trophy className="w-6 h-6" style={{ color: colors.red, marginRight: '0.5rem' }} />
          <span style={{ fontSize: '1.5rem', color: colors.red, fontWeight: 'bold' }}>{points} Points</span>
          <Button icon="pi pi-list" onClick={() => setVisibleInventory(true)} className="p-button-rounded p-button-outlined" style={{ color: colors.red, borderColor: colors.red, marginLeft: '1rem' }} />
        </div>
      </div>

      <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
        <Wheel
          mustStartSpinning={mustSpin}
          prizeNumber={prizeNumber}
          data={prizes.map((prize) => ({ option: prize.name, style: { backgroundColor: prize.color } }))}
          onStopSpinning={handleSpinEnd}
          backgroundColors={[colors.yellow, colors.red, colors.pink, colors.gray]}
          textColors={[colors.white]}
          outerBorderColor={colors.red}
          outerBorderWidth={15}
          radiusLineColor={colors.white}
          radiusLineWidth={3}
          fontSize={12}
          textDistance={70}
          renderIcon={(icon, index) => (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              {prizes[index].icon}
              <span style={{ color: colors.white, fontSize: '10px', fontWeight: 'bold' }}>{prizes[index].name}</span>
            </div>
          )}
        />
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

      <Dialog header="Spin Result" visible={showDialog} onHide={() => setShowDialog(false)} style={{ width: '50vw', background: colors.white }}>
        <p style={{ color: colors.red, fontWeight: 'bold', textAlign: 'center' }}>{dialogMessage}</p>
        <Button label="Close" onClick={() => setShowDialog(false)} className="p-button-secondary" style={{ marginTop: '1rem', display: 'block', marginLeft: 'auto', marginRight: 'auto' }} />
      </Dialog>

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
