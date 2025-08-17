import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';

interface DiceGameProps {
  betAmount: number[];
  setBetAmount: (value: number[]) => void;
  multiplier: number[];
  setMultiplier: (value: number[]) => void;
  diceResult: number;
  isRolling: boolean;
  prediction: number;
  setPrediction: (value: number) => void;
  onRollDice: () => void;
}

const DiceGame: React.FC<DiceGameProps> = ({
  betAmount,
  setBetAmount,
  multiplier,
  setMultiplier,
  diceResult,
  isRolling,
  prediction,
  setPrediction,
  onRollDice
}) => {
  return (
    <Card className="bg-card border border-border neon-glow mb-8">
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
              onClick={onRollDice} 
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
  );
};

export default DiceGame;