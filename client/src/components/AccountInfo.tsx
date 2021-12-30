import React from "react";
import { Label } from "./Label";
import { AccountInfoRow } from "./AccountInfoRow";
import { FaClipboardList } from "react-icons/fa";
import { AccountInfoInterface } from "../interfaces";
import "./AccountInfo.scss";

interface IProps {
  accountInfoWrapper: AccountInfoInterface;
}

export const AccountInfo = (props: IProps) => {
  if (!props.accountInfoWrapper || !props.accountInfoWrapper.accountInfo) {
    return null; // TODO: return loader
  }

  return (
    <div className="accountInfo">
      <div className="labelWithIcon">
        <FaClipboardList />
        <Label size="large" text="Contract Information" />
      </div>
      <AccountInfoRow
        rowName="Program Id"
        rowValue={props.accountInfoWrapper.programId.toString()}
      />
      <AccountInfoRow
        rowName="Executable"
        rowValue={
          !!props.accountInfoWrapper.accountInfo.executable ? "Yes" : "No"
        }
      />
      <AccountInfoRow
        rowName="Lamports"
        rowValue={props.accountInfoWrapper.accountInfo.lamports.toString()}
      />
      {props.accountInfoWrapper.accountInfo.rentEpoch !== undefined && (
        <AccountInfoRow
          rowName="RentEpoch"
          rowValue={props.accountInfoWrapper.accountInfo.rentEpoch.toString()}
        />
      )}
    </div>
  );
};
