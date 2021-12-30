import React from "react";
import "./Label.scss";

interface IProps {
  text: string;
  size?: "small" | "large";
}

export const Label = (props: IProps) => {
  const size = !!props.size ? props.size : "small";

  return (
    <span
      className={"label " + (size === "small" ? "label-small" : "label-large")}
    >
      {props.text}
    </span>
  );
};
