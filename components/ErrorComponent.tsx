import React from "react";

interface ErrorComponentProps {
  text?: string;
}

export function ErrorComponent(props: ErrorComponentProps) {
  return (
    <div className={'flex justify-center'} >
      <p className="text-fpl-purple">{props.text || 'Ooops, looks like something went wrong 🤕'}</p>
    </div>
  );
}


