import React, { useState } from 'react';
import { Rocket, Trophy, Info } from 'lucide-react';
import Board from './components/Board';
import { Player, initialPlayers } from './game/players';
import DiceRoll from './components/DiceRoll';
import ChanceCard from './components/ChanceCard';
import { Card, chanceCards } from './game/cards';
import { boardSpaces } from './game/board';
import RulesModal from './components/RulesModal';
import WinnerModal from './components/WinnerModal';
import BoardSpace from './components/BoardSpace';

// 在文件顶部添加新的类型
interface GameState {
  isGameOver: boolean;
  winner: Player | null;
  reason: string;
}

function App() {
  const [players, setPlayers] = useState<Player[]>(initialPlayers);
  const [currentPlayer, setCurrentPlayer] = useState(0);
  const [diceRolling, setDiceRolling] = useState(false);
  const [currentCard, setCurrentCard] = useState<Card | null>(null);
  const [gameMessage, setGameMessage] = useState('');
  const [showRules, setShowRules] = useState(false);
  const [gameState, setGameState] = useState<GameState>({
    isGameOver: false,
    winner: null,
    reason: ''
  });
  const [previousPositions, setPreviousPositions] = useState<Record<number, number>>({});
  const [selectedSpace, setSelectedSpace] = useState<number | null>(null);
  const [lastMovePosition, setLastMovePosition] = useState<number | null>(null);
  const [selectedProperty, setSelectedProperty] = useState<number | null>(null);
  const [showTradeModal, setShowTradeModal] = useState(false);
  const [movePath, setMovePath] = useState<number[]>([]);
  const [moneyChanges, setMoneyChanges] = useState<Record<number, number>>({});

  const showMessage = (message: string) => {
    setGameMessage(message);
    setTimeout(() => setGameMessage(''), 3000);
  };

  const handleChanceCard = () => {
    const card = chanceCards[Math.floor(Math.random() * chanceCards.length)];
    setCurrentCard(card);
    
    setPlayers(prevPlayers => {
      const newPlayers = [...prevPlayers];
      const player = newPlayers[currentPlayer];
      
      if (card.effect === 'money') {
        player.money += card.value;
        if (player.money < 0) player.money = 0;
      } else if (card.effect === 'move') {
        player.position = (player.position + card.value + 40) % 40;
      }
      
      return newPlayers;
    });
  };

  const checkWinConditions = (players: Player[]): GameState => {
    // 检查是否有玩家达到 5000 元
    const richPlayer = players.find(p => p.money >= 5000);
    if (richPlayer) {
      return {
        isGameOver: true,
        winner: richPlayer,
        reason: `${richPlayer.name}的资产达到了5000元！`
      };
    }

    // 检查是否有玩家破产
    const bankruptPlayer = players.find(p => p.money <= 0);
    if (bankruptPlayer) {
      const winner = [...players].sort((a, b) => b.money - a.money)[0];
      return {
        isGameOver: true,
        winner: winner,
        reason: `${bankruptPlayer.name}破产了！${winner.name}以最多资产获胜！`
      };
    }

    // 检查产品数量
    const maxProperties = Math.max(...players.map(p => p.properties.length));
    if (maxProperties >= 5) {
      const winner = players.find(p => p.properties.length === maxProperties);
      if (winner) {
        return {
          isGameOver: true,
          winner: winner,
          reason: `${winner.name}收集了最多的产品！`
        };
      }
    }

    return { isGameOver: false, winner: null, reason: '' };
  };

  const handleTurn = (steps: number) => {
    const currentPos = players[currentPlayer].position;
    const path: number[] = [];
    
    // 生成移动路径，考虑经过起点的情况
    for (let i = 1; i <= steps; i++) {
      const nextPos = (currentPos + i) % 40;
      path.push(nextPos);
      
      // 如果经过起点，添加视觉提示
      if (nextPos < currentPos) {
        showMessage('🎉 即将经过起点！');
      }
    }
    
    setMovePath(path);
    
    // 使用更短的间隔来展示移动过程
    let step = 0;
    const moveInterval = setInterval(() => {
      if (step < path.length) {
        setLastMovePosition(path[step]);
        // 添加移动音效或视觉反馈
        step++;
      } else {
        clearInterval(moveInterval);
        setMovePath([]);
        movePlayer(steps);
      }
    }, 200); // 缩短间隔时间
  };

  const movePlayer = (steps: number) => {
    setPreviousPositions(prev => ({
      ...prev,
      [currentPlayer]: players[currentPlayer].position
    }));

    setPlayers(prevPlayers => {
      const newPlayers = [...prevPlayers];
      const player = newPlayers[currentPlayer];
      const oldPosition = player.position;
      const newPosition = (player.position + steps) % 40;
      player.position = newPosition;
      
      // 记录最后移动的位置
      setLastMovePosition(newPosition);
      
      // 经过起点获得奖励
      if (newPosition < oldPosition) {
        player.money += 200;
        showMoneyChange(currentPlayer, 200);
        showMessage('🎉 经过起点，获得 200 元奖励！');
      }
      
      const space = boardSpaces[newPosition];
      
      // 处理不同类型的格子
      if (space.type === 'chance') {
        setTimeout(() => handleChanceCard(), 500);
      } else if (space.type === 'tax') {
        const taxAmount = space.price || 0;
        player.money -= taxAmount;
        showMoneyChange(currentPlayer, -taxAmount);
        showMessage(`💸 支付${taxAmount}元${space.name}`);
      }
      
      // 检查胜利条件
      const gameResult = checkWinConditions(newPlayers);
      if (gameResult.isGameOver) {
        setGameState(gameResult);
      }
      
      return newPlayers;
    });
    
    if (!gameState.isGameOver) {
      setCurrentPlayer((prev) => (prev + 1) % 4);
    }
  };

  const restartGame = () => {
    setPlayers(initialPlayers);
    setCurrentPlayer(0);
    setCurrentCard(null);
    setGameMessage('');
    setGameState({
      isGameOver: false,
      winner: null,
      reason: ''
    });
  };

  // 在 App 组件中添加一个函数来获取当前玩家位置
  const getCurrentPlayerPosition = () => {
    return players[currentPlayer].position;
  };

  const handleBuyProperty = (position: number) => {
    const space = boardSpaces[position] as Space & { owner?: number | null };
    const currentPlayerObj = players[currentPlayer];
    
    if (space.price && space.owner === null && currentPlayerObj.money >= space.price) {
      // 更新格子所有权
      boardSpaces[position] = {
        ...space,
        owner: currentPlayer
      };
      
      // 更新玩家状态
      setPlayers(prevPlayers => {
        const newPlayers = [...prevPlayers];
        const player = newPlayers[currentPlayer];
        player.money -= space.price!;
        player.properties.push(position);
        return newPlayers;
      });
      
      showMessage(`🎉 成功购买 ${space.name}！`);
    }
  };

  const handleTrade = (fromPlayer: number, toPlayer: number, propertyPosition: number, price: number) => {
    setPlayers(prevPlayers => {
      const newPlayers = [...prevPlayers];
      const seller = newPlayers[fromPlayer];
      const buyer = newPlayers[toPlayer];
      
      if (buyer.money >= price) {
        seller.money += price;
        buyer.money -= price;
        seller.properties = seller.properties.filter(p => p !== propertyPosition);
        buyer.properties.push(propertyPosition);
        showMessage(`🤝 交易成功！`);
      }
      
      return newPlayers;
    });
  };

  const handleSpaceClick = (position: number) => {
    const space = boardSpaces[position];
    if (space.type === 'property' && !space.owner) {
      setSelectedSpace(position);
    }
  };

  const handleTradeRequest = (propertyPosition: number) => {
    setSelectedProperty(propertyPosition);
    setShowTradeModal(true);
  };

  const triggerSpecialEvent = () => {
    const events = [
      {
        name: '创业补贴',
        effect: () => {
          const player = players[currentPlayer];
          if (player.money < 500) {
            setPlayers(prev => {
              const newPlayers = [...prev];
              newPlayers[currentPlayer].money += 200;
              return newPlayers;
            });
            showMessage('🎁 获得创业补贴 200 元！');
          }
        }
      },
      {
        name: '产品推广',
        effect: () => {
          const player = players[currentPlayer];
          if (player.properties.length > 0) {
            setPlayers(prev => {
              const newPlayers = [...prev];
              newPlayers[currentPlayer].money += player.properties.length * 50;
              return newPlayers;
            });
            showMessage(`🚀 产品推广成功，获得 ${player.properties.length * 50} 元收入！`);
          }
        }
      },
      // 可以添加更多特殊事件
    ];

    const randomEvent = events[Math.floor(Math.random() * events.length)];
    randomEvent.effect();
  };

  const showMoneyChange = (playerId: number, amount: number) => {
    setMoneyChanges(prev => ({
      ...prev,
      [playerId]: amount
    }));
    
    setTimeout(() => {
      setMoneyChanges(prev => ({
        ...prev,
        [playerId]: 0
      }));
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-800 to-blue-900 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-6 sm:mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3 flex items-center justify-center gap-3">
            <div className="bg-white/10 p-2 rounded-lg">
              <Rocket className="w-8 h-8 sm:w-10 sm:h-10" />
            </div>
            创业大富翁
            <div className="bg-white/10 p-2 rounded-lg">
              <Trophy className="w-8 h-8 sm:w-10 sm:h-10" />
            </div>
          </h1>
          <p className="text-sm sm:text-base text-purple-200 mb-3">
            打工人的创业之旅，今天你想做什么小产品？
          </p>
          <button
            onClick={() => setShowRules(true)}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 
                     hover:bg-white/15 rounded-full text-sm text-white/90
                     transition-all duration-300 border border-white/10
                     hover:border-white/20"
          >
            <Info className="w-4 h-4" />
            游戏规则
          </button>
          {gameMessage && (
            <div className="mt-4 text-base sm:text-lg font-semibold text-yellow-300
                          bg-yellow-400/10 border border-yellow-400/20 rounded-lg
                          py-2 px-4 inline-block">
              {gameMessage}
            </div>
          )}
        </header>

        <div className="relative aspect-[4/3] w-full max-w-[1200px] mx-auto 
                      bg-white/5 rounded-2xl p-8 sm:p-10 border border-white/10
                      shadow-2xl backdrop-blur-sm">
          <div className="absolute top-8 left-8 right-8">
            <Board 
              players={players} 
              startIndex={30} 
              endIndex={40} 
              side="top" 
              currentPlayerPosition={getCurrentPlayerPosition()}
              previousPlayerPosition={lastMovePosition}
              currentPlayer={currentPlayer}
              onSpaceClick={handleSpaceClick}
            />
          </div>
          
          <div className="absolute right-8 top-[15%] bottom-[15%] w-32">
            <Board 
              players={players} 
              startIndex={21} 
              endIndex={29} 
              side="right" 
              currentPlayerPosition={getCurrentPlayerPosition()}
              previousPlayerPosition={lastMovePosition}
              currentPlayer={currentPlayer}
              onSpaceClick={handleSpaceClick}
            />
          </div>
          
          <div className="absolute bottom-8 left-8 right-8">
            <Board 
              players={players} 
              startIndex={0} 
              endIndex={10} 
              side="bottom" 
              currentPlayerPosition={getCurrentPlayerPosition()}
              previousPlayerPosition={lastMovePosition}
              currentPlayer={currentPlayer}
              onSpaceClick={handleSpaceClick}
            />
          </div>
          
          <div className="absolute left-8 top-[15%] bottom-[15%] w-32">
            <Board 
              players={players} 
              startIndex={11} 
              endIndex={19} 
              side="left" 
              currentPlayerPosition={getCurrentPlayerPosition()}
              previousPlayerPosition={lastMovePosition}
              currentPlayer={currentPlayer}
              onSpaceClick={handleSpaceClick}
            />
          </div>

          <div className="absolute left-[30%] right-[30%] top-[30%] bottom-[30%]">
            <div className="absolute inset-[25%] bg-white/10 backdrop-blur-sm rounded-full 
                            shadow-lg border border-white/20 flex items-center justify-center
                            transform hover:scale-105 transition-transform">
              <DiceRoll 
                onRoll={handleTurn}
                disabled={diceRolling}
                setRolling={setDiceRolling}
                currentPlayer={currentPlayer}
              />
            </div>

            <PlayerInfo
              className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2"
              player={players[0]}
              isActive={currentPlayer === 0}
              moneyChange={moneyChanges[0]}
            />
            <PlayerInfo
              className="absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2"
              player={players[1]}
              isActive={currentPlayer === 1}
              moneyChange={moneyChanges[1]}
            />
            <PlayerInfo
              className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2"
              player={players[2]}
              isActive={currentPlayer === 2}
              moneyChange={moneyChanges[2]}
            />
            <PlayerInfo
              className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2"
              player={players[3]}
              isActive={currentPlayer === 3}
              moneyChange={moneyChanges[3]}
            />
          </div>
        </div>
      </div>

      <ChanceCard card={currentCard} onClose={() => setCurrentCard(null)} />
      {showRules && <RulesModal onClose={() => setShowRules(false)} />}
      {gameState.isGameOver && <WinnerModal winner={gameState.winner} reason={gameState.reason} onRestart={restartGame} />}
      {selectedSpace !== null && (
        <ActionPanel
          position={selectedSpace}
          onBuy={() => {
            handleBuyProperty(selectedSpace);
            setSelectedSpace(null);
          }}
          onClose={() => setSelectedSpace(null)}
        />
      )}
    </div>
  );
}

interface PlayerInfoProps {
  player: Player;
  isActive: boolean;
  className?: string;
  moneyChange?: number;
}

const PlayerInfo: React.FC<PlayerInfoProps> = ({ 
  player, 
  isActive, 
  className = '',
  moneyChange 
}) => {
  return (
    <div className={`${className} transform transition-all duration-300 ${
      isActive ? 'scale-110 z-10' : 'scale-100'
    }`}>
      <div className={`p-4 rounded-xl ${
        isActive 
          ? 'bg-white/20 ring-2 ring-purple-400 shadow-lg' 
          : 'bg-white/10 hover:bg-white/15'
      } backdrop-blur-sm transition-all min-w-[160px] sm:min-w-[180px]
      border border-white/10 hover:border-white/20`}>
        <div className="flex items-center gap-3">
          <div 
            className={`w-8 h-8 rounded-full shadow-lg border-2 
                      ${isActive ? 'border-purple-400' : 'border-white/50'}`}
            style={{ backgroundColor: player.color }}
          />
          <div>
            <div className="text-sm sm:text-base font-medium text-white mb-0.5">{player.name}</div>
            <div className="text-xs sm:text-sm text-purple-200 flex items-center gap-1.5">
              <span className="bg-yellow-400/20 p-1 rounded">💰</span>
              <span>{player.money.toLocaleString()} 元</span>
              {moneyChange && (
                <span className={`text-xs font-medium ${
                  moneyChange > 0 ? 'text-green-400' : 'text-red-400'
                }`}>
                  {moneyChange > 0 ? '+' : ''}{moneyChange}
                </span>
              )}
            </div>
            <div className="text-xs sm:text-sm text-purple-200 flex items-center gap-1.5 mt-1">
              <span className="bg-purple-400/20 p-1 rounded">🎮</span>
              <span>{player.properties.length} 个产品</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

interface ActionPanelProps {
  position: number | null;
  onBuy: () => void;
  onClose: () => void;
}

const ActionPanel: React.FC<ActionPanelProps> = ({ position, onBuy, onClose }) => {
  if (position === null) return null;
  const space = boardSpaces[position];

  return (
    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 
                    bg-gray-900/95 rounded-lg p-4 backdrop-blur-sm
                    border border-white/20 shadow-xl">
      <h3 className="text-lg font-bold text-white mb-2">{space.name}</h3>
      {space.price && (
        <div className="flex gap-2 mt-2">
          <button
            onClick={onBuy}
            className="px-4 py-2 bg-purple-600 hover:bg-purple-700 
                     text-white rounded-lg transition-colors"
          >
            购买 ({space.price} 元)
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-700 hover:bg-gray-600 
                     text-white rounded-lg transition-colors"
          >
            取消
          </button>
        </div>
      )}
    </div>
  );
};

export default App;