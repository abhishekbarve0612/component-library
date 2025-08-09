import type { ButtonSize, ButtonVariant } from "./button.types";

export const BUTTON_VARIANTS: Record<ButtonVariant, string> = {
  ghost: "button-ghost",
  default: "button-default",
  link: "button-link",
  primary: "button-primary",
  secondary: "button-secondary",
};

export const BUTTON_SIZES: Record<ButtonSize, string> = {
  default: "button-default",
  sm: "button-sm",
  md: "button-md",
  lg: "button-lg",
  xl: "button-xl",
};
