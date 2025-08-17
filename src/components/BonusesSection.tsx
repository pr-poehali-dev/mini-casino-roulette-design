import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface BonusType {
  claimed: boolean;
  amount: number;
}

interface BonusesState {
  telegram: BonusType;
  vk: BonusType;
  registration: BonusType;
  firstDeposit: BonusType;
}

interface ConnectedAccounts {
  telegram: string | null;
  vk: string | null;
}

interface BonusesSectionProps {
  bonuses: BonusesState;
  connectedAccounts: ConnectedAccounts;
  onClaimBonus: (bonusType: string) => void;
  onConnectTelegram: () => void;
  onConnectVK: () => void;
}

const BonusesSection: React.FC<BonusesSectionProps> = ({
  bonuses,
  connectedAccounts,
  onClaimBonus,
  onConnectTelegram,
  onConnectVK
}) => {
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold font-heading neon-text mb-2">🎁 Бонусы</h2>
        <p className="text-muted-foreground">Получайте бонусы за активность</p>
      </div>
      
      {/* Daily Bonuses */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Registration Bonus */}
        <Card className="bg-gradient-to-br from-green-500 to-emerald-600 border-0 text-white neon-glow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold font-heading mb-2">Бонус за регистрацию</h3>
                <p className="text-green-100 mb-4">Получите бонус просто за то, что зарегистрировались!</p>
                <div className="text-2xl font-bold mb-4">100₽</div>
                <Button 
                  onClick={() => onClaimBonus('registration')}
                  disabled={bonuses.registration.claimed}
                  className="bg-white text-green-600 hover:bg-green-50 disabled:opacity-50"
                >
                  {bonuses.registration.claimed ? '✅ Получено' : 'Получить бонус'}
                </Button>
              </div>
              <div className="text-6xl">🎯</div>
            </div>
          </CardContent>
        </Card>
        
        {/* First Deposit Bonus */}
        <Card className="bg-gradient-to-br from-blue-500 to-indigo-600 border-0 text-white neon-glow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold font-heading mb-2">Первый депозит</h3>
                <p className="text-blue-100 mb-4">Бонус к первому пополнению счета</p>
                <div className="text-2xl font-bold mb-4">50₽</div>
                <Button 
                  onClick={() => onClaimBonus('firstDeposit')}
                  disabled={bonuses.firstDeposit.claimed}
                  className="bg-white text-blue-600 hover:bg-blue-50 disabled:opacity-50"
                >
                  {bonuses.firstDeposit.claimed ? '✅ Получено' : 'Получить бонус'}
                </Button>
              </div>
              <div className="text-6xl">💰</div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Social Media Bonuses */}
      <Card className="bg-card border border-border neon-glow">
        <CardHeader>
          <CardTitle className="text-2xl font-heading neon-text">📱 Социальные сети</CardTitle>
          <p className="text-muted-foreground">Привяжите аккаунты и получите бонусы</p>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Telegram */}
            <div className="bg-muted p-6 rounded-lg">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-2xl">📱</div>
                  <div>
                    <h4 className="font-bold">Telegram</h4>
                    <p className="text-sm text-muted-foreground">Привяжите Telegram аккаунт</p>
                  </div>
                </div>
                <Badge variant={connectedAccounts.telegram ? "default" : "outline"}>
                  {connectedAccounts.telegram ? 'Подключен' : 'Не подключен'}
                </Badge>
              </div>
              
              {connectedAccounts.telegram ? (
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Icon name="Check" size={16} className="text-green-500" />
                    <span className="text-sm">{connectedAccounts.telegram}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-green-500">Бонус: 20₽</span>
                    <Badge variant={bonuses.telegram.claimed ? "default" : "destructive"}>
                      {bonuses.telegram.claimed ? '✅ Получено' : '❌ Не получено'}
                    </Badge>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  <p className="text-sm text-muted-foreground">Получите 20₽ за привязку Telegram</p>
                  <Button 
                    onClick={onConnectTelegram}
                    className="w-full bg-blue-500 hover:bg-blue-600 neon-glow"
                  >
                    <Icon name="MessageCircle" size={16} className="mr-2" />
                    Подключить Telegram
                  </Button>
                </div>
              )}
            </div>
            
            {/* VK */}
            <div className="bg-muted p-6 rounded-lg">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center text-2xl text-white font-bold">VK</div>
                  <div>
                    <h4 className="font-bold">ВКонтакте</h4>
                    <p className="text-sm text-muted-foreground">Привяжите VK аккаунт</p>
                  </div>
                </div>
                <Badge variant={connectedAccounts.vk ? "default" : "outline"}>
                  {connectedAccounts.vk ? 'Подключен' : 'Не подключен'}
                </Badge>
              </div>
              
              {connectedAccounts.vk ? (
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Icon name="Check" size={16} className="text-green-500" />
                    <span className="text-sm">{connectedAccounts.vk}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-green-500">Бонус: 20₽</span>
                    <Badge variant={bonuses.vk.claimed ? "default" : "destructive"}>
                      {bonuses.vk.claimed ? '✅ Получено' : '❌ Не получено'}
                    </Badge>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  <p className="text-sm text-muted-foreground">Получите 20₽ за привязку ВКонтакте</p>
                  <Button 
                    onClick={onConnectVK}
                    className="w-full bg-indigo-600 hover:bg-indigo-700 neon-glow"
                  >
                    <Icon name="Users" size={16} className="mr-2" />
                    Подключить VK
                  </Button>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Bonus Summary */}
      <Card className="bg-gradient-to-r from-primary to-secondary border-0 text-white neon-glow">
        <CardContent className="p-6">
          <div className="text-center">
            <h3 className="text-2xl font-bold font-heading mb-4">💎 Общий прогресс бонусов</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white/20 p-4 rounded-lg">
                <div className="text-2xl font-bold">
                  {Object.values(bonuses).filter(bonus => bonus.claimed).length}
                </div>
                <div className="text-sm">Получено</div>
              </div>
              <div className="bg-white/20 p-4 rounded-lg">
                <div className="text-2xl font-bold">
                  {Object.values(bonuses).length - Object.values(bonuses).filter(bonus => bonus.claimed).length}
                </div>
                <div className="text-sm">Доступно</div>
              </div>
              <div className="bg-white/20 p-4 rounded-lg">
                <div className="text-2xl font-bold">
                  {Object.values(bonuses).reduce((sum, bonus) => bonus.claimed ? sum + bonus.amount : sum, 0)}₽
                </div>
                <div className="text-sm">Заработано</div>
              </div>
              <div className="bg-white/20 p-4 rounded-lg">
                <div className="text-2xl font-bold">
                  {Object.values(bonuses).reduce((sum, bonus) => !bonus.claimed ? sum + bonus.amount : sum, 0)}₽
                </div>
                <div className="text-sm">Потенциал</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BonusesSection;