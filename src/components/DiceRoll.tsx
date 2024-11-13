import React, { useState } from 'react';
import { Dice1, Dice2, Dice3, Dice4, Dice5, Dice6 } from 'lucide-react';

interface DiceRollProps {
  onRoll: (steps: number) => void;
  disabled: boolean;
  setRolling: (rolling: boolean) => void;
  currentPlayer: number;
}

const diceIcons = [Dice1, Dice2, Dice3, Dice4, Dice5, Dice6];

const DiceRoll: React.FC<DiceRollProps> = ({ onRoll, disabled, setRolling, currentPlayer }) => {
  const [dice, setDice] = useState([1, 1]);
  const [isAnimating, setIsAnimating] = useState(false);

  const rollDice = () => {
    setRolling(true);
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
      setRolling(false);
    }, 500);
  };

  const Dice1Icon = diceIcons[dice[0] - 1];
  const Dice2Icon = diceIcons[dice[1] - 1];

  return (
    <div className="bg-white/10 rounded-xl p-3 sm:p-4">
      <div className={`flex justify-center gap-3 sm:gap-4 mb-3 sm:mb-4 ${isAnimating ? 'animate-bounce' : ''}`}>
        <div className="transform hover:rotate-12 transition-transform">
          <Dice1Icon className="w-10 h-10 sm:w-12 sm:h-12 text-white" />
        </div>
        <div className="transform hover:-rotate-12 transition-transform">
          <Dice2Icon className="w-10 h-10 sm:w-12 sm:h-12 text-white" />
        </div>
      </div>
      <button
        onClick={rollDice}
        disabled={disabled}
        className="w-full py-1.5 sm:py-2 px-3 sm:px-4 bg-gradient-to-r from-purple-600 to-indigo-600 
                 hover:from-purple-700 hover:to-indigo-700 disabled:from-gray-600 
                 disabled:to-gray-700 text-white rounded-lg transition-all transform
                 hover:scale-105 active:scale-95 text-sm sm:text-base font-medium"
      >
        {disabled ? '等待中...' : '掷骰子'}
      </button>
    </div>
  );
};

export default DiceRoll;