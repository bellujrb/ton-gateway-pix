import React from 'react';
import { ArrowLeft, Wallet, TrendingUp, Calendar } from 'lucide-react';

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
  wallet?: any;
}

export const MyTokens: React.FC<MyTokensProps> = ({ tokens, wallet }) => {
  const totalValue = tokens.reduce((sum, token) => sum + token.price, 0);
  const totalTokens = tokens.reduce((sum, token) => sum + token.amount, 0);
  const [tonBalance, setTonBalance] = React.useState<string | null>(null);

  React.useEffect(() => {
    async function fetchTonBalance(address: string) {
      try {
        const res = await fetch(`https://tonapi.io/v1/account/getInfo?account=${address}`);
        const data = await res.json();
        const balance = Number(data.balance) / 1e9;
        setTonBalance(balance.toFixed(3));
      } catch (e) {
        setTonBalance(null);
      }
    }
    if (wallet && wallet.account?.address) {
      fetchTonBalance(wallet.account.address);
    } else {
      setTonBalance(null);
    }
  }, [wallet]);

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
        {/* Summary Cards */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <Wallet className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Investido</p>
                <p className="text-lg font-bold text-gray-800">R$ {totalValue.toFixed(2)}</p>
                {tonBalance !== null && (
                  <span className="block text-xs text-green-700 font-semibold mt-1">Saldo TON: {tonBalance} TON</span>
                )}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Tokens</p>
                <p className="text-lg font-bold text-gray-800">{totalTokens.toFixed(2)}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Transactions List */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-lg font-semibold text-gray-800">Histórico de Compras</h2>
          </div>

          {tokens.length === 0 ? (
            <div className="p-12 text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Wallet className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-800 mb-2">Nenhuma transação ainda</h3>
              <p className="text-gray-600">
                Faça sua primeira compra de tokens para ver o histórico aqui
              </p>
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {tokens.map((token) => (
                <div key={token.id} className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-sm font-bold text-blue-600">{token.symbol}</span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-800">{token.name}</h3>
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                          <Calendar className="w-4 h-4" />
                          <span>{new Date(token.date).toLocaleDateString('pt-BR')}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-gray-800">
                        {token.amount.toFixed(2)} {token.symbol}
                      </p>
                      <p className="text-sm text-gray-600">R$ {token.price.toFixed(2)}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Token Distribution */}
        {tokens.length > 0 && (
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Distribuição por Token</h2>
            <div className="space-y-3">
              {Object.entries(
                tokens.reduce((acc, token) => {
                  acc[token.symbol] = (acc[token.symbol] || 0) + token.amount;
                  return acc;
                }, {} as Record<string, number>)
              ).map(([symbol, amount]) => (
                <div key={symbol} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-xs font-bold text-blue-600">{symbol}</span>
                    </div>
                    <span className="font-medium text-gray-800">{symbol}</span>
                  </div>
                  <span className="font-semibold text-gray-800">{amount.toFixed(2)}</span>
                </div>
              ))}
            </div>
          </div>
        )}

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