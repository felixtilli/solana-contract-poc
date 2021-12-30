import React from "react";
import { Label } from "./Label";
import { FaUserCircle } from "react-icons/fa";
import { ProgramAccountInterface } from "../interfaces";
import "./ProgramAccount.scss";

interface IProps {
  item: ProgramAccountInterface;
}

export const ProgramAccount = (props: IProps) => {
  const pubKey = props.item.pubkey.toString();
  const message = new TextDecoder()
    .decode(props.item.account.data, {})
    .substring(10);

  return (
    <div className="programAccount">
      <div className="left">
        <FaUserCircle />
      </div>
      <div className="right">
        <Label text={pubKey} />
        <Label text={message} />
      </div>
    </div>
  );
};
