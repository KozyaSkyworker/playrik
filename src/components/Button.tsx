import { HTMLAttributes } from "react";

type ButtonVariant = "primary" | "ghost" | "icon" | "icon-filled";

interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
  className?: string;
  text?: string;
  variant?: ButtonVariant;
}

const btnStyles: Record<ButtonVariant, string> = {
  ghost:
    "rounded border-1 border-teal-500 text-black hover:border-teal-600 hover:text-teal-600 px-2 py-1 ",
  icon: "rounded-[50%] w-[35px] h-[35px] p-[2px] text-teal-500 hover:text-teal-600 flex items-center justify-center",
  "icon-filled":
    "rounded-[50%] w-[35px] h-[35px] p-[2px] text-white bg-teal-500  hover:bg-teal-600 flex items-center justify-center",
  primary: "bg-teal-500 rounded text-white px-2 py-1 hover:bg-teal-600",
};

export const Button = ({
  className = "",
  variant = "primary",
  text,
  children,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={`cursor-pointer ${btnStyles[variant]} ${className}`}
      {...props}
    >
      {text ?? children}
    </button>
  );
};
