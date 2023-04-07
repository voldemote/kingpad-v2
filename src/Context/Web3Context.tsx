/* eslint-disable no-console */
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useAccount, useNetwork, useProvider, useSigner } from 'wagmi';
import { isEmpty } from 'src/Utils/validator';
import { kingpadInitialize } from 'src/Contracts/kingPad';

interface Web3ContextProps {
  isConnected: boolean;
  isInitialized: boolean;
}

interface propsType {
  children: React.ReactNode;
}

const Web3Context = createContext<Web3ContextProps | null>(null);

export const Web3Provider = (props: propsType) => {
  const { isConnected } = useAccount();
  const provider = useProvider();
  const { data: signer } = useSigner();

  const { chain } = useNetwork();

  const chainId = chain?.id;

  const [isInitialized, setInitialized] = useState(false);
  useEffect(() => {
    if (isConnected) {
      (async () => {
        if (!isEmpty(provider) && !isEmpty(signer) && chainId !== undefined) {
          kingpadInitialize(provider, signer, chainId)
            .then(() => {
              setInitialized(true);
            })
            .catch((err) => {
              console.log('Initialized Err: ', err);
              setInitialized(false);
            });
        }
      })();
    } else {
      setInitialized(false);
    }
  }, [isConnected, signer]);

  return <Web3Context.Provider value={{ isConnected, isInitialized }}>{props.children}</Web3Context.Provider>;
};

export const useWeb3Store = () => {
  const context = useContext(Web3Context);
  if (context === null) {
    throw new Error("can't find context");
  }
  return context;
};
