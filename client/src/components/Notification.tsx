import React from "react";

export interface IProps {
  message: string;
  variant: "error" | "info" | "success";
}

export const Notification = (props: IProps) => {
  return (
    <div className={`wallet-notification wallet-notification-${props.variant}`}>
      {props.message}
    </div>
  );
};
