import React from 'react';
import { ArrowLeft, Wallet, Copy, Shield, Settings, HelpCircle, ExternalLink } from 'lucide-react';
import { TonConnectButton } from '@tonconnect/ui-react';
import { useTokens } from '../../../context/TokensContext';

interface ProfileProps {
  wallet: any;
}

export const Profile: React.FC<ProfileProps> = ({ wallet }) => {
  const [copied, setCopied] = React.useState(false);
  const { balances } = useTokens();

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

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
            <h1 className="text-xl font-bold text-gray-800">Perfil</h1>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Wallet Info */}
        {wallet ? (
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                <Wallet className="w-8 h-8 text-blue-600" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-800">{wallet.name}</h2>
                <p className="text-gray-600">{wallet.appName}</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-sm text-gray-600 mb-2 block">Endereço da Wallet</label>
                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="flex items-center justify-between">
                    <p className="font-mono text-gray-800 break-all text-sm">
                      {wallet.account.address}
                    </p>
                    <button
                      onClick={() => copyToClipboard(wallet.account.address)}
                      className="ml-4 p-2 bg-blue-100 rounded-lg hover:bg-blue-200 transition-colors"
                    >
                      <Copy className={`w-4 h-4 ${copied ? 'text-green-600' : 'text-blue-600'}`} />
                    </button>
                  </div>
                </div>
                {copied && (
                  <p className="text-sm text-green-600 mt-2">Endereço copiado!</p>
                )}
              </div>
              {/* Saldos mock globais */}
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div>
                  <label className="text-sm text-gray-600 mb-1 block">Saldo TON (mock)</label>
                  <p className="font-medium text-gray-800">{balances.TON?.toFixed(4) ?? '0.0000'}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-600 mb-1 block">Saldo HYPE (mock)</label>
                  <p className="font-medium text-gray-800">{balances.HYPE?.toFixed(4) ?? '0.0000'}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-gray-600 mb-1 block">Rede</label>
                  <p className="font-medium text-gray-800">{wallet.account.chain}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-600 mb-1 block">Versão</label>
                  <p className="font-medium text-gray-800">{wallet.device.maxProtocolVersion}</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Wallet className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-800 mb-2">Wallet não conectada</h3>
            <p className="text-gray-600 mb-4">
              Conecte sua wallet para ver as informações do perfil
            </p>
            <div className="connect-wallet-container">
              <TonConnectButton className="connect-wallet-btn bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-xl transition-colors" />
            </div>
          </div>
        )}

        {/* Quick Actions */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-lg font-semibold text-gray-800">Ações Rápidas</h2>
          </div>
          <div className="divide-y divide-gray-100">
            <button className="w-full p-6 text-left hover:bg-gray-50 transition-colors">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <Settings className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-800">Configurações</p>
                  <p className="text-sm text-gray-600">Preferências da conta</p>
                </div>
                <ExternalLink className="w-5 h-5 text-gray-400 ml-auto" />
              </div>
            </button>

            <button className="w-full p-6 text-left hover:bg-gray-50 transition-colors">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <Shield className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-800">Segurança</p>
                  <p className="text-sm text-gray-600">Configurações de segurança</p>
                </div>
                <ExternalLink className="w-5 h-5 text-gray-400 ml-auto" />
              </div>
            </button>

            <button className="w-full p-6 text-left hover:bg-gray-50 transition-colors">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                  <HelpCircle className="w-5 h-5 text-yellow-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-800">Ajuda</p>
                  <p className="text-sm text-gray-600">Central de ajuda</p>
                </div>
                <ExternalLink className="w-5 h-5 text-gray-400 ml-auto" />
              </div>
            </button>
          </div>
        </div>

        {/* App Info */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Sobre o App</h2>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Versão</span>
              <span className="font-medium text-gray-800">1.0.0</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Desenvolvido por</span>
              <span className="font-medium text-gray-800">TON Gateway</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Provider</span>
              <span className="font-medium text-gray-800">Transfero</span>
            </div>
          </div>
        </div>

        {/* Disconnect Wallet */}
        {wallet && (
          <div className="disconnect-wallet-container rounded-3xl p-6 mx-4 sm:mx-0">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-red-100 to-pink-100 rounded-full flex items-center justify-center shadow-sm flex-shrink-0">
                <Wallet className="w-6 h-6 text-red-600" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-bold text-red-800 mb-2">Desconectar Wallet</h3>
                <p className="text-sm text-red-700 mb-4 leading-relaxed">
                  Clique no botão abaixo para desconectar sua wallet atual
                </p>
                <div className="relative">
                  <TonConnectButton className="disconnect-wallet-btn w-full text-white font-semibold py-4 px-6 rounded-2xl text-base" />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Terms and Privacy */}
        <div className="text-center space-y-2">
          <p className="text-xs text-gray-500">
            Ao usar este app, você concorda com nossos{' '}
            <a href="#" className="text-blue-600 hover:underline">Termos de Uso</a>
            {' '}e{' '}
            <a href="#" className="text-blue-600 hover:underline">Política de Privacidade</a>
          </p>
        </div>
      </div>
    </div>
  );
}; 