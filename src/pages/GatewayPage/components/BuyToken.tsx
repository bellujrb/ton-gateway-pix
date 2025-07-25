import React, { useState } from 'react';
import { QrCode, Clock, CheckCircle2, ArrowLeft, Info, Wallet, ExternalLink } from 'lucide-react';
import { QRCodeDisplay } from './QRCodeDisplay';

interface BuyTokenProps {
  onTokenPurchased: (token: { name: string; symbol: string; amount: number; price: number }) => void;
  onNavigate: (screen: 'home') => void;
  wallet: any;
}

const availableTokens = [
  {
    "name": "Toncoin",
    "symbol": "TON",
    "description": "Token nativo da rede TON",
    "address": null,
    "explorer": "https://tonscan.org"
  },  
  {
    name: 'HYPE',
    symbol: 'HYPE',
    description: 'Token HYPE (https://tonviewer.com/UQDBIhmZ3uuX9MzFJmmShZMiLOkwGNk_tsRU_O3yUW-VbOtQ)',
    address: 'UQDBIhmZ3uuX9MzFJmmShZMiLOkwGNk_tsRU_O3yUW-VbOtQ',
    explorer: 'https://tonviewer.com/UQDBIhmZ3uuX9MzFJmmShZMiLOkwGNk_tsRU_O3yUW-VbOtQ'
  },
];

export const BuyToken: React.FC<BuyTokenProps> = ({ onTokenPurchased, onNavigate, wallet }) => {
  const [amount, setAmount] = useState('');
  const [selectedToken, setSelectedToken] = useState('TON');
  const [showQRCode, setShowQRCode] = useState(false);
  const [isWaitingPayment, setIsWaitingPayment] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const handleGenerateQR = () => {
    if (amount && selectedToken && wallet) {
      setShowQRCode(true);
      setIsWaitingPayment(true);
      
      // Simulate payment confirmation after 10 seconds
      setTimeout(() => {
        setIsWaitingPayment(false);
        setIsCompleted(true);
        
        const token = availableTokens.find(t => t.symbol === selectedToken);
        if (token) {
          const tokenAmount = Math.random() * 1000; // Simulate token amount
          onTokenPurchased({
            name: token.name,
            symbol: token.symbol,
            amount: tokenAmount,
            price: parseFloat(amount)
          });
        }
        
        setTimeout(() => {
          setShowQRCode(false);
          setIsCompleted(false);
          setAmount('');
          setSelectedToken('');
          onNavigate('home');
        }, 3000);
      }, 10000);
    }
  };

  if (showQRCode) {
    return (
      <QRCodeDisplay
        amount={amount}
        token={selectedToken}
        isWaiting={isWaitingPayment}
        isCompleted={isCompleted}
        walletAddress={wallet?.account?.address}
        onBack={() => {
          setShowQRCode(false);
          setIsWaitingPayment(false);
          setIsCompleted(false);
        }}
      />
    );
  }

  const selectedTokenInfo = availableTokens.find(t => t.symbol === selectedToken);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="p-6 pt-12">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => onNavigate('home')}
              className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </button>
            <h1 className="text-xl font-bold text-gray-800">Comprar Token</h1>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Wallet Info */}
        {wallet && (
          <div className="bg-blue-50 rounded-2xl p-4 border border-blue-200">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <Wallet className="w-4 h-4 text-blue-600" />
              </div>
              <div className="flex items-center space-x-2">
                <p className="text-sm font-medium text-blue-800 mb-0">Wallet Conectada</p>
                <button
                  onClick={() => window.open(`https://tonviewer.com/${wallet.account.address}`, '_blank')}
                  className="ml-1 p-1 rounded-full hover:bg-blue-200 transition-colors"
                  title="Ver no Explorer"
                >
                  <ExternalLink className="w-4 h-4 text-blue-600" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Amount Input */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-lg font-semibold text-gray-800">
                Quanto você quer investir?
              </label>
              <Info className="w-5 h-5 text-gray-400" />
            </div>
            
            <div className="relative">
              <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium text-lg">
                R$
              </span>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0,00"
                className="w-full pl-12 pr-4 py-4 text-2xl font-bold border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50"
              />
            </div>
            
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Mínimo: R$ 10,00</span>
              <span className="text-gray-500">Máximo: R$ 2.500,00</span>
            </div>

            {/* Quick Amount Buttons */}
            <div className="grid grid-cols-4 gap-2">
              {[50, 100, 250, 500].map((value) => (
                <button
                  key={value}
                  onClick={() => setAmount(value.toString())}
                  className="py-2 px-3 bg-gray-100 hover:bg-blue-100 hover:text-blue-600 rounded-lg text-sm font-medium transition-colors"
                >
                  R$ {value}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Token Selection */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="space-y-4">
            <label className="text-lg font-semibold text-gray-800">
              Escolha o token
            </label>
            
            <div className="space-y-3">
              {availableTokens.map((token) => (
                <button
                  key={token.symbol}
                  onClick={() => setSelectedToken(token.symbol)}
                  className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
                    selectedToken === token.symbol
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center space-x-2">
                        <p className="font-semibold text-gray-800 mb-0">{token.name}</p>
                        {token.explorer && (
                          <a
                            href={token.explorer}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1 rounded-full hover:bg-blue-100"
                            onClick={e => e.stopPropagation()}
                            title="Ver no Explorer"
                          >
                            <ExternalLink className="w-4 h-4 text-blue-600" />
                          </a>
                        )}
                      </div>
                      <p className="text-sm text-gray-600">{token.description.replace(/\(.*\)/, '').trim()}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-blue-600">{token.symbol}</p>
                      {selectedToken === token.symbol && (
                        <CheckCircle2 className="w-5 h-5 text-blue-500 ml-auto mt-1" />
                      )}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Selected Token Info */}
        {selectedTokenInfo && (
          <div className="bg-blue-50 rounded-2xl p-4 border border-blue-200">
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <Info className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-blue-800">
                  Você está comprando {selectedTokenInfo.name}
                </p>
                <p className="text-xs text-blue-600 mt-1">
                  Os tokens serão enviados automaticamente para sua wallet após a confirmação do pagamento.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Generate QR Button */}
        <button
          onClick={handleGenerateQR}
          disabled={!amount || !selectedToken || parseFloat(amount) < 10 || !wallet}
          className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold py-4 px-6 rounded-2xl transition-colors duration-200 shadow-lg"
        >
          <div className="flex items-center justify-center space-x-3">
            <QrCode className="w-6 h-6" />
            <span className="text-lg">Gerar QR Code PIX</span>
          </div>
        </button>

        {/* How it works */}
        <div className="bg-gray-100 rounded-2xl p-4">
          <div className="flex items-start space-x-3">
            <Clock className="w-5 h-5 text-gray-500 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-gray-800">Como funciona</p>
              <p className="text-xs text-gray-600 mt-1">
                1. Gere o QR Code PIX<br/>
                2. Pague com seu banco em até 10 minutos<br/>
                3. Receba os tokens automaticamente na sua wallet
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}; 