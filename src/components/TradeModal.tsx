import React, { useState } from 'react';
import { Player } from '../game/players';
import { boardSpaces } from '../game/board';

interface TradeModalProps {
  property: number;
  currentPlayer: Player;
  players: Player[];
  onTrade: (toPlayer: number, price: number) => void;
  onClose: () => void;
}

const TradeModal: React.FC<TradeModalProps> = ({
  property,
  currentPlayer,
  players,
  onTrade,
  onClose
}) => {
  const [selectedPlayer, setSelectedPlayer] = useState<number | null>(null);
  const [price, setPrice] = useState(0);
  const space = boardSpaces[property];

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-gray-900 rounded-xl p-6 max-w-md w-full">
        <h3 className="text-xl font-bold text-white mb-4">交易 {space.name}</h3>
        
        <div className="space-y-4">
          <div>
            <label className="text-white mb-2 block">选择交易对象</label>
            <div className="grid grid-cols-2 gap-2">
              {players.map((player, index) => (
                index !== players.indexOf(currentPlayer) && (
                  <button
                    key={index}
                    onClick={() => setSelectedPlayer(index)}
                    className={`p-2 rounded-lg border ${
                      selectedPlayer === index
                        ? 'border-purple-400 bg-purple-400/20'
                        : 'border-white/20 hover:border-white/40'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className="w-4 h-4 rounded-full"
                        style={{ backgroundColor: player.color }}
                      />
                      <span className="text-white">{player.name}</span>
                    </div>
                  </button>
                )
              ))}
            </div>
          </div>

          <div>
            <label className="text-white mb-2 block">设置价格</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white"
              min="0"
              step="50"
            />
          </div>

          <div className="flex gap-2 mt-6">
            <button
              onClick={() => selectedPlayer !== null && onTrade(selectedPlayer, price)}
              disabled={selectedPlayer === null || price <= 0}
              className="flex-1 py-2 bg-purple-600 hover:bg-purple-700 
                       disabled:bg-gray-600 text-white rounded-lg transition-colors"
            >
              确认交易
            </button>
            <button
              onClick={onClose}
              className="flex-1 py-2 bg-gray-700 hover:bg-gray-600 
                       text-white rounded-lg transition-colors"
            >
              取消
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TradeModal; 