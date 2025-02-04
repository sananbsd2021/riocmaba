"use client";

import React, { ReactNode, FormEvent } from "react";

interface FormProps {
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  children: ReactNode;
  className?: string;
}

const Form: React.FC<FormProps> = ({ onSubmit, children, className = "" }) => {
  return (
    <form
      onSubmit={onSubmit}
      className={`p-4 border rounded shadow-md ${className}`}
    >
      {children}
    </form>
  );
};

export default Form;
