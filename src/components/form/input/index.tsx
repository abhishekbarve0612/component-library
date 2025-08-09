import { useId } from "react";

import { cn } from "@/helpers/utils";
import { InputContext, useInputContext } from "./context";
import "./input.css";

interface Props {
  id?: string;
  className?: string;
  children?: React.ReactNode;
}

function Input({ className, children, id }: Props) {
  const _id = useId();
  const inputId = id ?? _id;
  return (
    <InputContext.Provider value={{ id: inputId }}>
      <div className={cn("group", className)}>{children}</div>
    </InputContext.Provider>
  );
}

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  children: React.ReactNode;
  className?: string;
}

Input.Label = function Label({ children, className, ...props }: LabelProps) {
  const { id } = useInputContext();
  return (
    <label
      htmlFor={id}
      className={cn("peer block text-sm text-gray-500 w-full", className)}
      {...props}
    >
      {children}
    </label>
  );
};

interface GroupProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

Input.Group = function Group({ children, className, ...props }: GroupProps) {
  return (
    <div className={cn("group flex items-center gap-2", className)} {...props}>
      {children}
    </div>
  );
};

interface IconProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

Input.Icon = function Icon({ children, className, ...props }: IconProps) {
  return (
    <div className={cn("icon", className)} {...props}>
      {children}
    </div>
  );
};

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  type?: React.HTMLInputTypeAttribute;
  name: string;
}

Input.Field = function Field({
  className,
  type = "text",
  ...props
}: InputProps) {
  const { id } = useInputContext();
  return (
    <input id={id} className={cn("input", className)} type={type} {...props} />
  );
};

export default Input;
