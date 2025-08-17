import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [balance, setBalance] = useState(999999);
  const [betAmount, setBetAmount] = useState([100]);
  const [multiplier, setMultiplier] = useState([2]);
  const [diceResult, setDiceResult] = useState(6);
  const [isRolling, setIsRolling] = useState(false);
  const [prediction, setPrediction] = useState(4);
  const [activeSection, setActiveSection] = useState('home');

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
      {/* Header */}
      <header className="bg-card border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="bg-primary w-10 h-10 rounded-lg flex items-center justify-center neon-glow">
                <span className="text-xl font-bold font-heading">P</span>
              </div>
              <nav className="hidden md:flex space-x-6">
                {navigation.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveSection(item.id)}
                    className={`px-3 py-2 rounded-lg transition-all font-medium ${
                      activeSection === item.id
                        ? 'bg-primary text-primary-foreground neon-glow'
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </nav>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="bg-muted px-4 py-2 rounded-lg flex items-center space-x-2">
                <Icon name="Wallet" size={20} />
                <span className="font-bold text-neon-yellow">{balance.toLocaleString()}</span>
              </div>
              <Button className="neon-glow animate-glow-pulse">
                Кошелек
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Bonus Cards */}
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

        {/* Games Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {games.map((game) => (
            <Card 
              key={game.id} 
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

        {/* Dice Game Section */}
        <Card className="bg-card border border-border neon-glow">
          <CardHeader>
            <CardTitle className="text-2xl font-heading neon-text">🎲 Игра в кости</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Game Controls */}
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Ставка</label>
                  <Slider
                    value={betAmount}
                    onValueChange={setBetAmount}
                    max={1000}
                    min={10}
                    step={10}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-muted-foreground mt-1">
                    <span>10₽</span>
                    <span className="text-neon-yellow font-bold">{betAmount[0]}₽</span>
                    <span>1000₽</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Предсказание (больше или равно)</label>
                  <Slider
                    value={[prediction]}
                    onValueChange={(value) => setPrediction(value[0])}
                    max={6}
                    min={1}
                    step={1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-muted-foreground mt-1">
                    <span>1</span>
                    <span className="text-neon-cyan font-bold">{prediction}</span>
                    <span>6</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Множитель</label>
                  <Slider
                    value={multiplier}
                    onValueChange={setMultiplier}
                    max={6}
                    min={1.1}
                    step={0.1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-muted-foreground mt-1">
                    <span>1.1x</span>
                    <span className="text-neon-pink font-bold">{multiplier[0].toFixed(1)}x</span>
                    <span>6.0x</span>
                  </div>
                </div>

                <div className="bg-muted p-4 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span>Ставка:</span>
                    <span className="font-bold">{betAmount[0]}₽</span>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <span>Возможный выигрыш:</span>
                    <span className="font-bold text-green-400">{(betAmount[0] * multiplier[0]).toFixed(0)}₽</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Шанс победы:</span>
                    <span className="font-bold text-neon-cyan">{((7 - prediction) / 6 * 100).toFixed(1)}%</span>
                  </div>
                </div>

                <Button 
                  onClick={rollDice} 
                  disabled={isRolling}
                  className="w-full h-12 text-lg font-bold bg-primary hover:bg-primary/90 neon-glow disabled:opacity-50"
                >
                  {isRolling ? 'Бросаем...' : 'Бросить кости!'}
                </Button>
              </div>

              {/* Dice Display */}
              <div className="flex items-center justify-center">
                <div className="relative">
                  <div className={`w-32 h-32 bg-gradient-to-br from-neon-cyan to-blue-600 rounded-xl flex items-center justify-center text-6xl font-bold text-white neon-glow ${isRolling ? 'animate-dice-roll' : ''}`}>
                    {diceResult}
                  </div>
                  {!isRolling && (
                    <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2">
                      <Badge 
                        variant={diceResult >= prediction ? "default" : "destructive"}
                        className="text-sm font-bold"
                      >
                        {diceResult >= prediction ? 'Победа!' : 'Проигрыш'}
                      </Badge>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

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