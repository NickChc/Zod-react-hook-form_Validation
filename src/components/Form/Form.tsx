import "@src/components/Form/Form.scss";
import { PropsWithChildren } from "react";

interface FormProps {
  title: string;
  onSubmit: () => Promise<void>;
}

export function Form({
  children,
  title,
  onSubmit,
}: PropsWithChildren<FormProps>) {
  return (
    <form className="form">
      <h1>{title}</h1>
      <div className="main">{children}</div>
    </form>
  );
}
