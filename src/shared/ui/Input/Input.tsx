"use client";

import cn from "classnames";
import React from "react";
import s from "./Input.module.scss";

export type InputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "onChange" | "value"
> & {
  /** Значение поля */
  value: string;
  /** Callback, вызываемый при вводе данных в поле */
  onChange: (value: string) => void;
  /** Слот для иконки / элемента справа */
  afterSlot?: React.ReactNode;
  /** Управление доступностью поля ввода */
  disabled?: boolean;
  /** Заглушка для поля ввода */
  placeholder: string;
  ref?: React.Ref<HTMLInputElement>;
};

export default function Input({
  value,
  onChange,
  className,
  afterSlot,
  disabled,
  placeholder,
  ref,
  ...rest
}: InputProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <label className={cn(s.input, disabled && s.disabled, className)}>
      <input
        ref={ref}
        type="text"
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        className={s.field}
        disabled={disabled}
        {...rest}
      />

      {afterSlot && <div className={s.after}>{afterSlot}</div>}
    </label>
  );
}
