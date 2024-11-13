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
  previousPositions: number[];
}

const Board: React.FC<BoardProps> = ({ 
  players, 
  startIndex, 
  endIndex, 
  side, 
  currentPlayerPosition,
  previousPositions 
}) => {
  const spaces = boardSpaces.slice(startIndex, endIndex + 1);
  
  const sideStyles = {
    top: 'grid-cols-[repeat(11,minmax(0,1fr))] grid-rows-1 w-full',
    right: 'grid-cols-1 grid-rows-[repeat(9,minmax(0,1fr))] h-full',
    bottom: 'grid-cols-[repeat(11,minmax(0,1fr))] grid-rows-1 w-full',
    left: 'grid-cols-1 grid-rows-[repeat(9,minmax(0,1fr))] h-full'
  };

  const containerStyles = {
    top: 'w-full h-24',
    right: 'h-full w-24',
    bottom: 'w-full h-24',
    left: 'h-full w-24'
  };
  
  return (
    <div className={`${containerStyles[side]}`}>
      <div className={`grid ${sideStyles[side]} gap-2 h-full`}>
        {spaces.map((space, index) => {
          const position = startIndex + index;
          const isCurrentPosition = position === currentPlayerPosition;
          
          return (
            <BoardSpace
              key={position}
              space={space}
              position={position}
              players={players.filter(p => p.position === position)}
              isCurrentPosition={isCurrentPosition}
              previousPositions={previousPositions}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Board;