import React, { useEffect, useState } from "react";
import { web3 } from "@project-serum/anchor";
import { useConnection } from "@solana/wallet-adapter-react";
import { PublicKey } from "@solana/web3.js";
import idl from ".././idl.json";
import { AccountInfo } from "./AccountInfo";
import { ProgramAccounts } from "./ProgramAccounts";
import "./Main.scss";
import { AccountInfoInterface, ProgramAccountInterface } from "../interfaces";

const bs58 = require("bs58");

const getProgramId = () => {
  return new PublicKey(idl.metadata.address);
};

export const Main = () => {
  const isUnmounted = React.useRef(false);
  const connection = useConnection();
  const [accountInfoWrapper, setAccountInfoWrapper] =
    useState<AccountInfoInterface>({
      programId: getProgramId(),
    });
  const [programAccounts, setProgramAccounts] = useState<
    ProgramAccountInterface[]
  >([]);

  const fetchAccountInfo = async () => {
    const result = await connection.connection.getAccountInfo(
      accountInfoWrapper.programId
    );

    const wrapper: AccountInfoInterface = {
      accountInfo: result,
      programId: accountInfoWrapper.programId,
    };

    if (!!result && !isUnmounted.current) {
      setAccountInfoWrapper(wrapper);
    }
  };

  const fetchProgramAccounts = async (searchQuery?: string) => {
    let config: web3.GetParsedProgramAccountsConfig = {};

    if (!!searchQuery) {
      searchQuery = searchQuery.trim();

      const bytes = Buffer.from(searchQuery, "hex");
      const base58EncodedSearchQuery = bs58.encode(bytes);

      config.filters = [
        {
          memcmp: {
            offset: 12,
            bytes: base58EncodedSearchQuery,
          },
        },
      ];
    }

    const result = await connection.connection.getProgramAccounts(
      accountInfoWrapper.programId,
      config
    );

    if (!isUnmounted.current) {
      setProgramAccounts(result);
    }
  };

  const onMount = async () => {
    await fetchAccountInfo();
    await fetchProgramAccounts();
  };

  useEffect(() => {
    onMount();

    return () => {
      isUnmounted.current = true;
    };
  }, []);

  return (
    <div className="main">
      <div className="main-box">
        <AccountInfo accountInfoWrapper={accountInfoWrapper} />
        <ProgramAccounts
          programAccounts={programAccounts}
          onCommentCreated={fetchProgramAccounts}
        />
      </div>
    </div>
  );
};
