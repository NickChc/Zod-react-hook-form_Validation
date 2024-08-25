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
  type?: "text" | "password" | "date";
  rules?: RegisterOptions<T>;
  error?: string | null;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  [key: string]: any;
}

export function FormInput<T extends FieldValues>({
  label,
  type,
  register,
  name,
  onChange,
  rules,
  error,
  ...rest
}: FormInputProps<T>) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="wrapper">
      <label>{label}</label>
      <div className="relative">
        <input
          {...register(name, rules)}
          {...rest}
          name={name as string}
          onChange={
            onChange
              ? (e) => {
                  register(name).onChange(e);
                  onChange(e);
                }
              : undefined
          }
          type={
            type === "password" ? (!showPassword ? "password" : "text") : type
          }
          className={`input  ${error ? "error" : ""}`}
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
      <div className={`error-field ${error ? "open" : ""}`}>{error || ""}</div>
    </div>
  );
}
