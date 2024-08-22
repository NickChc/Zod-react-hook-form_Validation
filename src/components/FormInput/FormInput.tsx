import "@src/components/FormInput/FormInput.scss";
import { useState } from "react";
import {
  FieldValues,
  Path,
  RegisterOptions,
  UseFormRegister,
} from "react-hook-form";

interface FormInputProps<T extends FieldValues> {
  register: UseFormRegister<T>;
  name: Path<T>;
  label?: string;
  type?: "text" | "password";
  rules?: RegisterOptions<T>;
  [key: string]: any;
}

export function FormInput<T extends FieldValues>({
  label,
  type,
  register,
  name,
  rules,
  ...rest
}: FormInputProps<T>) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="wrapper">
      <label>{label}</label>
      <input
        {...register(name, rules)}
        {...rest}
        name={name as string}
        type={type === "password" && !showPassword ? "password" : "text"}
        className="input"
      />
      {type === "password" && (
        <span className="eye" onClick={() => setShowPassword(!showPassword)}>
          {showPassword ? (
            <i className="material-icons">visibility_off</i>
          ) : (
            <i className="material-icons">visibility</i>
          )}
        </span>
      )}
    </div>
  );
}
