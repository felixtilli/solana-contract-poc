import React, { useCallback, useMemo } from "react";
import { WalletAdapterNetwork, WalletError } from "@solana/wallet-adapter-base";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { getWalletAdapters } from "@solana/wallet-adapter-wallets";
import toast, { Toaster } from "react-hot-toast";
import { Notification } from "./components/Notification";
import { useWallet } from "@solana/wallet-adapter-react";
import { Header } from "./components/Header";
import { Main } from "./components/Main";
import { clusterApiUrl } from "@solana/web3.js";

export const App = () => {
  const { wallet } = useWallet();

  const walletIsConnected =
    !!wallet && !!wallet.adapter && wallet.adapter.connected;

  return (
    <div className={"wrapper" + (!walletIsConnected ? " no-wallet" : "")}>
      <Header />
      {!!walletIsConnected && <Main />}
    </div>
  );
};

export const AppWithProviders = () => {
  const network = WalletAdapterNetwork.Devnet;

  const endpoint = useMemo(() => clusterApiUrl("devnet"), [network]);

  const wallets = useMemo(() => [...getWalletAdapters()], [network]);

  const onError = useCallback(
    (error: WalletError) =>
      toast.custom(
        <Notification
          message={
            error.message ? `${error.name}: ${error.message}` : error.name
          }
          variant="error"
        />
      ),
    []
  );

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} onError={onError}>
        <WalletModalProvider>
          <App />
        </WalletModalProvider>
        <Toaster position="bottom-left" reverseOrder={false} />
      </WalletProvider>
    </ConnectionProvider>
  );
};
