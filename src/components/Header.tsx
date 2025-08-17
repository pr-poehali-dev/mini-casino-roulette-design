import React from 'react';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface HeaderProps {
  navigation: Array<{
    id: string;
    label: string;
    icon: string;
  }>;
  activeSection: string;
  balance: number;
  onSectionChange: (section: string) => void;
}

const Header: React.FC<HeaderProps> = ({ 
  navigation, 
  activeSection, 
  balance, 
  onSectionChange 
}) => {
  return (
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
                  onClick={() => onSectionChange(item.id)}
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
  );
};

export default Header;