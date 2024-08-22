import "@src/components/Button/Button.scss";
import { PropsWithChildren } from "react";

interface ButtonProps {
  type: "submit" | "button";
  loading?: boolean;
  laodingText?: string;
}

export function Button({
  children,
  loading,
  laodingText,
  type = "button",
}: PropsWithChildren<ButtonProps>) {
  return (
    <button type={type} className="button" disabled={loading}>
      {laodingText && loading ? laodingText : children}
    </button>
  );
}
