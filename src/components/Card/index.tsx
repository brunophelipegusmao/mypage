import clsx from "clsx";

export interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  animation?: string;
  variant?: "default" | "muted";
}

const cardVariants = {
  default:
    "bg-card/70 text-card-foreground border border-white/10 shadow-[0_16px_44px_rgba(0,0,0,0.25)] backdrop-blur-sm",
  muted: "bg-muted/60 text-muted-foreground border border-white/8",
};

export function Card({
  children,
  className,
  hover = true,
  animation,
  variant = "default",
}: CardProps) {
  const cardClasses = clsx(
    "rounded-2xl p-6 transition-all duration-300",
    cardVariants[variant],
    {
      "group hover:-translate-y-1 hover:shadow-[0_20px_56px_rgba(27,106,255,0.2)]":
        hover && variant === "default",
      "hover:bg-muted/75 hover:-translate-y-1": hover && variant === "muted",
    },
    animation,
    className,
  );

  return <div className={cardClasses}>{children}</div>;
}

export function CardHeader({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={clsx("mb-4", className)}>{children}</div>;
}

export function CardTitle({
  children,
  className,
  hover = true,
}: {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}) {
  return (
    <h3
      className={clsx(
        "text-xl font-semibold",
        {
          "group-hover:text-primary transition-colors duration-300": hover,
        },
        className,
      )}
    >
      {children}
    </h3>
  );
}

export function CardContent({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={clsx("text-card-foreground/80", className)}>{children}</div>
  );
}

export default Card;
