import "@src/components/Button/Button.scss";
import { PropsWithChildren } from "react";

interface ButtonProps {
  type: "submit" | "button";
  loading?: boolean;
  laodingText?: string;
  onClick?: () => void;
  variation?: "primary" | "secondary";
}

export function Button({
  children,
  loading,
  laodingText,
  onClick,
  type = "button",
  variation,
}: PropsWithChildren<ButtonProps>) {
  return (
    <button
      type={type}
      className={`button ${variation === "secondary" ? "secondary" : ""}`}
      disabled={loading}
      onClick={onClick}
    >
      {laodingText && loading ? laodingText : children}
    </button>
  );
}
