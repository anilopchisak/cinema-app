"use client";

import CheckIcon from "@/shared/ui/icons/CheckIcon/CheckIcon";
import cn from "classnames";
import React from "react";
import s from "./CheckBox.module.scss";

export type CheckBoxProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "onChange"
> & {
  /** Вызывается при клике на чекбокс */
  onChange: (checked: boolean) => void;
};

export default function CheckBox({
  checked,
  className,
  onChange,
  disabled,
}: CheckBoxProps) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    onChange(event.target.checked);
  };

  const labelClasses = cn(
    s.checkbox,
    {
      [s.checkbox_disabled]: disabled,
    },
    className,
  );

  return (
    <label className={labelClasses}>
      <input
        type="checkbox"
        checked={checked}
        onChange={handleChange}
        disabled={disabled}
        className={s.checkbox__controller}
      />
      <CheckIcon
        viewBox="0 0 24 24"
        className={s.checkbox__check}
        width={40}
        height={40}
      />
    </label>
  );
}
