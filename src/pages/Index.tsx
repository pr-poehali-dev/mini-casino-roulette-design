import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import Header from '@/components/Header';
import DiceGame from '@/components/DiceGame';
import MinesGame from '@/components/MinesGame';
import BattleGame from '@/components/BattleGame';
import BonusesSection from '@/components/BonusesSection';

const Index = () => {
  const [balance, setBalance] = useState(999999);
  const [betAmount, setBetAmount] = useState([100]);
  const [multiplier, setMultiplier] = useState([2]);
  const [diceResult, setDiceResult] = useState(6);
  const [isRolling, setIsRolling] = useState(false);
  const [prediction, setPrediction] = useState(4);
  const [activeSection, setActiveSection] = useState('home');
  const [activeGame, setActiveGame] = useState('dice');
  
  // Mines game state
  const [minesCount, setMinesCount] = useState(3);
  const [minesField, setMinesField] = useState(Array(25).fill({ revealed: false, hasMine: false, hasGem: false }));
  const [minesGameActive, setMinesGameActive] = useState(false);
  const [revealedCount, setRevealedCount] = useState(0);
  const [minesMultiplier, setMinesMultiplier] = useState(1.0);
  
  // Battle game state
  const [battlePlayers, setBattlePlayers] = useState([
    { id: 1, name: 'Игрок 1', bet: 100, avatar: '🚀' },
    { id: 2, name: 'Игрок 2', bet: 150, avatar: '🎯' },
    { id: 3, name: 'Игрок 3', bet: 200, avatar: '⚡' }
  ]);
  const [battleResult, setBattleResult] = useState(null);
  const [battleInProgress, setBattleInProgress] = useState(false);
  
  // Bonus system state
  const [bonuses, setBonuses] = useState({
    telegram: { claimed: false, amount: 20 },
    vk: { claimed: false, amount: 20 },
    registration: { claimed: false, amount: 100 },
    firstDeposit: { claimed: false, amount: 50 }
  });
  const [connectedAccounts, setConnectedAccounts] = useState({
    telegram: null,
    vk: null
  });

  // Mines game functions
  const initMinesGame = () => {
    const newField = Array(25).fill(null).map(() => ({ revealed: false, hasMine: false, hasGem: true }));
    
    // Place mines randomly
    const minePositions = new Set();
    while (minePositions.size < minesCount) {
      minePositions.add(Math.floor(Math.random() * 25));
    }
    
    minePositions.forEach(pos => {
      newField[pos] = { revealed: false, hasMine: true, hasGem: false };
    });
    
    setMinesField(newField);
    setMinesGameActive(true);
    setRevealedCount(0);
    setMinesMultiplier(1.0);
    setBalance(prev => prev - betAmount[0]);
  };
  
  const revealCell = (index) => {
    if (!minesGameActive || minesField[index].revealed) return;
    
    const newField = [...minesField];
    newField[index] = { ...newField[index], revealed: true };
    
    if (newField[index].hasMine) {
      // Game over - hit mine
      setMinesField(newField);
      setMinesGameActive(false);
      alert('💣 Взрыв! Игра окончена!');
    } else {
      // Found gem
      const newRevealedCount = revealedCount + 1;
      const newMultiplier = 1 + (newRevealedCount * 0.3);
      setRevealedCount(newRevealedCount);
      setMinesMultiplier(newMultiplier);
      setMinesField(newField);
    }
  };
  
  const cashOutMines = () => {
    if (!minesGameActive) return;
    const winAmount = betAmount[0] * minesMultiplier;
    setBalance(prev => prev + winAmount);
    setMinesGameActive(false);
    alert(`💎 Вы забрали ${winAmount.toFixed(0)}₽!`);
  };
  
  // Battle game functions
  const startBattle = () => {
    setBattleInProgress(true);
    setBattleResult(null);
    
    setTimeout(() => {
      const winner = battlePlayers[Math.floor(Math.random() * battlePlayers.length)];
      setBattleResult(winner);
      setBattleInProgress(false);
      
      if (winner.id === 1) { // Player 1 wins
        const totalPot = battlePlayers.reduce((sum, player) => sum + player.bet, 0);
        setBalance(prev => prev + totalPot - betAmount[0]);
      } else {
        setBalance(prev => prev - betAmount[0]);
      }
    }, 3000);
  };
  
  // Bonus system functions
  const connectTelegram = () => {
    // Simulate Telegram connection
    setTimeout(() => {
      setConnectedAccounts(prev => ({ ...prev, telegram: '@user_telegram' }));
      if (!bonuses.telegram.claimed) {
        claimBonus('telegram');
      }
    }, 1000);
  };
  
  const connectVK = () => {
    // Simulate VK connection
    setTimeout(() => {
      setConnectedAccounts(prev => ({ ...prev, vk: 'vk.com/user' }));
      if (!bonuses.vk.claimed) {
        claimBonus('vk');
      }
    }, 1000);
  };
  
  const claimBonus = (bonusType) => {
    if (bonuses[bonusType].claimed) return;
    
    const amount = bonuses[bonusType].amount;
    setBalance(prev => prev + amount);
    setBonuses(prev => ({
      ...prev,
      [bonusType]: { ...prev[bonusType], claimed: true }
    }));
    
    // Show success message
    alert(`🎉 Бонус ${amount}₽ получен!`);
  };

  const rollDice = () => {
    if (isRolling) return;
    
    setIsRolling(true);
    
    // Simulate dice rolling animation
    const rollInterval = setInterval(() => {
      setDiceResult(Math.floor(Math.random() * 6) + 1);
    }, 100);
    
    setTimeout(() => {
      clearInterval(rollInterval);
      const finalResult = Math.floor(Math.random() * 6) + 1;
      setDiceResult(finalResult);
      setIsRolling(false);
      
      // Check win/loss
      if (finalResult >= prediction) {
        const winAmount = betAmount[0] * multiplier[0];
        setBalance(prev => prev + winAmount);
      } else {
        setBalance(prev => prev - betAmount[0]);
      }
    }, 2000);
  };

  const navigation = [
    { id: 'home', label: 'Главная', icon: 'Home' },
    { id: 'games', label: 'Игры', icon: 'Gamepad2' },
    { id: 'bonuses', label: 'Бонусы', icon: 'Gift' },
    { id: 'help', label: 'Помощь', icon: 'HelpCircle' },
    { id: 'profile', label: 'Профиль', icon: 'User' },
    { id: 'referrals', label: 'Рефералы', icon: 'Users' }
  ];

  const games = [
    {
      id: 'dice',
      title: 'Dice',
      description: 'Самое популярное',
      emoji: '🎲',
      gradient: 'bg-gradient-to-br from-primary to-purple-600'
    },
    {
      id: 'mines',
      title: 'Mines',
      description: 'Самое популярное',
      emoji: '💣',
      gradient: 'bg-gradient-to-br from-secondary to-pink-600'
    },
    {
      id: 'battle',
      title: 'Battle',
      description: 'Новое',
      emoji: '⚔️',
      gradient: 'bg-gradient-to-br from-neon-cyan to-blue-600'
    }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <Header
        navigation={navigation}
        activeSection={activeSection}
        balance={balance}
        onSectionChange={setActiveSection}
      />

      <main className="container mx-auto px-4 py-8">
        {/* Bonus Cards - Show only on home */}
        {activeSection === 'home' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <Card className="bg-gradient-to-br from-primary to-purple-600 border-0 text-white neon-glow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-2xl font-bold font-heading mb-2">
                      Получите от 100₽ за простую регистрацию
                    </h3>
                    <p className="text-purple-100 mb-4">
                      Не участвуйте в сомнительных розыгрышах, мы выдаем всего несколько призов за рандомные активности
                    </p>
                    <div className="mb-4">
                      <span className="text-3xl font-bold">100₽</span>
                    </div>
                    <Button variant="secondary" className="bg-white text-purple-600 hover:bg-purple-50">
                      Получить бонус
                    </Button>
                  </div>
                  <div className="hidden md:block">
                    <div className="w-32 h-32 bg-white/20 rounded-full flex items-center justify-center">
                      <Icon name="Coins" size={64} className="text-white" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-orange-500 to-yellow-500 border-0 text-white neon-glow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-2xl font-bold font-heading mb-2">
                      Бонус для новичков
                    </h3>
                    <p className="text-orange-100 mb-4">
                      После регистрации получите 100$ до 500% на счет
                    </p>
                    <Button variant="secondary" className="bg-white text-orange-600 hover:bg-orange-50">
                      Получить
                    </Button>
                  </div>
                  <div className="hidden md:block">
                    <div className="w-32 h-32 bg-white/20 rounded-full flex items-center justify-center">
                      <Icon name="Gift" size={64} className="text-white" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Games Section Navigation */}
        {activeSection === 'games' && (
          <div className="mb-8">
            <div className="flex space-x-4 mb-6">
              {games.map((game) => (
                <Button
                  key={game.id}
                  onClick={() => setActiveGame(game.id)}
                  variant={activeGame === game.id ? "default" : "outline"}
                  className={`${activeGame === game.id ? 'neon-glow' : ''}`}
                >
                  {game.emoji} {game.title}
                </Button>
              ))}
            </div>
          </div>
        )}
        
        {/* Bonuses Section */}
        {activeSection === 'bonuses' && (
          <BonusesSection
            bonuses={bonuses}
            connectedAccounts={connectedAccounts}
            onClaimBonus={claimBonus}
            onConnectTelegram={connectTelegram}
            onConnectVK={connectVK}
          />
        )}
        
        {/* Games Section - Home view */}
        {activeSection === 'home' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {games.map((game) => (
              <Card 
                key={game.id} 
                onClick={() => {
                  setActiveSection('games');
                  setActiveGame(game.id);
                }}
                className={`${game.gradient} border-0 text-white cursor-pointer transform transition-all duration-300 hover:scale-105 neon-glow hover:animate-glow-pulse`}
              >
                <CardContent className="p-6 text-center">
                  <div className="text-6xl mb-4">{game.emoji}</div>
                  <h3 className="text-2xl font-bold font-heading mb-2">{game.title}</h3>
                  <p className="text-white/80">{game.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Dice Game */}
        {(activeSection === 'home' || (activeSection === 'games' && activeGame === 'dice')) && (
          <DiceGame
            betAmount={betAmount}
            setBetAmount={setBetAmount}
            multiplier={multiplier}
            setMultiplier={setMultiplier}
            diceResult={diceResult}
            isRolling={isRolling}
            prediction={prediction}
            setPrediction={setPrediction}
            onRollDice={rollDice}
          />
        )}
        
        {/* Mines Game */}
        {activeSection === 'games' && activeGame === 'mines' && (
          <MinesGame
            betAmount={betAmount}
            setBetAmount={setBetAmount}
            minesCount={minesCount}
            setMinesCount={setMinesCount}
            minesField={minesField}
            minesGameActive={minesGameActive}
            revealedCount={revealedCount}
            minesMultiplier={minesMultiplier}
            onInitMinesGame={initMinesGame}
            onRevealCell={revealCell}
            onCashOutMines={cashOutMines}
          />
        )}
        
        {/* Battle Game */}
        {activeSection === 'games' && activeGame === 'battle' && (
          <BattleGame
            betAmount={betAmount}
            setBetAmount={setBetAmount}
            battlePlayers={battlePlayers}
            battleResult={battleResult}
            battleInProgress={battleInProgress}
            onStartBattle={startBattle}
          />
        )}

        {/* Footer */}
        <footer className="mt-16 py-8 border-t border-border">
          <div className="flex flex-wrap justify-between items-center text-sm text-muted-foreground">
            <div className="flex space-x-6">
              <button className="hover:text-foreground transition-colors">Режим</button>
              <button className="hover:text-foreground transition-colors">Игрок</button>
              <button className="hover:text-foreground transition-colors">Ставка</button>
              <button className="hover:text-foreground transition-colors">X</button>
              <button className="hover:text-foreground transition-colors">Итог</button>
            </div>
            <div className="flex items-center space-x-4">
              <span>Poehali - 2024 Все права защищены</span>
              <div className="flex space-x-2">
                <Button variant="ghost" size="sm" className="w-8 h-8 p-0 neon-glow">
                  <Icon name="MessageCircle" size={16} />
                </Button>
                <Button variant="ghost" size="sm" className="w-8 h-8 p-0 neon-glow">
                  <Icon name="Send" size={16} />
                </Button>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default Index;