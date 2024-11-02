import { forwardRef } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  type: string;
  label?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ type, label, ...rest }, ref) => {
    return (
      <>
        {label ? <label>{label}</label> : null}
        <input type={type} ref={ref} {...rest} />
      </>
    );
  }
);

Input.displayName = "Input";
