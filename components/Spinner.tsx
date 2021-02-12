import React from "react";

interface SpinnerProps {
  className?: string;
}

export function Spinner({ className }: SpinnerProps) {
  return (
    <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12" />
  );
}
