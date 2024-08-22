import "@src/components/FormInput/FormInput.scss";
import { useState } from "react";

interface FormInputProps {
  label?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: "text" | "password";
}

export function FormInput({ label, value, onChange, type }: FormInputProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="wrapper">
      <label>{label}</label>
      <input
        type={type === "password" && !showPassword ? "password" : "text"}
        className="input"
        value={value}
        onChange={onChange}
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
