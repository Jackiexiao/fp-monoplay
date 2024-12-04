import React from 'react';
import { Player } from '../game/players';
import { boardSpaces } from '../game/board';
import BoardSpace from './BoardSpace';

interface BoardProps {
  players: Player[];
  startIndex: number;
  endIndex: number;
  side: 'top' | 'right' | 'bottom' | 'left';
  currentPlayerPosition: number;
  previousPlayerPosition: number | null;
  currentPlayer: number;
  onSpaceClick?: (position: number) => void;
}

const Board: React.FC<BoardProps> = ({ 
  players, 
  startIndex, 
  endIndex, 
  side, 
  currentPlayerPosition,
  previousPlayerPosition,
  currentPlayer,
  onSpaceClick
}) => {
  const spaces = boardSpaces.slice(startIndex, endIndex + 1);
  
  const sideStyles = {
    top: 'grid-cols-6 grid-rows-1 w-full',
    right: 'grid-cols-1 grid-rows-4 h-full gap-y-2',
    bottom: 'grid-cols-6 grid-rows-1 w-full',
    left: 'grid-cols-1 grid-rows-4 h-full gap-y-2'
  };

  const containerStyles = {
    top: 'w-full h-28',
    right: 'h-full w-32 py-2',
    bottom: 'w-full h-28',
    left: 'h-full w-32 py-2'
  };
  
  const getOrderedSpaces = () => {
    let orderedSpaces = [...spaces];
    if (side === 'top' || side === 'right') {
      orderedSpaces = orderedSpaces.reverse();
    }
    return orderedSpaces;
  };
  
  const getPosition = (index: number) => {
    switch (side) {
      case 'top':
        return startIndex + (endIndex - startIndex - index);
      case 'right':
        return startIndex + (endIndex - startIndex - index);
      case 'bottom':
        return startIndex + index;
      case 'left':
        return startIndex + index;
      default:
        return startIndex + index;
    }
  };
  
  return (
    <div className={`${containerStyles[side]}`}>
      <div className={`grid ${sideStyles[side]} gap-1.5 h-full`}>
        {getOrderedSpaces().map((space, index) => {
          const position = getPosition(index);
          const isCurrentPosition = position === currentPlayerPosition;
          const isPreviousPosition = position === previousPlayerPosition;
          const playersOnSpace = players.filter(p => p.position === position);
          
          return (
            <BoardSpace
              key={position}
              space={space}
              position={position}
              players={playersOnSpace}
              isCurrentPosition={isCurrentPosition}
              isPreviousPosition={isPreviousPosition}
              isCurrentPlayerSpace={playersOnSpace.some(p => players.indexOf(p) === currentPlayer)}
              side={side}
              onClick={() => onSpaceClick?.(position)}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Board;