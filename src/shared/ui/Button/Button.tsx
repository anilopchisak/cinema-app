import Loader from "@/shared/ui/Loader";
import Text from "@/shared/ui/Text";
import cn from "classnames";
import React from "react";
import s from "./Button.module.scss";

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  styleType?: "primary" | "outline" | "outline-secondary";
  /** Состояние загрузки */
  loading?: boolean;
  /** Текст кнопки */
  children: React.ReactNode;
  /** Управление доступностью кнопки */
  disabled?: boolean;
};

export default function Button({
  loading,
  styleType = "primary",
  children,
  className,
  disabled = false,
  ...props
}: ButtonProps) {
  const buttonClasses = cn(
    className,
    s.button,
    styleType !== "primary" && s[styleType],
    disabled && s.disabled,
    loading && s.loading,
  );

  return (
    <button className={buttonClasses} disabled={disabled || loading} {...props}>
      {loading && <Loader size="s" className={s.loader} />}
      <Text tag="span" view="button" className={s.text}>
        {children}
      </Text>
    </button>
  );
}
