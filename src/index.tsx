import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './index.css';
import './tailwind.css';

import { RainbowKitProvider, connectorsForWallets, Chain } from '@rainbow-me/rainbowkit';
import {
  argentWallet,
  braveWallet,
  imTokenWallet,
  injectedWallet,
  ledgerWallet,
  metaMaskWallet,
  omniWallet,
  rainbowWallet,
  trustWallet,
  walletConnectWallet,
  coinbaseWallet
} from '@rainbow-me/rainbowkit/wallets';
import { configureChains, mainnet, createClient, WagmiConfig } from 'wagmi';
import { bsc, polygonMumbai } from 'wagmi/chains';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';

import '@rainbow-me/rainbowkit/styles.css';

import 'react-toastify/dist/ReactToastify.min.css';

// eslint-disable-next-line @typescript-eslint/no-var-requires
window.Buffer = require('buffer').Buffer;

const forkBnbChain: Chain = {
  id: 31337,
  name: 'KingPad TestChain',
  network: 'https://rpc.kkteam.net/kingpad',
  nativeCurrency: {
    decimals: 18,
    name: 'Go',
    symbol: 'Go'
  },
  rpcUrls: {
    default: {
      http: [' https://rpc.kkteam.net/kingpad']
    },
    public: {
      http: [' https://rpc.kkteam.net/kingpad']
    }
  }
};

const { chains, provider } = configureChains(
  [mainnet, bsc, polygonMumbai, forkBnbChain],
  [alchemyProvider({ apiKey: '6mDnh0_FqrDQzdcOCI_O5NkDs70x4VYp' }), publicProvider()]
);

const connectors = connectorsForWallets([
  {
    groupName: 'Inject your wallet',
    wallets: [injectedWallet({ chains })]
  },
  {
    groupName: 'Select your wallet',
    wallets: [
      metaMaskWallet({ chains, shimDisconnect: true }),
      trustWallet({ chains, shimDisconnect: true }),
      coinbaseWallet({ appName: 'King', chains })
    ]
  },
  {
    groupName: 'Others',
    wallets: [
      walletConnectWallet({ chains }),
      ledgerWallet({ chains }),
      braveWallet({ chains }),
      argentWallet({ chains }),
      imTokenWallet({ chains }),
      omniWallet({ chains }),
      rainbowWallet({ chains })
    ]
  }
]);

const wagmiClient = createClient({
  connectors,
  autoConnect: true,
  provider
});

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <WagmiConfig client={wagmiClient}>
    <RainbowKitProvider
      chains={chains}
      showRecentTransactions
      appInfo={{
        appName: 'Kingpad'
      }}
    >
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </RainbowKitProvider>
  </WagmiConfig>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
