import { createContext, useContext, useState, ReactNode } from 'react';

type TokenSymbol = 'TON' | 'HYPE';

interface TokenBalance {
  [symbol: string]: number;
}

interface TokenHistoryItem {
  id: string;
  symbol: TokenSymbol;
  amount: number;
  price: number;
  date: string;
}

interface TokensContextType {
  balances: TokenBalance;
  history: TokenHistoryItem[];
  buyToken: (symbol: TokenSymbol, amount: number, price: number) => void;
}

const TokensContext = createContext<TokensContextType | undefined>(undefined);

export const TokensProvider = ({ children }: { children: ReactNode }) => {
  const [balances, setBalances] = useState<TokenBalance>({ TON: 0, HYPE: 0 });
  const [history, setHistory] = useState<TokenHistoryItem[]>([]);

  const buyToken = (symbol: TokenSymbol, amount: number, price: number) => {
    setBalances(prev => ({
      ...prev,
      [symbol]: (prev[symbol] || 0) + amount,
    }));
    setHistory(prev => [
      {
        id: Math.random().toString(36).substr(2, 9),
        symbol,
        amount,
        price,
        date: new Date().toISOString(),
      },
      ...prev,
    ]);
  };

  return (
    <TokensContext.Provider value={{ balances, history, buyToken }}>
      {children}
    </TokensContext.Provider>
  );
};

export const useTokens = () => {
  const context = useContext(TokensContext);
  if (!context) throw new Error('useTokens must be used within a TokensProvider');
  return context;
}; 