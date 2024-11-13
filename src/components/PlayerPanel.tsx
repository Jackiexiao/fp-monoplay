import React from 'react';
import { Player } from '../game/players';

interface PlayerPanelProps {
  players: Player[];
  currentPlayer: number;
}

const PlayerPanel: React.FC<PlayerPanelProps> = ({ players, currentPlayer }) => {
  return (
    <div className="bg-white/10 rounded-xl p-3 sm:p-4 space-y-3 sm:space-y-4">
      <h2 className="text-lg sm:text-xl font-bold text-white">玩家</h2>
      <div className="space-y-2 sm:space-y-3">
        {players.map((player, index) => (
          <div 
            key={index}
            className={`p-2 sm:p-3 rounded-lg ${
              currentPlayer === index 
                ? 'bg-white/20 ring-2 ring-purple-400' 
                : 'bg-white/5'
            }`}
          >
            <div className="flex items-center gap-2 sm:gap-3">
              <div 
                className="w-3 h-3 sm:w-4 sm:h-4 rounded-full"
                style={{ backgroundColor: player.color }}
              />
              <div className="flex-1">
                <div className="text-sm sm:text-base text-white font-medium">{player.name}</div>
                <div className="text-xs sm:text-sm text-purple-200">
                  💰 {player.money} 元
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlayerPanel;