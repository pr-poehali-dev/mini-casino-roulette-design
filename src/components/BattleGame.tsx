import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';

interface BattlePlayer {
  id: number;
  name: string;
  bet: number;
  avatar: string;
}

interface BattleGameProps {
  betAmount: number[];
  setBetAmount: (value: number[]) => void;
  battlePlayers: BattlePlayer[];
  battleResult: BattlePlayer | null;
  battleInProgress: boolean;
  onStartBattle: () => void;
}

const BattleGame: React.FC<BattleGameProps> = ({
  betAmount,
  setBetAmount,
  battlePlayers,
  battleResult,
  battleInProgress,
  onStartBattle
}) => {
  return (
    <Card className="bg-card border border-border neon-glow mb-8">
      <CardHeader>
        <CardTitle className="text-2xl font-heading neon-text">⚔️ Battle</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Battle Controls */}
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Ваша ставка</label>
              <Slider
                value={betAmount}
                onValueChange={setBetAmount}
                max={1000}
                min={10}
                step={10}
                className="w-full"
                disabled={battleInProgress}
              />
              <div className="flex justify-between text-sm text-muted-foreground mt-1">
                <span>10₽</span>
                <span className="text-neon-yellow font-bold">{betAmount[0]}₽</span>
                <span>1000₽</span>
              </div>
            </div>

            <div className="bg-muted p-4 rounded-lg">
              <h4 className="font-bold mb-3">Участники битвы:</h4>
              {battlePlayers.map((player) => (
                <div key={player.id} className="flex justify-between items-center mb-2">
                  <span className="flex items-center space-x-2">
                    <span className="text-xl">{player.avatar}</span>
                    <span>{player.name}</span>
                  </span>
                  <span className="font-bold">{player.bet}₽</span>
                </div>
              ))}
              <div className="border-t border-border pt-2 mt-3">
                <div className="flex justify-between items-center">
                  <span className="font-bold">Общий банк:</span>
                  <span className="font-bold text-green-400">
                    {battlePlayers.reduce((sum, player) => sum + player.bet, 0)}₽
                  </span>
                </div>
              </div>
            </div>

            <Button 
              onClick={onStartBattle}
              disabled={battleInProgress}
              className="w-full h-12 text-lg font-bold bg-primary hover:bg-primary/90 neon-glow disabled:opacity-50"
            >
              {battleInProgress ? 'Битва идет...' : 'Начать битву!'}
            </Button>
          </div>

          {/* Battle Arena */}
          <div className="flex items-center justify-center">
            <div className="bg-muted p-8 rounded-lg text-center min-h-[300px] flex flex-col justify-center">
              {battleInProgress ? (
                <div className="animate-pulse">
                  <div className="text-6xl mb-4">⚔️</div>
                  <p className="text-xl font-bold">Битва идет!</p>
                  <p className="text-muted-foreground">Определяем победителя...</p>
                </div>
              ) : battleResult ? (
                <div className="animate-fade-in">
                  <div className="text-6xl mb-4">{battleResult.avatar}</div>
                  <p className="text-xl font-bold mb-2">Победитель: {battleResult.name}!</p>
                  <Badge className="text-lg p-2">
                    {battleResult.id === 1 ? 'Вы выиграли!' : 'Вы проиграли'}
                  </Badge>
                </div>
              ) : (
                <div>
                  <div className="text-6xl mb-4">🏟️</div>
                  <p className="text-xl font-bold mb-2">Арена готова!</p>
                  <p className="text-muted-foreground">Нажмите "Начать битву" чтобы сразиться</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BattleGame;