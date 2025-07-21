import * as React from "react"

interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "destructive"
}

export const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ className = "", variant = "default", ...props }, ref) => {
    const baseClass = "relative w-full rounded-lg border p-4"
    const variantClass = variant === "destructive" 
      ? "border-red-200 text-red-800 bg-red-50" 
      : "border-gray-200 text-gray-800 bg-gray-50"
    
    return (
      <div
        ref={ref}
        role="alert"
        className={`${baseClass} ${variantClass} ${className}`}
        {...props}
      />
    )
  }
)
Alert.displayName = "Alert"

export const AlertDescription: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ 
  className = "", 
  ...props 
}) => (
  <div
    className={`text-sm leading-relaxed ${className}`}
    {...props}
  />
)
