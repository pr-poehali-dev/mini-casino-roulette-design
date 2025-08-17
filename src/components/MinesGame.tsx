import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';

interface MinesGameProps {
  betAmount: number[];
  setBetAmount: (value: number[]) => void;
  minesCount: number;
  setMinesCount: (value: number) => void;
  minesField: Array<{ revealed: boolean; hasMine: boolean; hasGem: boolean }>;
  minesGameActive: boolean;
  revealedCount: number;
  minesMultiplier: number;
  onInitMinesGame: () => void;
  onRevealCell: (index: number) => void;
  onCashOutMines: () => void;
}

const MinesGame: React.FC<MinesGameProps> = ({
  betAmount,
  setBetAmount,
  minesCount,
  setMinesCount,
  minesField,
  minesGameActive,
  revealedCount,
  minesMultiplier,
  onInitMinesGame,
  onRevealCell,
  onCashOutMines
}) => {
  return (
    <Card className="bg-card border border-border neon-glow mb-8">
      <CardHeader>
        <CardTitle className="text-2xl font-heading neon-text">💣 Mines</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Mines Controls */}
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
                disabled={minesGameActive}
              />
              <div className="flex justify-between text-sm text-muted-foreground mt-1">
                <span>10₽</span>
                <span className="text-neon-yellow font-bold">{betAmount[0]}₽</span>
                <span>1000₽</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Количество мин</label>
              <Slider
                value={[minesCount]}
                onValueChange={(value) => setMinesCount(value[0])}
                max={10}
                min={1}
                step={1}
                className="w-full"
                disabled={minesGameActive}
              />
              <div className="flex justify-between text-sm text-muted-foreground mt-1">
                <span>1</span>
                <span className="text-neon-pink font-bold">{minesCount}</span>
                <span>10</span>
              </div>
            </div>

            <div className="bg-muted p-4 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <span>Ставка:</span>
                <span className="font-bold">{betAmount[0]}₽</span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span>Найдено камней:</span>
                <span className="font-bold text-green-400">{revealedCount}</span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span>Множитель:</span>
                <span className="font-bold text-neon-cyan">{minesMultiplier.toFixed(2)}x</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Возможный выигрыш:</span>
                <span className="font-bold text-green-400">{(betAmount[0] * minesMultiplier).toFixed(0)}₽</span>
              </div>
            </div>

            {!minesGameActive ? (
              <Button 
                onClick={onInitMinesGame}
                className="w-full h-12 text-lg font-bold bg-primary hover:bg-primary/90 neon-glow"
              >
                Начать игру
              </Button>
            ) : (
              <Button 
                onClick={onCashOutMines}
                className="w-full h-12 text-lg font-bold bg-green-600 hover:bg-green-700 neon-glow"
                disabled={revealedCount === 0}
              >
                Забрать {(betAmount[0] * minesMultiplier).toFixed(0)}₽
              </Button>
            )}
          </div>

          {/* Mines Field */}
          <div className="flex items-center justify-center">
            <div className="grid grid-cols-5 gap-2 p-4 bg-muted rounded-lg">
              {minesField.map((cell, index) => (
                <button
                  key={index}
                  onClick={() => onRevealCell(index)}
                  disabled={!minesGameActive || cell.revealed}
                  className={`w-12 h-12 rounded-lg border-2 transition-all duration-300 ${
                    cell.revealed 
                      ? cell.hasMine 
                        ? 'bg-red-600 border-red-400 text-white' 
                        : 'bg-green-600 border-green-400 text-white'
                      : 'bg-card border-border hover:bg-primary/20 hover:border-primary neon-glow'
                  }`}
                >
                  {cell.revealed ? (cell.hasMine ? '💣' : '💎') : ''}
                </button>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MinesGame;