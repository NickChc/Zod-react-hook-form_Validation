import "@src/components/Button/Button.scss";
import { PropsWithChildren } from "react";

export function Button({ children }: PropsWithChildren) {
  return <button className="button">{children}</button>;
}
