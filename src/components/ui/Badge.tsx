import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "primary" | "secondary" | "outline";
  className?: string;
}

const variantClasses = {
  default: "bg-muted text-muted-foreground",
  primary: "bg-primary-100 text-primary-dark",
  secondary: "bg-secondary/10 text-secondary-dark",
  outline: "border border-border text-muted-foreground",
};

export function Badge({ children, variant = "default", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-sm font-medium",
        variantClasses[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}
