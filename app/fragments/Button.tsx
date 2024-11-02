import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  type: "button" | "submit" | "reset";
  name: string;
}

export const Button: React.FC<ButtonProps> = ({
  type,
  name,
  onClick,
  ...rest
}) => {
  return (
    <button type={type} onClick={onClick} {...rest}>
      {name}
    </button>
  );
};
