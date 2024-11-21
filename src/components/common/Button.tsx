import React from "react";
import { Button as ShadcnButton } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
  size?: "default" | "sm" | "lg" | "icon";
  isLoading?: boolean;
  loadingText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  className,
  variant = "default",
  size = "default",
  isLoading,
  loadingText,
  leftIcon,
  rightIcon,
  ...props
}) => {
  return (
    <ShadcnButton
      variant={variant}
      size={size}
      className={cn(
        "flex items-center justify-center gap-2 font-medium transition-all",
        isLoading && "cursor-not-allowed opacity-70",
        className
      )}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
      {!isLoading && leftIcon}
      {isLoading ? loadingText || children : children}
      {!isLoading && rightIcon}
    </ShadcnButton>
  );
};
