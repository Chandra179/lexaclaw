import type { Component, JSX } from "solid-js";

interface ButtonProps {
  onClick?: () => void;
  disabled?: boolean;
  variant?: "primary" | "secondary" | "ghost";
  type?: "button" | "submit";
  children: JSX.Element;
  class?: string;
}

const variantClasses: Record<NonNullable<ButtonProps["variant"]>, string> = {
  primary:
    "bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800 disabled:bg-blue-300",
  secondary:
    "bg-gray-100 text-gray-800 hover:bg-gray-200 active:bg-gray-300 disabled:opacity-50",
  ghost:
    "bg-transparent text-gray-700 hover:bg-gray-100 active:bg-gray-200 disabled:opacity-50",
};

const Button: Component<ButtonProps> = (props) => {
  const variant = () => props.variant ?? "primary";

  return (
    <button
      type={props.type ?? "button"}
      onClick={props.onClick}
      disabled={props.disabled}
      class={`inline-flex shrink-0 items-center gap-1.5 rounded-lg px-4 py-3 text-sm font-medium transition-colors ${variantClasses[variant()]} ${props.class ?? ""}`}
    >
      {props.children}
    </button>
  );
};

export default Button;
