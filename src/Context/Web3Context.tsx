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

export const useWeb3Store = () => {
  const context = useContext(Web3Context);
  if (context === null) {
    throw new Error("can't find context");
  }
  return context;
};
