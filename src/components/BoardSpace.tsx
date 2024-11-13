import React from 'react';
import { Player } from '../game/players';
import { Space } from '../game/board';
import PlayerToken from './PlayerToken';

interface BoardSpaceProps {
  space: Space;
  position: number;
  players: Player[];
  isCurrentPosition: boolean;
  isPreviousPosition: boolean;
  isCurrentPlayerSpace: boolean;
  isInMovePath?: boolean;
  onClick?: (position: number) => void;
}

const BoardSpace: React.FC<BoardSpaceProps> = ({ 
  space, 
  position, 
  players, 
  isCurrentPosition,
  isPreviousPosition,
  isCurrentPlayerSpace,
  isInMovePath = false,
  onClick 
}) => {
  // 根据不同状态返回不同的边框样式
  const getBorderStyle = () => {
    if (isCurrentPosition) return 'border-purple-400 bg-white/10 shadow-lg shadow-purple-400/20 animate-pulse';
    if (isPreviousPosition) return 'border-yellow-400 bg-white/10 shadow-lg shadow-yellow-400/20';
    if (isInMovePath) return 'border-green-400 bg-white/10 shadow-lg shadow-green-400/20 animate-pulse';
    if (isCurrentPlayerSpace) return 'border-blue-400 bg-white/10 shadow-lg shadow-blue-400/20';
    return 'border-transparent hover:border-white/20 hover:bg-white/10';
  };

  return (
    <div 
      className={`
        relative bg-white/5 rounded-lg p-2 sm:p-3
        transition-all duration-300 cursor-pointer
        min-h-[70px] sm:min-h-[80px]
        border-2 ${getBorderStyle()}
      `}
      onClick={() => onClick?.(position)}
    >
      <div className="h-full flex flex-col justify-between">
        <div className="text-white/90 font-medium text-xs sm:text-sm line-clamp-2">{space.name}</div>
        
        <div className="flex flex-col items-center gap-1 my-1">
          {space.icon && <space.icon className="w-4 h-4 sm:w-5 sm:h-5 text-white/70" />}
          {space.price && (
            <div className="text-yellow-400/90 text-xs sm:text-sm font-medium">
              {space.price} 元
            </div>
          )}
        </div>
        
        {/* 修改玩家标记显示 */}
        {players.length > 0 && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex flex-wrap gap-1.5 p-1.5 bg-black/40 rounded-lg backdrop-blur-sm">
              {players.map((player, idx) => (
                <PlayerToken
                  key={idx}
                  player={player}
                  isCurrentPlayer={isCurrentPosition}
                  previousPosition={isPreviousPosition ? position : undefined}
                />
              ))}
            </div>
          </div>
        )}
      </div>
      
      {/* Tooltip */}
      <div className="absolute hidden group-hover:block left-1/2 bottom-full mb-2 
                    -translate-x-1/2 w-48 sm:w-56 p-3 bg-gray-900/95 text-white 
                    text-xs sm:text-sm rounded-lg shadow-xl z-10 backdrop-blur-sm">
        <p className="font-bold mb-2">{space.name}</p>
        {space.price && <p className="text-yellow-400 mb-1">价格: {space.price} 元</p>}
        <p className="text-gray-300">{space.description}</p>
      </div>
      
      {/* 添加格子状态指示器 */}
      <div className="absolute top-1 right-1 flex gap-1">
        {space.owner !== undefined && space.owner !== null && (
          <div 
            className="w-2 h-2 rounded-full border border-white/50"
            style={{ backgroundColor: players[space.owner].color }}
          />
        )}
        {isInMovePath && (
          <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
        )}
      </div>
    </div>
  );
};

export default BoardSpace;
