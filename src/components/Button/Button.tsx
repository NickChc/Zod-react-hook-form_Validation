import "@src/components/Button/Button.scss";
import { PropsWithChildren } from "react";

interface ButtonProps {
  type: "submit" | "button";
  loading?: boolean;
  laodingText?: string;
  onClick?: () => void;
}

export function Button({
  children,
  loading,
  laodingText,
  onClick,
  type = "button",
}: PropsWithChildren<ButtonProps>) {
  return (
    <button type={type} className="button" disabled={loading} onClick={onClick}>
      {laodingText && loading ? laodingText : children}
    </button>
  );
}
