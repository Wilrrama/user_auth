import React from "react";

interface FormProps {
  onSubmit: (e: React.FormEvent) => void;
  children: React.ReactNode;
  className?: string;
}

export const Form: React.FC<FormProps> = ({
  onSubmit,
  children,
  className,
}) => {
  return (
    <form onSubmit={onSubmit} className={`flex flex-col gap-5 ${className}`}>
      {children}
    </form>
  );
};
