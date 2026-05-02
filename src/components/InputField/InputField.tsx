import "./InputField.scss";
import type { ChangeEvent, ReactNode } from "react";

interface InputFieldProps {
  label: string;
  id: string;
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  error?: boolean;
  rightLabel?: ReactNode;
}

const InputField = ({
  label,
  id,
  type,
  placeholder,
  value,
  onChange,
  error,
  rightLabel,
}: InputFieldProps) => (
  <div className="field">
    <div className="password-label-row">
      <label htmlFor={id}>{label}</label>
      {rightLabel}
    </div>
    <input
      id={id}
      type={type}
      className={error ? "error" : ""}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      autoComplete={id}
    />
  </div>
);

export default InputField;
