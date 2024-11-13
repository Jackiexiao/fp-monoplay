import React, { useEffect, useState } from 'react';
import { Player } from '../game/players';

interface PlayerTokenProps {
  player: Player;
  isCurrentPlayer: boolean;
  previousPosition?: number;
}

const PlayerToken: React.FC<PlayerTokenProps> = ({ 
  player, 
  isCurrentPlayer,
  previousPosition 
}) => {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (previousPosition !== undefined && previousPosition !== player.position) {
      setAnimate(true);
      const timer = setTimeout(() => setAnimate(false), 500);
      return () => clearTimeout(timer);
    }
  }, [player.position, previousPosition]);

  return (
    <div className="relative group/player">
      <div
        className={`
          w-5 h-5 sm:w-6 sm:h-6 rounded-full 
          border-2 shadow-lg
          transition-all duration-500
          ${animate ? 'scale-110 ring-2 ring-yellow-400/50' : 'scale-100'}
          ${isCurrentPlayer ? 'border-purple-400 shadow-purple-400/30' : 'border-white'}
        `}
        style={{ 
          backgroundColor: player.color,
          transform: animate ? 'translateY(-4px)' : 'translateY(0)'
        }}
      />
      <div className="absolute hidden group-hover/player:block bottom-full left-1/2 
                    -translate-x-1/2 mb-1 whitespace-nowrap bg-gray-900/95 
                    text-white px-2 py-1 rounded text-xs font-medium z-20
                    shadow-lg backdrop-blur-sm">
        {player.name}
      </div>
    </div>
  );
};

export default PlayerToken; 