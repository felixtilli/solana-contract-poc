import React from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import {
  WalletDisconnectButton,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
import "./Header.scss";

export const Header = () => {
  const { wallet } = useWallet();

  const walletIsConnected =
    !!wallet && !!wallet.adapter && wallet.adapter.connected;

  return (
    <div className="header">
      <div className="dummy" />
      <WalletMultiButton />
      {walletIsConnected && <WalletDisconnectButton />}
    </div>
  );
};
