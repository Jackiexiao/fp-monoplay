import React, { useState } from 'react';
import { Dice1, Dice2, Dice3, Dice4, Dice5, Dice6 } from 'lucide-react';

interface DiceRollProps {
  onRoll: (steps: number) => void;
  disabled: boolean;
  className?: string;
}

const diceIcons = [Dice1, Dice2, Dice3, Dice4, Dice5, Dice6];

const DiceRoll: React.FC<DiceRollProps> = ({ onRoll, disabled, className }) => {
  const [dice, setDice] = useState([1, 1]);
  const [isAnimating, setIsAnimating] = useState(false);

  const rollDice = () => {
    if (disabled || isAnimating) return;
    
    setIsAnimating(true);
    
    const rollInterval = setInterval(() => {
      setDice([
        Math.floor(Math.random() * 6) + 1,
        Math.floor(Math.random() * 6) + 1
      ]);
    }, 50);

    setTimeout(() => {
      clearInterval(rollInterval);
      const finalDice = [
        Math.floor(Math.random() * 6) + 1,
        Math.floor(Math.random() * 6) + 1
      ];
      setDice(finalDice);
      setIsAnimating(false);
      onRoll(finalDice[0] + finalDice[1]);
    }, 500);
  };

  const Dice1Icon = diceIcons[dice[0] - 1];
  const Dice2Icon = diceIcons[dice[1] - 1];

  return (
    <button
      onClick={rollDice}
      disabled={disabled || isAnimating}
      className={`${className} ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'} 
                  transition-all duration-200 ease-in-out`}
    >
      <div className={`flex gap-2 ${isAnimating ? 'animate-bounce' : ''}`}>
        <div className="transform hover:rotate-12 transition-transform">
          <Dice1Icon />
        </div>
        <div className="transform hover:-rotate-12 transition-transform">
          <Dice2Icon />
        </div>
      </div>
    </button>
  );
};

export default DiceRoll;