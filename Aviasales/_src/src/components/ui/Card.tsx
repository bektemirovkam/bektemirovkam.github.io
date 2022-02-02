import classNames from "classnames";
import React, { FC } from "react";

interface ICardProps {
  children: React.ReactNode;
  className?: string;
}

const Card: FC<ICardProps> = ({ children, className }) => {
  return <div className={classNames("card", className)}>{children}</div>;
};

export default Card;
