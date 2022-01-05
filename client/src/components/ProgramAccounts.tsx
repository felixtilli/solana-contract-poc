import React, { useState } from "react";
import { Label } from "./Label";
import { FaPaperPlane } from "react-icons/fa";
import { FaComment } from "react-icons/fa";
import { PublicKey } from "@solana/web3.js";
import { ProgramAccount } from "./ProgramAccount";
import { Program, Provider, web3 } from "@project-serum/anchor";
import { useAnchorWallet, useConnection } from "@solana/wallet-adapter-react";
import idl from ".././idl.json";
import { ProgramAccountInterface } from "../interfaces";
import "./ProgramAccounts.scss";

const baseAccount = web3.Keypair.generate();

interface IProps {
  programAccounts: ProgramAccountInterface[];
  onCommentCreated: () => void;
  onSearchTextChange: (searchText: string) => void;
}

export const ProgramAccounts = (props: IProps) => {
  const [text, setText] = useState("");
  const [searchText, setSearchText] = useState("");
  const { connection } = useConnection();
  const wallet = useAnchorWallet();

  const getProvider = () => {
    const provider = new Provider(connection, wallet, {});

    return provider;
  };

  const getProgramId = () => {
    return new PublicKey(idl.metadata.address);
  };

  const getProgramInterface = () => {
    const provider = getProvider();

    const program = new Program(
      //@ts-ignore
      idl,
      getProgramId(),
      provider
    );

    return program;
  };

  const createMessage = async () => {
    if (!text || text.length === 0) {
      return;
    }

    const provider = getProvider();
    const program = getProgramInterface();

    const params = {
      accounts: {
        baseAccount: baseAccount.publicKey,
        user: wallet.publicKey,
        systemProgram: web3.SystemProgram.programId,
      },
      signers: [baseAccount],
    };

    program.rpc
      .initialize(text, params)
      .then((response) => {
        setText("");
        props.onCommentCreated();
      })
      .catch((error) => {});
  };

  const onTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      createMessage();
    }
  };

  if (!props.programAccounts) {
    return null;
  }

  return (
    <div className="programAccounts">
      <div className="labelWithIcon">
        <FaComment />
        <Label size="large" text="Comments" />
        <a
          onClick={() => {
            const newValue = !!searchText ? "" : "nice";

            setSearchText(newValue);
            props.onSearchTextChange(newValue);
          }}
        >
          <Label
            size="small"
            text={
              !!searchText
                ? "Show all comments"
                : 'Show comments starting with "nice"'
            }
          />
        </a>
      </div>
      {props.programAccounts.map(
        (item: ProgramAccountInterface, index: number) => {
          return <ProgramAccount key={index} item={item} />;
        }
      )}
      <div className="programAccountCreator">
        <input
          type="text"
          placeholder="Write a comment..."
          value={text}
          onKeyDown={handleKeyDown}
          onChange={onTextChange}
        />
        {!!text && (
          <div className="sendButton" onClick={createMessage} title="Send">
            <FaPaperPlane />
          </div>
        )}
      </div>
    </div>
  );
};
