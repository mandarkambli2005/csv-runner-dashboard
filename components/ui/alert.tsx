import * as React from "react";
import { clsx } from "clsx";

export function Alert({ className, variant = "default", ...props }: React.HTMLAttributes<HTMLDivElement> & { variant?: "default" | "destructive" }) {
  const variants = {
    default: "bg-gray-50 border-gray-200",
    destructive: "bg-red-50 border-red-200"
  }[variant];
  return <div className={clsx("rounded-2xl border p-4", variants, className)} {...props} />;
}

export function AlertTitle(props: React.HTMLAttributes<HTMLDivElement>) {
  return <div className="mb-1 font-semibold" {...props} />;
}

export function AlertDescription(props: React.HTMLAttributes<HTMLDivElement>) {
  return <div className="text-sm text-gray-700" {...props} />;
}
