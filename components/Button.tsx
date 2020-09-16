import React from 'react';

interface ButtonProps {
  onClick: () => void;
  className?: string;
  children: string | JSX.Element;
}

function Button(props: ButtonProps) {
  return (
    <button
      onClick={props.onClick}
      className={"items-center py-3 px-3 font-bold text-white hover:text-fpl-purple bg-fpl-purple hover:bg-fpl-green rounded shadow hover:shadow-xl transition duration-500 " + props.className}>
      {props.children}
    </button>
  );
}

export default Button;