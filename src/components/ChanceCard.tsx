import React from 'react';
import { Card } from '../game/cards';
import { Sparkles } from 'lucide-react';

interface ChanceCardProps {
  card: Card | null;
  onClose: () => void;
}

const ChanceCard: React.FC<ChanceCardProps> = ({ card, onClose }) => {
  if (!card) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-gradient-to-br from-purple-600 to-indigo-600 p-1 rounded-xl">
        <div className="bg-gray-900 rounded-lg p-6 max-w-sm w-full text-center">
          <Sparkles className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-white mb-2">{card.title}</h3>
          <p className="text-purple-200 mb-4">{card.description}</p>
          <p className="text-lg font-semibold text-yellow-400 mb-6">{card.message}</p>
          <button
            onClick={onClose}
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg
                     transition-colors duration-200"
          >
            确定
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChanceCard;