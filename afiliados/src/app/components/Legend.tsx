import React from 'react';

interface LegendProps {
    items: { [key: number]: string };
    colors: { [key: number]: string };
}

const Legend: React.FC<LegendProps> = ({ items, colors }) => {
  return (
    <div className="flex mt-4">
      {Object.entries(items).map(([key, value]) => (
        <div key={key} className="flex items-center mr-4">
          <div className={`w-4 h-4 mr-2 ${colors[key]} rounded-full`} />
          <span>{value}</span>
        </div>
      ))}
    </div>
  );
};

export default Legend;