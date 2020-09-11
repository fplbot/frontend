import React from 'react';

interface CodeProps {
  children: string;
}

function Code(props: CodeProps) {
  return (
    <code className="p-px">
      {props.children}
    </code>
  );
}

export default Code;