import React from 'react'

interface FeatureImageBoxProps {
  imageUrl: string
  alt: string;
}

function FeatureImageBox(props: FeatureImageBoxProps) {
  return (
    <div className="col-span-1 md:col-span-2 flex items-center p-2">
      <img src={props.imageUrl} className="rounded-lg" alt={props.alt}/>
    </div>
  );
}

export default FeatureImageBox