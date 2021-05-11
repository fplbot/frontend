import React from "react";
import classNames from "classnames";

interface ButtonProps {
  onClick: (event?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  children: string | JSX.Element;
  className?: string;
  color?: "PURPLE" | "GREEN";
  shape?: "square" | "long";
}

function Button({
  onClick,
  className,
  children,
  color = "PURPLE",
  shape = "square",
}: ButtonProps) {
  const buttonClassName = classNames({
    "font-bold rounded shadow hover:shadow-xl transition duration-500 ": true,
    "py-3 px-3": shape === "square",
    "py-2 px-8": shape === "long",
    "text-white hover:text-fpl-purple bg-fpl-purple hover:bg-fpl-green": color === "PURPLE",
    "text-fpl-purple hover:text-white bg-fpl-green hover:bg-fpl-purple": color === "GREEN",
    [`${className}`]: className,
  });

  return (
    <button onClick={onClick} className={buttonClassName}>
      {children}
    </button>
  );
}

export default Button;
