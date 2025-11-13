import * as React from "react";
import { clsx } from "clsx";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "destructive";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", ...props }, ref) => {
    const base = "inline-flex items-center justify-center rounded-2xl px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 disabled:opacity-50 disabled:pointer-events-none";
    const styles = {
      default: "bg-black text-white hover:bg-black/90",
      outline: "border border-gray-300 hover:bg-gray-50",
      destructive: "bg-red-600 text-white hover:bg-red-700"
    }[variant];
    return <button ref={ref} className={clsx(base, styles, className)} {...props} />;
  }
);
Button.displayName = "Button";
