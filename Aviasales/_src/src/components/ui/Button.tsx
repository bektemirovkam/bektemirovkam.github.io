import React, { FC } from "react";
import classNames from "classnames";

interface IButtonProps {
  title: string;
  onClick: () => void;
  className?: string;
  disabled?: boolean;
  isLoading?: boolean;
}

const Button: FC<IButtonProps> = ({
  title,
  onClick,
  className,
  disabled,
  isLoading,
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={classNames("btn", className)}
    >
      {isLoading ? "Загрузка..." : title}
    </button>
  );
};

export default Button;
