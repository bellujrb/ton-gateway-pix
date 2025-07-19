import React, { useState } from 'react';
import { useTonWallet } from '@tonconnect/ui-react';
import { TonConnectButton } from '@tonconnect/ui-react';
import { Wallet, Shield, Zap, DollarSign } from 'lucide-react';
import { BuyToken } from './components/BuyToken';
import { MyTokens } from './components/MyTokens';
import { Profile } from './components/Profile';
import { BottomNavigation } from './components/BottomNavigation';
import { useTonTokenBalances } from '../../hooks/useTonTokenBalances';
import { useMemo } from 'react';

type Screen = 'onboarding' | 'home' | 'buy' | 'tokens' | 'profile';

interface Token {
  id: string;
  name: string;
  symbol: string;
  amount: number;
  date: string;
  price: number;
}

export const GatewayPage: React.FC = () => {
  const wallet = useTonWallet();
  const [currentScreen, setCurrentScreen] = useState<Screen>('onboarding');
  const [tokens, setTokens] = useState<Token[]>([]);

  // Auto-navigate to home when wallet is connected
  React.useEffect(() => {
    if (wallet && currentScreen === 'onboarding') {
      setCurrentScreen('home');
    }
  }, [wallet, currentScreen]);

  const connectWallet = () => {
    setCurrentScreen('home');
  };

  const navigateToScreen = (screen: Screen) => {
    setCurrentScreen(screen);
  };

  const addToken = (token: Omit<Token, 'id' | 'date'>) => {
    const newToken: Token = {
      ...token,
      id: Math.random().toString(36).substr(2, 9),
      date: new Date().toISOString().split('T')[0]
    };
    setTokens(prev => [newToken, ...prev]);
  };

  const renderCurrentScreen = () => {
    switch (currentScreen) {
      case 'onboarding':
        return <Onboarding onConnectWallet={connectWallet} />;
      case 'home':
        return <Home onNavigate={navigateToScreen} tokens={tokens} wallet={wallet} />;
      case 'buy':
        return (
          <BuyToken
            onTokenPurchased={addToken}
            onNavigate={navigateToScreen}
            wallet={wallet}
          />
        );
      case 'tokens':
        return <MyTokens tokens={tokens} walletAddress={wallet?.account?.address || null} />;
      case 'profile':
        return <Profile wallet={wallet} />;
      default:
        return <Onboarding onConnectWallet={connectWallet} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="flex-1 pb-20">
        {renderCurrentScreen()}
      </div>
      {wallet && currentScreen !== 'onboarding' && (
        <BottomNavigation 
          currentScreen={currentScreen} 
          onNavigate={navigateToScreen} 
        />
      )}
    </div>
  );
};

// Onboarding Component
interface OnboardingProps {
  onConnectWallet: () => void;
}

const Onboarding: React.FC<OnboardingProps> = ({ onConnectWallet: _ }) => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-white">
      {/* Header */}
      <div className="flex-1 flex flex-col justify-center p-6">
        <div className="text-center space-y-8">
          {/* Logo */}
          <div className="flex justify-center">
            <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-blue-600 rounded-3xl flex items-center justify-center shadow-xl">
              <Wallet className="w-12 h-12 text-white" />
            </div>
          </div>

          {/* Title */}
          <div className="space-y-3">
            <h1 className="text-3xl font-bold text-gray-800">
              TON Gateway
            </h1>
            <p className="text-lg text-blue-600 font-medium">
              Compre tokens TON com PIX
            </p>
          </div>

          {/* Features */}
          <div className="space-y-4 max-w-sm mx-auto">
            <div className="flex items-center space-x-3 text-left">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <Zap className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="font-medium text-gray-800">Rápido e Fácil</p>
                <p className="text-sm text-gray-600">Compre em segundos via PIX</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3 text-left">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <Shield className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="font-medium text-gray-800">100% Seguro</p>
                <p className="text-sm text-gray-600">Powered by Transfero</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3 text-left">
              <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-yellow-600" />
              </div>
              <div>
                <p className="font-medium text-gray-800">Limite Diário</p>
                <p className="text-sm text-gray-600">Até R$ 2.500 (500 USD)</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="p-6 space-y-4">
        <div className="bg-blue-50 p-4 rounded-2xl border border-blue-100">
          <p className="text-sm text-blue-800 text-center">
            <span className="font-medium">Gateway PIX</span> para comprar qualquer token na rede TON usando Transfero como provider.
          </p>
        </div>

        <div className="connect-wallet-container">
          <TonConnectButton className="connect-wallet-btn bg-blue-500 hover:bg-blue-600 text-white font-semibold py-4 px-6 rounded-2xl shadow-lg transition-all duration-200 transform active:scale-95" />
        </div>

        <p className="text-xs text-gray-500 text-center">
          Conecte sua wallet para começar a comprar tokens TON
        </p>
      </div>
    </div>
  );
};

// Home Component
interface HomeProps {
  onNavigate: (screen: Screen) => void;
  tokens: Token[];
  wallet: any;
}

const Home: React.FC<HomeProps> = ({ onNavigate, tokens, wallet }) => {
  const recentTokens = tokens.slice(0, 3);
  const walletAddress = wallet?.account?.address || null;
  const tokenList = useMemo(() => [
    { symbol: 'TON', address: null }
  ], []);
  const balances = useTonTokenBalances(walletAddress, tokenList);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="p-6 pt-12">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">TON Gateway</h1>
              <p className="text-sm text-gray-600">Bem-vindo de volta!</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <Wallet className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Wallet Info */}
        {wallet && (
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-800">Sua Wallet</h2>
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <Shield className="w-4 h-4 text-green-600" />
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-gray-600">Endereço</p>
              <p className="text-sm font-mono text-gray-800 break-all">
                {wallet.account.address.slice(0, 8)}...{wallet.account.address.slice(-8)}
              </p>
              <div className="mt-2 flex items-center space-x-2">
                <span className="text-sm text-gray-600">Saldo TON:</span>
                <span className="font-bold text-blue-600 text-lg">
                  {balances === null ? '...' : (balances['TON']?.toFixed(4) ?? '0.0000')}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={() => onNavigate('buy')}
            className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 text-left hover:shadow-md transition-shadow"
          >
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-3">
              <Zap className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="font-semibold text-gray-800 mb-1">Comprar Token</h3>
            <p className="text-sm text-gray-600">Via PIX</p>
          </button>

          <button
            onClick={() => onNavigate('tokens')}
            className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 text-left hover:shadow-md transition-shadow"
          >
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-3">
              <Wallet className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="font-semibold text-gray-800 mb-1">Meus Tokens</h3>
            <p className="text-sm text-gray-600">Ver histórico</p>
          </button>
        </div>

        {/* Recent Transactions */}
        {recentTokens.length > 0 && (
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-800">Transações Recentes</h2>
              <button
                onClick={() => onNavigate('tokens')}
                className="text-blue-600 text-sm font-medium"
              >
                Ver todas
              </button>
            </div>
            <div className="space-y-3">
              {recentTokens.map((token) => (
                <div key={token.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                  <div>
                    <p className="font-medium text-gray-800">{token.name}</p>
                    <p className="text-sm text-gray-600">{token.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-800">{token.amount.toFixed(2)} {token.symbol}</p>
                    <p className="text-sm text-gray-600">R$ {token.price.toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}; 