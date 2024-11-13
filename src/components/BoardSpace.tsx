import React from 'react';
import { Player } from '../game/players';
import { Space } from '../game/board';
import PlayerToken from './PlayerToken';
import { DollarSign, Sparkles, AlertCircle } from 'lucide-react';

interface BoardSpaceProps {
  space: Space;
  position: number;
  players: Player[];
  isCurrentPosition: boolean;
  isPreviousPosition: boolean;
  isCurrentPlayerSpace: boolean;
  isInMovePath?: boolean;
  side: 'top' | 'right' | 'bottom' | 'left';
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
  side,
  onClick 
}) => {
  const getBorderStyle = () => {
    if (isCurrentPosition) return 'border-purple-400 bg-white/10 shadow-lg shadow-purple-400/20 animate-pulse';
    if (isPreviousPosition) return 'border-yellow-400 bg-white/10 shadow-lg shadow-yellow-400/20';
    if (isInMovePath) return 'border-green-400 bg-white/10 shadow-lg shadow-green-400/20 animate-pulse';
    if (isCurrentPlayerSpace) return 'border-blue-400 bg-white/10 shadow-lg shadow-blue-400/20';
    return 'border-transparent hover:border-white/20 hover:bg-white/10';
  };

  const getOwnerColor = () => {
    if (space.owner !== undefined && space.owner !== null && players[space.owner]) {
      return players[space.owner].color;
    }
    return 'transparent';
  };

  const getTypeIndicator = () => {
    switch (space.type) {
      case 'property':
        return {
          icon: DollarSign,
          color: 'bg-yellow-500/20 text-yellow-400',
          label: '投资'
        };
      case 'chance':
        return {
          icon: Sparkles,
          color: 'bg-purple-500/20 text-purple-400',
          label: '机会'
        };
      case 'tax':
        return {
          icon: AlertCircle,
          color: 'bg-red-500/20 text-red-400',
          label: '支出'
        };
      case 'special':
        return {
          icon: space.icon,
          color: 'bg-blue-500/20 text-blue-400',
          label: '特殊'
        };
      default:
        return null;
    }
  };

  const typeInfo = getTypeIndicator();

  const getOwnerInfo = () => {
    if (space.owner !== null && players[space.owner]) {
      const owner = players[space.owner];
      return {
        color: owner.color,
        name: owner.name
      };
    }
    return null;
  };

  const ownerInfo = getOwnerInfo();

  return (
    <div 
      className={`
        relative bg-white/5 rounded-lg p-2
        transition-all duration-300 cursor-pointer
        ${side === 'left' || side === 'right' 
          ? 'min-h-[60px] sm:min-h-[70px]'
          : 'min-h-[60px] sm:min-h-[70px]'
        }
        border-2 ${getBorderStyle()}
      `}
      onClick={() => {
        if (space.type === 'property' && space.owner === null) {
          onClick?.(position);
        }
      }}
    >
      <div className="absolute top-0.5 left-0.5 text-[10px] text-white/60 bg-black/30 
                    rounded px-1 font-mono">
        {position}
      </div>

      {typeInfo && (
        <div className={`absolute top-0.5 right-0.5 ${typeInfo.color} 
                      rounded-full text-[10px] px-1.5 py-0.5 flex items-center gap-1`}>
          <typeInfo.icon className="w-3 h-3" />
          <span>{typeInfo.label}</span>
        </div>
      )}

      <div className={`h-full flex ${
        side === 'left' || side === 'right'
          ? 'flex-row items-center gap-2 pt-6'
          : 'flex-col justify-between pt-6'
      }`}>
        <div className={`text-white/90 font-medium text-xs
          ${side === 'left' || side === 'right' 
            ? 'line-clamp-2 flex-1'
            : 'line-clamp-1 text-center'
          }`}>
          {space.name}
        </div>
        
        <div className={`flex ${
          side === 'left' || side === 'right'
            ? 'flex-col items-end min-w-[40px]'
            : 'flex-col items-center'
        } gap-0.5`}>
          {space.icon && (
            <space.icon className="w-4 h-4 sm:w-5 sm:h-5 text-white/70" />
          )}
          {space.price && (
            <div className={`text-[10px] sm:text-xs font-medium
              ${space.type === 'tax' ? 'text-red-400' : 'text-yellow-400/90'}`}>
              {space.type === 'tax' ? '-' : ''}{space.price}元
            </div>
          )}
        </div>
      </div>
      
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
      
      <div className="absolute hidden group-hover:block left-1/2 bottom-full mb-2 
                    -translate-x-1/2 w-48 sm:w-56 p-3 bg-gray-900/95 text-white 
                    text-xs sm:text-sm rounded-lg shadow-xl z-10 backdrop-blur-sm">
        <div className="flex items-center gap-2 mb-2">
          <p className="font-bold">{space.name}</p>
          {typeInfo && (
            <span className={`${typeInfo.color} rounded-full px-2 py-0.5 text-xs`}>
              {typeInfo.label}
            </span>
          )}
        </div>
        {space.price && (
          <p className={`mb-1 ${space.type === 'tax' ? 'text-red-400' : 'text-yellow-400'}`}>
            {space.type === 'tax' ? '支出: ' : '价格: '}{space.price} 元
          </p>
        )}
        <p className="text-gray-300">{space.description}</p>
        {ownerInfo && (
          <div className="mt-2 flex items-center gap-2 border-t border-white/10 pt-2">
            <div 
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: ownerInfo.color }}
            />
            <span className="text-white/70">所有者：{ownerInfo.name}</span>
          </div>
        )}
      </div>
      
      {ownerInfo && (
        <div className="absolute bottom-1 right-1 flex items-center gap-1 bg-black/30 
                     rounded-full px-1.5 py-0.5">
          <div 
            className="w-2 h-2 rounded-full border border-white/50"
            style={{ backgroundColor: ownerInfo.color }}
          />
          <span className="text-[10px] text-white/70">{ownerInfo.name}</span>
        </div>
      )}
    </div>
  );
};

export default BoardSpace;
