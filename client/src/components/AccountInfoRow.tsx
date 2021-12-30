import React from "react";
import { Label } from "./Label";
import "./AccountInfoRow.scss";

interface IProps {
  rowName: string;
  rowValue: string;
}

export const AccountInfoRow = (props: IProps) => {
  return (
    <div className="accountInfoRow">
      <Label text={props.rowName} />
      <Label text={props.rowValue} />
    </div>
  );
};
