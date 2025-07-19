import React, { useMemo } from 'react';
import { ArrowLeft, Wallet, Calendar } from 'lucide-react';
import { useTonTokenBalances } from '../../../hooks/useTonTokenBalances';
import { useTokens } from '../../../context/TokensContext';

interface Token {
  id: string;
  name: string;
  symbol: string;
  amount: number;
  date: string;
  price: number;
}

interface MyTokensProps {
  tokens: Token[];
  walletAddress: string | null;
}

export const MyTokens: React.FC<MyTokensProps> = ({ walletAddress }) => {
  const tokenList = useMemo(() => [
    { symbol: 'TON', address: null },
    { symbol: 'HYPE', address: '0:52312df266a2be2948611954e4b50a80fc2b96b1e11127a33b024b0d61a8dfa8' },
    // Adicione outros tokens se necessário
  ], []);
  const balances = useTonTokenBalances(walletAddress, tokenList);
  const { balances: mockBalances, history: mockHistory } = useTokens();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="p-6 pt-12">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => window.history.back()}
              className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </button>
            <h1 className="text-xl font-bold text-gray-800">Meus Tokens</h1>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">

        {/* Token Distribution */}
        {tokenList.length > 0 && (
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Tokens</h2>
            <div className="space-y-3">
              {tokenList.map(token => (
                <div key={token.symbol} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-xs font-bold text-blue-600">{token.symbol}</span>
                    </div>
                    <span className="font-medium text-gray-800">{token.symbol}</span>
                  </div>
                  <span className="font-semibold text-gray-800">
                    Real: {balances === null ? '...' : (balances[token.symbol]?.toFixed(4) ?? '0.0000')}<br/>
                    Mock: {mockBalances[token.symbol]?.toFixed(4) ?? '0.0000'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Transactions List */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-lg font-semibold text-gray-800">Histórico de Compras (Mock)</h2>
          </div>
          {mockHistory.length === 0 ? (
            <div className="p-12 text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Wallet className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-800 mb-2">Nenhuma transação mock ainda</h3>
              <p className="text-gray-600">
                Faça sua primeira compra de tokens para ver o histórico mock aqui
              </p>
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {mockHistory.map((item) => (
                <div key={item.id} className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-sm font-bold text-blue-600">{item.symbol}</span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-800">Compra Mock</h3>
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                          <Calendar className="w-4 h-4" />
                          <span>{new Date(item.date).toLocaleDateString('pt-BR')}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-gray-800">
                        {item.amount.toFixed(2)} {item.symbol}
                      </p>
                      <p className="text-sm text-gray-600">R$ {item.price.toFixed(2)}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Info Card */}
        <div className="bg-blue-50 rounded-2xl p-4 border border-blue-200">
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              <Wallet className="w-4 h-4 text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-blue-800">Sobre seus tokens</p>
              <p className="text-xs text-blue-600 mt-1">
                Todos os tokens comprados são enviados automaticamente para sua wallet TON conectada. 
                Você pode visualizar seus tokens diretamente na sua wallet.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}; 