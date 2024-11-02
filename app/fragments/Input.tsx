import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1">
        <label className="text-gray-300">{label}</label>
        <input
          ref={ref}
          {...props}
          className="bg-gray-700 text-gray-200 placeholder-gray-400 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {error && <span className="text-red-500 text-sm">{error}</span>}
      </div>
    );
  }
);

Input.displayName = "Input";
