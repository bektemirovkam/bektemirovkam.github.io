import React, { ChangeEvent, FC } from "react";
import classNames from "classnames";
import { FilterValuesType } from "../../models/Filter";

interface ICheckboxProps {
  title: string;
  onChange: (value: FilterValuesType) => void;
  className?: string;
  disabled?: boolean;
  value: FilterValuesType;
  checked: boolean;
}

const Checkbox: FC<ICheckboxProps> = ({
  title,
  value,
  className,
  disabled,
  onChange,
  checked,
}) => {
  const handlerChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value as FilterValuesType);
  };

  return (
    <label className={classNames("checkbox", className)}>
      <input
        type="checkbox"
        value={value}
        onChange={handlerChange}
        className="checkbox__input"
        disabled={disabled}
        checked={checked}
      />
      <span className="checkbox__box">
        <svg
          width="12"
          height="8"
          viewBox="0 0 12 8"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M4.28571 8L0 4.16123L1.20857 3.0787L4.28571 5.82726L10.7914 0L12 1.09021L4.28571 8Z"
            fill="#2196F3"
          />
        </svg>
      </span>
      {title}
    </label>
  );
};

export default Checkbox;
