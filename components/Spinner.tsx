import React from "react";
import classNames from "classnames";

export function CenteredSpinner(props: SpinnerProps) {
  return (
    <div className={'flex justify-center'} >
      <Spinner {...props}/>
    </div>
  );
}

interface SpinnerProps {
  size: 'sm' | 'lg';
  className?: string;
}

export function Spinner({ size, className }: SpinnerProps) {
  var spinnerClassName = classNames({
    "loader ease-linear rounded-full border-gray-200 ": true,
    "border-2 border-t-2 h-6 w-6 ": size === "sm",
    "border-4 border-t-4 h-12 w-12 ": size === "lg",
    [`${className}`]: className,
  });
  return (
    <div className={spinnerClassName} />
  );
}
