"use client";

import cn from "classnames";
import Text from "../Text";
import s from "./NavigationLink.module.scss";
import type React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

type LinkProps = {
  url: string;
  children: React.ReactNode;
  className?: string;
  activeClassName?: string;
};

const NavigationLink = ({
  url,
  children,
  className,
  activeClassName,
}: LinkProps) => {
  const pathname = usePathname();
  const isActive = pathname === url;

  const isTextChild =
    typeof children === "string" || typeof children === "number";

  return (
    <Link
      href={url}
      className={cn(s.link, className, isActive && activeClassName)}
    >
      {isTextChild ? <Text color="inherit">{children}</Text> : children}
    </Link>
  );
};

export default NavigationLink;
