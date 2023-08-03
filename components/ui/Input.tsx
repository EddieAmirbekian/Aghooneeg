import * as React from "react";

import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  errors?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, disabled, errors, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1">
        <input
          type={type}
          className={cn(
            "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            { "border-rose-500": errors },
            { "opacity-50 cursor-default": disabled },
            className
          )}
          ref={ref}
          {...props}
        />
        <span className="text-sm text-rose-500">{errors}</span>
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
