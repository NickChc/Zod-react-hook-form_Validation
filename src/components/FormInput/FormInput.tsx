import "@src/components/FormInput/FormInput.scss";

interface FormInputProps {
  label?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function FormInput({ label, value, onChange }: FormInputProps) {
  return (
    <div className="wrapper">
      <label>{label}</label>
      <input className="input" value={value} onChange={onChange} />
    </div>
  );
}
