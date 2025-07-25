import { ReactNode } from "react";

type HeadingVariant = "h1" | "h2" | "h3";

interface HeadingProps {
  variant?: HeadingVariant;
  children?: ReactNode;
  className?: string;
}

const BaseHeading = ({ variant = "h1", className, ...props }: HeadingProps) => {
  if (variant === "h1") {
    return <h1 className={`text-2xl font-bold ${className}`} {...props} />;
  }
  if (variant === "h2") {
    return <h2 className={`text-xl font-bold ${className}`} {...props} />;
  }
  if (variant === "h3") {
    return <h3 className={`text-lg font-medium ${className}`} {...props} />;
  }
};

export const Heading = (props: HeadingProps) => {
  return <BaseHeading {...props} />;
};
