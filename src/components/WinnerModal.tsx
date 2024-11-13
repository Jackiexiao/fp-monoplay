import React from 'react';
import { Trophy } from 'lucide-react';
import { Player } from '../game/players';

interface WinnerModalProps {
  winner: Player | null;
  reason: string;
  onRestart: () => void;
}

const WinnerModal: React.FC<WinnerModalProps> = ({ winner, reason, onRestart }) => {
  if (!winner) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-gradient-to-br from-purple-600 to-indigo-600 p-1 rounded-xl">
        <div className="bg-gray-900 rounded-lg p-8 max-w-sm w-full text-center">
          <Trophy className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">恭喜获胜！</h2>
          <div 
            className="w-8 h-8 rounded-full mx-auto mb-4 border-2 border-white shadow-lg"
            style={{ backgroundColor: winner.color }}
          />
          <p className="text-xl font-semibold text-white mb-2">{winner.name}</p>
          <p className="text-base text-purple-200 mb-6">{reason}</p>
          <button
            onClick={onRestart}
            className="w-full py-3 bg-gradient-to-r from-purple-500 to-indigo-500 
                     hover:from-purple-600 hover:to-indigo-600 text-white rounded-lg
                     transition-colors font-medium"
          >
            再玩一局
          </button>
        </div>
      </div>
    </div>
  );
};

export default WinnerModal; 