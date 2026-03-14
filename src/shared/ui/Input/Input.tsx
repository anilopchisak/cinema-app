'use client';

import cn from 'classnames';
import React from 'react';
import s from './Input.module.scss';

export type InputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value'> & {
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
  /** Флаг - показывать ли блок с сообщением об ошибке */
  showErrorMessage?: boolean;
  /** Сообщение об ошибке */
  error?: string;
  ref?: React.Ref<HTMLInputElement>;
};

export default function Input({
  value,
  onChange,
  className,
  afterSlot,
  disabled,
  placeholder,
  showErrorMessage = false,
  error,
  ref,
  ...rest
}: InputProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className={cn(s.wrapper, className)}>
      <label className={cn(s.input, disabled && s.disabled, error && s.error, className)}>
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

      {showErrorMessage && (
        <span className={cn(s.errorMessage, error && s.errorVisible)}>{error || 'Ошибка'}</span>
      )}
    </div>
  );
}
