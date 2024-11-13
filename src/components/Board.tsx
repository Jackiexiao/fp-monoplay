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
    top: 'grid-cols-11 grid-rows-1 w-full',
    right: 'grid-cols-1 grid-rows-9 h-full',
    bottom: 'grid-cols-11 grid-rows-1 w-full',
    left: 'grid-cols-1 grid-rows-9 h-full'
  };

  const containerStyles = {
    top: 'w-full h-28',
    right: 'h-full w-28',
    bottom: 'w-full h-28',
    left: 'h-full w-28'
  };
  
  const getOrderedSpaces = () => {
    let orderedSpaces = [...spaces];
    if (side === 'top' || side === 'right') {
      orderedSpaces = orderedSpaces.reverse();
    }
    return orderedSpaces;
  };
  
  return (
    <div className={`${containerStyles[side]}`}>
      <div className={`grid ${sideStyles[side]} gap-1.5 h-full`}>
        {getOrderedSpaces().map((space, index) => {
          const position = side === 'top' || side === 'right'
            ? endIndex - index
            : startIndex + index;
          
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
              onClick={() => onSpaceClick?.(position)}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Board;